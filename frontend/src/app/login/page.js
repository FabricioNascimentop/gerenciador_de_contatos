"use client";

import handlelogin from '@/utils/serverActions/login';
import { GuardIcon } from '../../components/icons';


export default function Login(){

    return(
        <main className='contasManager'>
            <div className='espaço'>
                <GuardIcon/>
            </div>
            <div className='quadroConta'>
                <div className='contaContainer'>

                    <div className='contaSwapper'>não tem uma conta ? <a href="/cadastro">criar conta</a></div>
                    <div className='formConta'>
                        <h2>Acessar conta</h2>
                        <form onSubmit={handlelogin}>
                    
                            <div className='label-input nome'>
                                <label>E-mail</label>
                                <input type="email" placeholder="digite seu email" autoComplete='username' name="email_login"/>
                            </div>

                            <div className="label-input">
                                <label>Senha</label>
                                <input type="password" placeholder="Digite sua senha" required autoComplete="new-password" name='senha_login'/>
                            </div>
                    
                    
                        <input type="submit" value="Acessar conta" className='btnSubmit'/>
                    
                        </form>
                    
                    </div>
                </div>
            </div>
        </main>
    )
}

