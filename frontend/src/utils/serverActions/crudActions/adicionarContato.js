export default async function handleAdicionarContato(e, nomeOk, telefoneOk, emailOk, selectedFile) {
  e.preventDefault();

  if (!nomeOk || !telefoneOk || !emailOk) {
    window.alert("Confira novamente os dados e tente de novo");
    return;
  }

  const formData = new FormData(e.target);

  if (selectedFile) {
    formData.append("imagem", selectedFile);
  }

  try {
    const response = await fetch("http://localhost:5000/contatos/adicionar", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) throw new Error("Erro ao adicionar a pessoa");

    const result = await response.json();
    console.log("result", result);

  } catch (error) {
    console.error("Erro no fetch:", error);
  }
}
