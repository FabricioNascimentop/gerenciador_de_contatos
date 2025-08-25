export async function handleLogout() {
    try {
        const res = await fetch("https://gerenciador-de-contatos.onrender.com/logout", {
            method: "POST",
            credentials: "include"
        });

        const data = await res.json();

        if (!data.success) {
            console.log(data.mensage)
        }
        else{
            window.location.reload()
        }

    } catch (err) {
        console.error("Erro ao chamar logout:", err);
    }
}
