export default async function handleLogin(e){

    e.preventDefault()

    const formData = new FormData(e.target)
    const res = await fetch("https://gerenciador-de-contatos.onrender.com/login", {
      method: "POST",
      body: formData,
      credentials: "include"
    })


    const data = await res.json()
    if(data.success){
      alert("login realizado com sucesso")
      window.location.href = "/dashboard"
    }
    else{
      alert("email ou senha incorretos")
    }
}