import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from '@lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Public paths that don't require authentication
    const isPublicPath = path === '/login' || path === '/register' || path === '/'

    try {
        const token = request.cookies.get('auth-token')?.value

        if (!token && !isPublicPath && path !== '/') {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (token && isPublicPath && path !== '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        return NextResponse.next()
    } catch (error) {
        if (!isPublicPath && path !== '/') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/', '/login', '/register', '/dashboard/:path*']
}