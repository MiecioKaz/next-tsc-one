export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/newSite", "/editSites"],
  // secret: process.env.NEXTAUTH_SECRET,
};
