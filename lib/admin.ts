export const isAdmin = (userId?: string | null) => {
  // TODO - use id
  return userId === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
};
