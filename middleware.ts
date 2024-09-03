import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import useSupabaseServer from './utils/supabase-server';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const coolieStore = cookies();
    const client = useSupabaseServer(coolieStore);
    const { data: {user} } = await client.auth.getUser();

    if (!user && url.pathname !== '/login') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
  matcher: '/((?!login|_next/static|favicon.ico).*)',
};