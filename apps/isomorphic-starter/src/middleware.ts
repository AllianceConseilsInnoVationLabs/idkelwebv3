import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

const noHydrogenLayout = ['/sign-in'];
const unprotected = ['/sign-in'];

export default async function middleware(request: NextRequest) {
  /** 
   * Ajouter le chemin dans les headers afin 
   * qu'il soit disponible dans les server components
   */
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  headers.set("x-no-hydrogen", (noHydrogenLayout.includes(request.nextUrl.pathname))+'');

  /**
   * Authentification
   * Vérifications &
   * Redirections
   */
  const cookie = cookies().get('session')?.value;
  const session: any = await decrypt(cookie);
  
  //Si la page demandée est protégée et que l'utilisateur n'est pas connecté, on redirige vers la page de connexion
  if(!unprotected.includes(request.nextUrl.pathname) && !session?.UserInfos?.id) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }
  
  //Si la page demandée est protégée et que l'utilisateur n'est pas connecté, on redirige vers la page de connexion
  if(unprotected.includes(request.nextUrl.pathname) && session?.UserInfos?.id) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  /** Fin authentification */

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    }
  ],
};