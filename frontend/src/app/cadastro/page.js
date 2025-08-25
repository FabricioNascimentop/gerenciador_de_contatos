"use client";
import handleCadastroUsuario from '@/utils/serverActions/crudActions/cadastro';
import { useState } from 'react';
import { GuardIcon } from '../../components/icons';
import { InputEmail, InputNome, InputSenhaComConfirmacao } from '../../components/inputs';


export default function Cadastro(){
    const [senhaOk, setSenhaOk] = useState(false)
    const [nomeOk, setNomeOk] = useState(false)
    const [emailOk, setEmailOk] = useState(false)


    return(
        <main className='contasManager'>
            <div className='espaço'>
                <GuardIcon/>
            </div>
            <div className='quadroConta'>
                <div className='contaContainer' style={{margin: '10% auto'}}>

                    <div className='contaSwapper'>já está cadastrado ? <a href="/login">login</a></div>
                    <div className='formConta' style={{marginTop: '5%'}}>
                        <h2>Criar conta</h2>
                        
                        <form onSubmit={(e) => {
                            handleCadastroUsuario(e, { senhaOk, nomeOk, emailOk });
                        }}>
                    
                        <InputNome name={"nome_cadastro"} setNomeOk={setNomeOk}/>
                        <InputEmail name={"email_cadastro"} setEmailOk={setEmailOk}/>
                        <InputSenhaComConfirmacao name={"senha_cadastro"} setSenhaOk={setSenhaOk}/>
                        
                    
                    
                        <input type="submit" value="Criar conta" className='btnSubmit'/>
                    
                        </form>
                    
                    </div>
                </div>
            </div>
        </main>
    )
}

