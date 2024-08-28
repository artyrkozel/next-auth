import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import useSupabaseServer from './utils/supabase-server';

export async function middleware(req: NextRequest) {
    const coolieStore = cookies();
    const client = useSupabaseServer(coolieStore);
    const { data: {user} } = await client.auth.getUser();

    const protectedPaths = ['/ssrwatches', '/watches'];
    const url = req.nextUrl.clone();

    if (protectedPaths.some(path => url.pathname.startsWith(path))) {
        if (!user) {
          url.pathname = '/login';
          return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}