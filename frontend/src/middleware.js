import { NextResponse } from 'next/server'

export async function middleware(request) {
  const cookie = request.cookies.get("session")?.value || ""
  const { pathname } = request.nextUrl


  let is_logado = false
  const session = request.cookies.get("session")?.value
  try {
    const res = await fetch("https://gerenciador-de-contatos.onrender.com/isLogado", {
      headers: {
        Cookie: `session=${cookie}`
      },
      credentials: "include",
      method: "GET",
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      is_logado = data.logged_in === true
    }
  } catch (err) {
    console.error("Erro ao verificar login:", err)
  }

  // Protege rotas privadas
  if (!is_logado && (pathname.startsWith("/dashboard") || pathname.startsWith("/cadastrar-contatos"))) {
    return NextResponse.redirect(new URL('/login?redirecionado=true', request.url))
  }

  // Evita acessar login/register já logado
  if (is_logado && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cadastrar-contatos/:path*',
    '/login',
    '/register'
  ],
}
