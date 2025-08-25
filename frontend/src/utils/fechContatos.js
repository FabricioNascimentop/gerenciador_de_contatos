export default async function fetchContatos(letra) {
    const letra_encapada = encodeURIComponent(letra)
    const res = await fetch(`https://gerenciador-de-contatos.onrender.com/api/contatos/${letra_encapada}`,{
        method: "GET",
        credentials: "include"
    }
    )
    const data = await res.json()
    return data
}


