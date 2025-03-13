import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    (await cookies()).delete('auth-token')
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL))
}