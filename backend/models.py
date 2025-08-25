from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.inspection import inspect
from sqlalchemy.sql import func

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = "contas"

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    senha = db.Column(db.Text, nullable=False)
    nome = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<Usuario id={self.id} email={self.email}>"

    @classmethod
    def create_user(cls, email, senha, nome):

        senha_hash = generate_password_hash(senha)
        usuario = cls(email=email, senha=senha_hash, nome=nome)
        db.session.add(usuario)
        db.session.commit()
        return usuario

    def check_password(self, senha):
        return check_password_hash(self.senha, senha)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
    

class Contatos(db.Model):
    __tablename__ = "contatos" 

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    nome = db.Column(db.Text, nullable=True)
    telefone = db.Column(db.Text, nullable=True)
    email = db.Column(db.Text, nullable=True)
    contato_origem = db.Column(db.BigInteger, nullable=True)
    tag = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "nome": self.nome,
            "telefone": self.telefone,
            "email": self.email,
            "contato_origem": self.contato_origem,
            "tag": self.tag
        }