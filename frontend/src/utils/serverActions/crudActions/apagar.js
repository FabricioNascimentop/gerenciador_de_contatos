export default async function handleApagar(id) {
    if (!id) return;

    try {
        const response = await fetch("http://localhost:5000/contatos/deletar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ id })
        });

        if (!response.ok) throw new Error("Erro ao apagar contato");

        const result = await response.json();
        console.log("Contato apagado:", result);

        window.location.reload();
    } catch (error) {
        console.error("Erro no fetch:", error);
    }
}
