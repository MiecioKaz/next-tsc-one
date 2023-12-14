export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/newSite", "/editSites"],
};
