export default async function handleAtualiza(
  e,
  nomeOk,
  telefoneOk,
  emailOk,
  selectedFile
) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const dados = Object.fromEntries(formData.entries());

  // validação simples
  if (!(nomeOk && telefoneOk && emailOk)) {
    alert("Preencha corretamente os campos obrigatórios.");
    return;
  }

  try {
    let response;

    if (selectedFile) {
      // Caso com imagem → multipart/form-data
      const formDataUpload = new FormData();
      for (const [key, value] of Object.entries(dados)) {
        formDataUpload.append(key, value);
      }
      formDataUpload.append("imagem", selectedFile);

      response = await fetch("https://gerenciador-de-contatos.onrender.com/contatos/atualizar", {
        method: "POST",
        credentials: "include",
        body: formDataUpload, // sem Content-Type manual → o browser define o boundary
      });
    } else {
      // Caso sem imagem → JSON (segue teu padrão)
      response = await fetch("https://gerenciador-de-contatos.onrender.com/contatos/atualizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
      });
    }

    if (!response.ok) throw new Error("Erro ao atualizar a pessoa");

    const result = await response.json();
    console.log("result", result);
    window.location.reload();
  } catch (error) {
    console.error("Erro no fetch:", error);
    alert("Erro ao atualizar contato.");
  }
}
