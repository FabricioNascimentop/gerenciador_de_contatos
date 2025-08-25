export function validarNome(valor) {
    // Regex: apenas letras + espaços + acentos
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (valor.trim().length < 3) {
      return "O nome deve ter pelo menos 3 caracteres.";
    }
    if (!regex.test(valor)) {
      return "O nome só pode conter letras e espaços.";
    }
    return "";
  }

  export async function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(valor)) {
      return "Digite um e-mail válido.";
    }

    const res = await fetch(`https://gerenciador-de-contatos.onrender.com/api/verificar-email?email=${encodeURIComponent(valor)}`)
    const data = await res.json()
    

    if (data.existe === true) {
      return "Este e-mail já está cadastrado.";
  }

    return "";
  }

  export function validarSenha(valor) {
  const analise = [];

  const regras = [
    { cond: valor.length >= 8, msg: "Mínimo de 8 caracteres" },
    { cond: /[A-Z]/.test(valor), msg: "Pelo menos uma letra maiúscula" },
    { cond: /[0-9]/.test(valor), msg: "Pelo menos um número" },
    { cond: /[!@#$%^&*(),.?\":{}|<>]/.test(valor), msg: "Pelo menos um símbolo" },
  ];

  regras.forEach(item => {
    analise.push(item.cond ? `✅ ${item.msg}` : `❌ ${item.msg}`);
  });

  return analise;
}

export function validarTelefone(valor) {
  const limpo = valor.replace(/\D/g, "");

  if (limpo.length < 10 || limpo.length > 11) {
    return "Telefone deve ter 10 ou 11 dígitos.";
  }

  const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  if (!regex.test(valor)) {
    return "Telefone inválido. Ex: (11) 91234-5678";
  }

  return "";
}

