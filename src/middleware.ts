import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Define paths that require auth
    const protectedPaths = [
        '/dashboard',
        '/profile',
        '/settings',
        '/analyze',
        '/weather',
        '/results',
        '/team'
    ];

    // Define paths that are for guests only (redirect to home if logged in)
    const guestPaths = ['/login', '/register'];

    const path = request.nextUrl.pathname;

    // Check if the current path is protected and user is not authenticated
    if (protectedPaths.some(p => path.startsWith(p)) && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(url);
    }

    // Check if the current path is for guests and user is already authenticated
    if (guestPaths.some(p => path.startsWith(p)) && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/settings/:path*',
        '/analyze/:path*',
        '/weather/:path*',
        '/results/:path*',
        '/team/:path*',
        '/login',
        '/register'
    ],
};
