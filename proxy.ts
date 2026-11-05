import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  // No subdomínio da VSL (vsl.attendio.com.br), a raiz deve servir a
  // página /vsl em vez do redirect padrão pra /login — mesmo deploy,
  // só muda o que aparece na raiz de cada domínio/subdomínio.
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("vsl.") && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/vsl";
    return NextResponse.rewrite(url);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image (static assets)
     * - favicon.ico, images
     * - api/webhooks (the Hubla webhook must never be redirected/blocked)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
