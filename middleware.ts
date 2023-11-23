import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/sign-in',
  },
});

export const config = {
  matcher: [
    '/manage/:path*',
    '/meal/:path*',
    '/profile/:path*',
    '/calculator',
    '/meals',
  ],
};
