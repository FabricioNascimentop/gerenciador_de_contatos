export async function fetchImagemContato(contatoId) {
  try {
    const res = await fetch(`http://localhost:5000/contatos/${contatoId}/imagem`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Erro ao carregar imagem");

    const blob = await res.blob();
    return URL.createObjectURL(blob); 
  } catch (e) {
    console.error(e);
    return "/img/mockup_pessoa.webp"; 
  }
}
