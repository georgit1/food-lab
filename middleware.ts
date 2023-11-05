import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/sign-in',
  },
});

export const config = {
  matcher: ['/profile/:path*'],
};

// export { default } from 'next-auth/middleware';

// export const config = {
//   // matcher: ['/details/:path*', '/manage/:path*', '/profile'],
//   matcher: ['/details/:path*', '/manage/:path*', '/profile'],
// };
