import handleAtualiza from "@/utils/serverActions/crudActions/atualiza"
import { handleLogout } from "@/utils/serverActions/logout"
import { InputEmail, InputNome, InputTelefone } from "./inputs"
import { useState } from "react"
import handleAdicionarContato from "@/utils/serverActions/crudActions/adicionarContato"
import handleApagar from "@/utils/serverActions/crudActions/apagar"
import { UserIcon } from "./icons"
import Image from "next/image"


export function ModalConfig({onClick}){
    return(
        <div className="bgOpaco">
            <div className="ConfigContain">
                <div onClick={onClick} className="fechar">X</div>
                <h2>Configurações</h2>
                <br/>
                <p>--aqui aparecerão as configurações--</p>
            </div>
        </div>
    )
}

export function ModalLogout({onClick}){
    return(
        <div className="bgOpaco">
            <div className="logoutContain">
                <div onClick={onClick} className="fechar">X</div>
                <h2>Deseja sair ?</h2>
                <br/>
                <div>
                    <div className="sim" onClick={handleLogout}>Sim</div>
                    <div onClick={onClick} className="nao">Não</div>
                </div>
            </div>
        </div>
    )
}

export function ModalEditar({ onClick, pessoa }) {
  let { nome, tag, telefone, email, id } = pessoa;
  tag = tag || "contatos";

  const [nomeOk, setNomeOk] = useState();
  const [emailOk, setEmailOk] = useState();
  const [telefoneOk, setTelefoneOk] = useState();

  const [previewUrl, setPreviewUrl] = useState(
    `http://localhost:5000/contatos/${id}/imagem`
  );
  const [selectedFile, setSelectedFile] = useState();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <div className="bgOpaco">
      <div className="editarContain">
        <div onClick={onClick} className="fechar">
          X
        </div>

        <form
          onSubmit={(e) =>
            handleAtualiza(e, nomeOk, telefoneOk, emailOk, selectedFile, id)
          }
        >
          <div className="insertImage">
            <div className="previewImage">
              {previewUrl ? (
                <Image src={previewUrl} width={50} height={50} alt="Preview" />
              ) : (
                <div className="defaultPreviewImage">
                  <UserIcon color="#5E5E5E" />
                </div>
              )}
            </div>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {previewUrl ? (
              <label htmlFor="fileInput" className="btnUpload">
                Substituir
              </label>
            ) : (
              <label htmlFor="fileInput" className="btnUpload">
                + Adicionar foto
              </label>
            )}
          </div>

          <InputNome
            setNomeOk={setNomeOk}
            defaultValue={nome}
            name={"nome_editar"}
          />

          <div className="label-input">
            <label style={{ textAlign: "left" }}>tag</label>
            <input
              type="text"
              defaultValue={tag}
              name="tag_editar"
              maxLength={10}
            />
          </div>

          <InputTelefone
            setTelefoneOk={setTelefoneOk}
            defaultValue={telefone}
            name={"telefone_editar"}
          />

          <InputEmail
            setEmailOk={setEmailOk}
            defaultValue={email}
            name={"email_editar"}
          />

          <input type="hidden" value={id} name="id_editar" />

          <input type="submit" value="Salvar" className="btnSubmit" />
        </form>
      </div>
    </div>
  );
}


export function ModalAdicionar({ onClick }) {
    const [nomeOk, setNomeOk] = useState();
    const [emailOk, setEmailOk] = useState();
    const [telefoneOk, setTelefoneOk] = useState();


    const [previewUrl, setPreviewUrl] = useState()
    const [selectedFile, setSelectedFile] = useState();

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file){
            return
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    return (
        <div className="bgOpaco">
            <div className="adicionarContainer">
                <div onClick={onClick} className="fechar">X</div>

                <form onSubmit={(e) => handleAdicionarContato(e, nomeOk, telefoneOk, emailOk, selectedFile)}>

                    <div className="insertImage">
                        <div className="previewImage">
                            {previewUrl ? <Image src={previewUrl} width={50} height={50} alt="Preview" /> : (
                                <div className="defaultPreviewImage">
                                    <UserIcon color="#5E5E5E"/>
                                </div>
                            )}
                        </div>
                             <input 
                                type="file" 
                                accept=".jpg, .jpeg, .png" 
                                id="fileInput" 
                                onChange={handleFileChange} 
                                style={{ display: "none" }} 
                            />

                            {previewUrl 
                            ? 
                            <label htmlFor="fileInput" className="btnUpload">Substituir</label>
                            :
                            <label htmlFor="fileInput" className="btnUpload">+ Adicionar foto</label>}


                    </div>
                    
                    <InputNome setNomeOk={setNomeOk} name={"nome_adicionar"} />

                    <div className="label-input">
                        <label style={{ textAlign: "left" }}>tag</label>
                        <input 
                            type="text" 
                            name="tag_adicionar" 
                            defaultValue="contatos" 
                            maxLength={10} 
                        />
                    </div>

                    <InputTelefone setTelefoneOk={setTelefoneOk} name={"telefone_adicionar"} />

                    <InputEmail setEmailOk={setEmailOk} name={"email_adicionar"} />

                    <input type="submit" value="Adicionar" className="btnSubmit" />
                </form>
            </div>
        </div>
    );
}



export function ModalApagar({ onClick, pessoa }) {
    let {id, nome} = pessoa
    return (
        <div className="bgOpaco">
            <div className="apagarContain">
                <div onClick={onClick} className="fechar">X</div>
                <h2>Deseja apagar este contato?</h2>
                <p style={{ margin: "10px 0" }}>
                    <strong>{nome}</strong> será removido da sua lista.
                </p>
                <div>
                    <div className="sim" onClick={() => handleApagar(id)}>Sim</div>
                    <div onClick={onClick} className="nao">Não</div>
                </div>
            </div>
        </div>
    );
}
