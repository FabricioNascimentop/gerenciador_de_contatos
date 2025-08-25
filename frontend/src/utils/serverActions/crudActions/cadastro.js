export default async function handleCadastroUsuario(e, { senhaOk, nomeOk, emailOk }){
    e.preventDefault()
    const formData = new FormData(e.target)


    if (!senhaOk || !nomeOk || !emailOk) {
      alert("Preencha todos os campos corretamente antes de enviar!");
      return;
  }

    if(senhaOk && nomeOk && emailOk){
      alert("conta criada com sucesso")
      window.location.href = '/dashboard'
      const res = await fetch("http://localhost:5000/cadastrar", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
    }

    
}