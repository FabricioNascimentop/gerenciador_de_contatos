export async function handleLogout() {
    try {
        const res = await fetch("http://localhost:5000/logout", {
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
