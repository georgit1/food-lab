export const isAdmin = (email?: string | null) => {
  // TODO - use id
  return email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
};
