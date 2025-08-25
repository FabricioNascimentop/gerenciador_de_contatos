"use client";
import Image from "next/image"
import { useEffect, useState } from "react"
import { UserIcon, GearIcon, LogoutIcon, Cadeadinho } from "../../components/icons";
import { InputPesquisa } from "@/components/inputs";
import Contato from "@/components/contato";
import { ModalAdicionar, ModalApagar, ModalConfig, ModalEditar, ModalLogout } from "@/components/modais";
import fetchContatos from "@/utils/fechContatos";


export default function Home(){
    const [config, setConfig] = useState(false)
    const [logout, setLogout] = useState(false)
    const [editar, setEditar] = useState(false)
    const [adicionar, setAdicionar] = useState(false)
    const [apagar, setApagar] = useState(false)

    const [dados, setDados] = useState([])
    const [letra, setLetra] = useState("#")

    const alfabeto = [
        '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    const emailUsuario = 'fabricio.nascimentop2024@gmail.com'

    useEffect(() => {
        async function outroFetchContatos() {
            const data = await fetchContatos(letra)
            setDados(data) 
        }
    outroFetchContatos()
    }, [letra])


    

    return(
        <main className="dashboard">
            
            <div className="lateral">
                <Image src={"/iconEscudinho.svg"} width={30} height={30} alt="ícone escudinho"/>
                <div className="buttons">
                    <UserIcon color={"#C4F120"}/>
                    <GearIcon color={config ? "#C4F120" : '#fff'} onClick={() => {setConfig(true), setLogout(false)}}/>
                    <LogoutIcon color={logout ? "#C4F120" : '#fff'} onClick={() => {setLogout(true), setConfig(false)}}/>
                </div>
                <div className="info">
                    <p>Logado como:</p>
                    <span>{emailUsuario}</span>
                </div>
            </div>

            <div className="dashboard">
                <div className="dashboardContent">

                    <div className="header">
                        <h2>Lista de Contatos</h2>
                        <div className="headerDir">
                            <InputPesquisa/>
                            <div className="addContatos" onClick={() => {setAdicionar(true)}}>+ Adicionar contato</div>
                            <Cadeadinho/>
                        </div>
                    </div>

                    <div className="dashboardMain">

                        <div className="selector">
                            {alfabeto.map((letra, i) => (
                                <span key={i} onClick={() => {setLetra(letra)}}>{letra}</span>
                            ))}
                        </div>

                        <div className="dashboardMainContent">
                                <span className="letraSelector">{letra}</span>
                                <hr/>
                                <div className="grid">
                                    <div className="nome">Nome</div>
                                    <div className="telefone">Telefone</div>
                                    <div className="email">Email</div>
                                </div>
                                <div className="contatos">
                                    {dados.map((pessoa, idx) => (
                                        <Contato pessoa={pessoa} key={idx} setEditar={setEditar} setApagar={setApagar}/>
                                    ))}
                                </div>
                        </div>    

                    </div>
                </div>
            </div>

            {config && (
                <ModalConfig onClick={() => {setConfig(false)}}/>
            )}
            {logout && (
                <ModalLogout onClick={() => setLogout(false)}/>
            )}
            {editar && (
                <ModalEditar onClick={() => setEditar(false)} pessoa={editar}/>
            )}
            {adicionar && (
                <ModalAdicionar onClick={() => {setAdicionar(false)}}/>
            )}
            {apagar && (
                <ModalApagar onClick={() => {setApagar(false)}} pessoa={apagar}/>
            )}
        </main>
    )
}