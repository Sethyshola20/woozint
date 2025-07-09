import { createClient } from './server'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabase = await createClient()

  // IMPORTANT: DO NOT MOVE auth.getUser() further down
  const { data: { user } } = await supabase.auth.getUser()
console.log(user)
  // ✅ Configure allowed public routes
  const publicPaths = [
    '/',
    '/login',
    '/register'
  ]

  const pathname = request.nextUrl.pathname

  //  Check if this request is for one of the public paths
  const isPublicPath = publicPaths.some((path) => pathname === (path))
  // ✅ No user? Only allow public paths
  if (!user) {
    // No user, handle public or redirect before accessing user.id
    if (!isPublicPath) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    // If public path, just return response
    return supabaseResponse
}

    
  // ✅ Maintain the cookies & return the response
  return supabaseResponse
}
