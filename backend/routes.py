from flask import request, jsonify, session, abort, send_file, make_response
from models import db, Usuario, Contatos
from helper import validar_nome, validar_email, validar_senha
from sqlalchemy import func
from werkzeug.utils import secure_filename
from pathlib import Path
import os, secrets 
def register_routes(app):

    @app.route("/cadastrar", methods=["POST"])
    def cadastrar():
        nome = request.form.get('nome_cadastro')
        email = request.form.get('email_cadastro')
        senha = request.form.get('senha_cadastro')


        erros = {}
        if not validar_nome(nome):
            erros['nome'] = "Nome inválido"
        if not validar_email(email):
            erros['email'] = "Email inválido"
        if not validar_senha(senha):
            erros['senha'] = "Senha inválida"

        if erros:
            print(erros)
            return jsonify({"success": False, "errors": erros}), 400


        try:
            Usuario.create_user(nome=nome, email=email, senha=senha)
        except Exception as e:
            print(e)
            return jsonify({"success": False, "message": "Erro ao criar usuário"}), 500

        return jsonify({"success": True, "message": "Cadastro realizado com sucesso", "token": "fake-jwt-123456"}), 200

    
    
    
    
    @app.route("/login", methods=["POST"])
    def login():
        email = request.form.get('email_login')
        senha = request.form.get('senha_login')

        usuario = Usuario.query.filter_by(email=email).first()

        if usuario and usuario.check_password(senha):
            session["user_id"] = usuario.id
            session["user_email"] = usuario.email

            return jsonify({
                "success": True,
                "message": "Login realizado"
            }), 200
        
        else:
            return jsonify({
                "success": False,
                "message": "Email ou senha incorretos"
            }), 401



    @app.route("/api/verificar-email")
    def verifica():
        email = request.args.get("email")
        existe = db.session.query(Usuario.id).filter_by(email=email).first() is not None
        return jsonify({"existe": existe})
    

    @app.route("/isLogado")
    def isLogado():
        if "user_id" in session:
            print('usuário logado com sucesso')
            return jsonify({
            "logged_in": True,
            "user_email": session["user_email"]
        })
        return jsonify({"logged_in": False})


    @app.route("/api/contatos/<letra>")
    def send_contatos(letra):
        alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


        if "user_id" not in session:
            return jsonify({"erro": "Usuário não logado"}), 200

        user_id = session["user_id"]

        if letra == "#" or letra == "%23":
            contatos =(Contatos.query.filter(Contatos.contato_origem == user_id).order_by(Contatos.nome.asc()).all())
        elif letra in alfabeto:
            contatos = (Contatos.query.filter(Contatos.contato_origem == user_id,func.upper(Contatos.nome).like(f"{letra}%")).order_by(Contatos.nome.asc()).all())
        else:
            return jsonify({"erro": "requisição errada"}), 406

        

        contatos_list = [contato.to_dict() for contato in contatos]
        return jsonify(contatos_list)
    
    @app.route("/logout", methods=["POST"])
    def logout():
        session.clear()  
        return jsonify({"success": True, "message": "Logout realizado com sucesso"}), 200
    
    
    @app.route("/contatos/atualizar", methods=["POST"])
    def atualizar_contato():
        if "user_id" not in session:
            return jsonify({"success": False, "message": "Usuário não logado"}), 401

        user_id = session["user_id"]
        dados = {}
        imagem = None

        # se veio JSON puro
        if request.is_json:
            dados = request.get_json()
        else:
            # se veio multipart/form-data (com ou sem imagem)
            dados = request.form.to_dict()
            imagem = request.files.get("imagem")

        contato_id = dados.get("id_editar")
        nome = dados.get("nome_editar")
        telefone = dados.get("telefone_editar")
        tag = dados.get("tag_editar")
        email = dados.get("email_editar")

        if not contato_id:
            return jsonify({"success": False, "message": "ID do contato obrigatório"}), 400

        # validações básicas
        erros = {}
        if not nome or len(nome) < 2:
            erros['nome'] = "Nome inválido"
        if not email or "@" not in email:
            erros['email'] = "Email inválido"

        if erros:
            print(erros)
            return jsonify({"success": False, "errors": erros}), 400

        contato = Contatos.query.filter_by(id=contato_id, contato_origem=session["user_id"]).first()
        if not contato:
            return jsonify({"success": False, "message": "Contato não encontrado"}), 404

        # atualiza os campos
        contato.nome = nome
        contato.telefone = telefone
        contato.email = email
        contato.tag = tag

        # se veio imagem, salva no servidor
        if imagem:

    
            BASE_DIR = Path(__file__).resolve().parent
            user_folder = BASE_DIR / "uploads" / f"user_{user_id}"
            user_folder.mkdir(parents=True, exist_ok=True)

            # sanitiza e valida extensão
            sanitized = secure_filename(imagem.filename)
            ext = Path(sanitized).suffix.lower()
            allowed = {".jpg", ".jpeg", ".png"}
            if ext not in allowed:
                return jsonify({"success": False, "message": "Extensão de imagem não suportada"}), 400

            base_name = f"profile_pic_{contato_id}"
            for e in allowed:
                old_path = user_folder / f"{base_name}{e}"
                if old_path.exists():
                    try:
                        old_path.unlink()
                    except Exception as ex:
                        print("Erro ao remover imagem antiga:", ex)

        new_path = user_folder / f"{base_name}{ext}"
        imagem.save(str(new_path))



        try:
            db.session.commit()
            return jsonify({"success": True, "message": "Contato atualizado com sucesso"})
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify({"success": False, "message": "Erro ao atualizar contato"}), 500


    @app.route("/contatos/adicionar", methods=["POST"])
    def adicionar_contato():
        if "user_id" not in session:
            return jsonify({"success": False, "message": "Usuário não logado"}), 401

        user_id = session["user_id"]
        nome = request.form.get("nome_adicionar")
        telefone = request.form.get("telefone_adicionar")
        email = request.form.get("email_adicionar")
        tag = request.form.get("tag_adicionar", "contatos")
        imagem = request.files.get("imagem")

        # Validações básicas
        erros = {}
        if not nome or len(nome) < 2:
            erros["nome"] = "Nome inválido"
        if not email or "@" not in email:
            erros["email"] = "Email inválido"
        if not telefone or len(telefone) < 8:
            erros["telefone"] = "Telefone inválido"

        if erros:
            return jsonify({"success": False, "errors": erros}), 400

        novo_contato = Contatos(
            nome=nome,
            telefone=telefone,
            email=email,
            tag=tag,
            contato_origem=user_id
        )

        try:
            db.session.add(novo_contato)
            db.session.flush() 

            if imagem:
                ext = os.path.splitext(imagem.filename)[1].lower() 
                filename = secure_filename(f"profile_pic_{novo_contato.id}{ext}")

                BASE_DIR = os.path.dirname(os.path.abspath(__file__))
                user_folder = os.path.join(BASE_DIR, "uploads", f"user_{user_id}")
                os.makedirs(user_folder, exist_ok=True)

                imagem_path = os.path.join(user_folder, filename)
                imagem.save(imagem_path)

            db.session.commit()
            return jsonify({"success": True, "message": "Contato adicionado com sucesso"})

        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify({"success": False, "message": "Erro ao adicionar contato"}), 500

    @app.route("/contatos/deletar", methods=["POST"])
    def deletar_contato():
        if "user_id" not in session:
            return jsonify({"success": False, "message": "Usuário não logado"}), 401

        dados = request.get_json()
        contato_id = dados.get("id")

        if not contato_id:
            return jsonify({"success": False, "message": "ID obrigatório"}), 400

        contato = Contatos.query.filter_by(id=contato_id, contato_origem=session["user_id"]).first()

        if not contato:
            return jsonify({"success": False, "message": "Contato não encontrado"}), 404

        try:
            db.session.delete(contato)
            db.session.commit()
            return jsonify({"success": True, "message": "Contato deletado com sucesso"})
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify({"success": False, "message": "Erro ao deletar contato"}), 500
    
    
    @app.route("/contatos/<int:contato_id>/imagem")
    def contato_imagem(contato_id):
        from pathlib import Path
        from flask import send_file, abort, session

        contato = Contatos.query.get(contato_id)
        if not contato:
            abort(404)

        # Verifica se o contato pertence ao usuário logado
        if contato.contato_origem != session.get("user_id"):
            print('não está logado')
            abort(403)

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        user_folder = os.path.join(BASE_DIR, "uploads", f"user_{contato.contato_origem}")

        # Tenta encontrar a imagem com qualquer extensão
        for ext in [".jpg", ".jpeg", ".png"]:
            filename = f"profile_pic_{contato.id}{ext}"
            imagem_path = os.path.join(user_folder, filename)
            if os.path.exists(imagem_path):
                return send_file(imagem_path)

        # Se não encontrou nenhuma imagem, retorna a padrão
        rootpath = Path(__file__).resolve().parent
        default_image_path = rootpath / "uploads" / "mockup_pessoa.webp"
        if os.path.exists(default_image_path):
            return send_file(str(default_image_path))
        else:
            abort(404)


        