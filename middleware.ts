import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {redirect} from "next/navigation";
 
// This function can be marked `async` if using `await` inside
export async function  middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/details/:path*',
}