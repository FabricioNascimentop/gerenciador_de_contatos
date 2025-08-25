import { validarEmail, validarNome, validarSenha, validarTelefone } from "../utils/validadores";
import { useState, useEffect } from "react";

export function InputNome({name, setNomeOk, defaultValue}){

    const [nome, setNome] =  useState(defaultValue ? defaultValue : "");
    const [erro, setErro] = useState("");

    function handleChange(e) {
        const valor = e.target.value;
        setNome(valor);
        setErro(validarNome(valor));
    }


    useEffect(() => {
        if(!erro && nome != ""){
            setNomeOk(true)
        }
        else{
            setNomeOk(false)
        }
    },[nome])

    return(
        <div className='label-input nome'>
            <label>Nome</label>
            <input 
                type="text"
                placeholder="digite seu nome"
                name={name}
                value={nome}
                onChange={handleChange}
            />
            {erro && <p className="error">{erro}</p>}
        </div>
    )
}

export function InputEmail({name, setEmailOk, defaultValue}){
    const [email, setEmail] = useState(defaultValue ? defaultValue : "");
    const [erro, setErro] = useState("");
    
    function handleChange(e) {
        const valor = e.target.value;
        setEmail(valor);
        validarEmail(valor).then((msg) => {
            setErro(msg);
        });
    }
    useEffect(() => {
        if(!erro && email !== ""){
            setEmailOk(true)
        }
        else{
            setEmailOk(false)
        }
    },[erro, email, setEmailOk])


    return(
        <div className='label-input nome'>
            <label>E-mail</label>
            <input 
                type="text"
                placeholder="digite seu email"
                name={name}
                value={email}
                onChange={handleChange}
                autoComplete="username"
            />
            {erro && <p className="error">{erro}</p>}
        </div>
    )
}

export function InputSenha({name}){
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState([]);
    
    function handleChange(e) {
        const valor = e.target.value;
        setSenha(valor);
        setErros(validarSenha(valor));
    }

    return(
        <div className="label-input">
        <label>Senha</label>
        <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={handleChange}
            required
            autoComplete="new-password"
            name={name}
        />
        
        {erros.length > 0 && (
            <>
            {erros.map((erro, i) => (
                <p key={i} className="error" style={{margin: '2px'}}>{erro}</p>
            ))}
            </>
        )}
    </div>
    )
}

export function InputSenhaComConfirmacao({name, setSenhaOk}){
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [erros, setErros] = useState([]);
    const [erroConfirma, setErroConfirma] = useState("");

    function handleSenhaChange(e) {
        const valor = e.target.value;
        setSenha(valor);
        setErros(validarSenha(valor));
    }

    function handleConfirmaChange(e) {
        const valor = e.target.value;
        setConfirmaSenha(valor);
    }

    useEffect(() => {
        if (confirmaSenha === "") {
            setErroConfirma("");
        } else if (confirmaSenha === senha) {
            setErroConfirma("✅ Senhas conferem");
            const senhaOk = erros.every(msg => msg.startsWith("✅"));
            if(senhaOk){
                setSenhaOk(true)
            }
            else{
                setSenhaOk(false)
            }
        } else {
            setErroConfirma("❌ As senhas não conferem");
        }
    }, [senha, confirmaSenha]);

    return(
        <>
        <div className="label-input">
        <label>Senha</label>
        <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={handleSenhaChange}
            required
            autoComplete="new-password"
            name={name}
            aria-autocomplete=""
        />
        {erros.length > 0 &&
            erros.map((erro, i) => (
            <p key={i} className="error" style={{ margin: "2px" }}>
                {erro}
            </p>
            ))}
        </div>
        <div className="label-input">
            <label>Confirme a senha</label>
            <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmaSenha}
            onChange={handleConfirmaChange}
            required
            autoComplete="new-password"
            name={`${name}_confirma`}
            aria-autocomplete=""
            />
            {erroConfirma && (<p className="error">{erroConfirma}</p>)}
        </div>
    </>
    )
}


export function InputPesquisa(){
    return(
       <>
        <input type="search" className="search" placeholder="pesquisar"/>
       </>
    )
}

export function InputTelefone({ name, setTelefoneOk, defaultValue }) {
    const [telefone, setTelefone] = useState(defaultValue ? defaultValue : "");
    const [erro, setErro] = useState("");

    function handleChange(e) {
        const valor = e.target.value;
        setTelefone(valor);
        setErro(validarTelefone(valor));
    }

    useEffect(() => {
        if (!erro && telefone !== "") {
            setTelefoneOk(true);
        } else {
            setTelefoneOk(false);
        }
    }, [telefone, erro, setTelefoneOk]);

    return (
        <div className="label-input telefone">
            <label>Telefone</label>
            <input
                type="tel"
                placeholder="(xx) xxxxx-xxxx"
                name={name}
                value={telefone}
                onChange={handleChange}
                autoComplete="tel"
            />
            {erro && <p className="error">{erro}</p>}
        </div>
    );
}