import { NextRequest, NextResponse } from 'next/server';



export const config = {
    matcher: [
        '/x/:path*',
    ]
}


export function middleware(req: NextRequest) {
    const url = req.url;
    const { pathname, search } = new URL(url);
    if (pathname.startsWith('/x/')) {
        console.log({ pathname, search }, new URL('/api', url).toString())
        return NextResponse.rewrite(new URL('/api' + pathname + search, url));
    }
    return NextResponse.next();
}

// https://cseitz.dev/x/github?u=cloudflare

