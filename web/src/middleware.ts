import { NextRequest, NextResponse } from 'next/server';



export const config = {
    // matcher: [
    //     '/x/:path*',
    //     '/blog',
    // ]
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}


export function middleware(req: NextRequest) {
    const url = req.url;
    const { pathname, search, host } = req.nextUrl;
    if (pathname.startsWith('/x/')) {
        console.log({ pathname, search }, new URL('/api', url).toString())
        return NextResponse.rewrite(new URL('/api' + pathname + search, url));
    }
    // console.log(req.headers.get('host'))
    if (req.headers?.get('host')?.startsWith('blog.')) {
        return NextResponse.rewrite(new URL('/blog' + pathname + search, url));
    }
    return NextResponse.next();
}

// https://cseitz.dev/x/github?u=cloudflare

