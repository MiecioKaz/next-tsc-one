import MySites from "@/components/mySites";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import type { Session } from "next-auth";

const getSite = async (email: string) => {
  try {
    const sites = await prisma.site.findMany({
      where: {
        authorEmail: email,
      },
    });
    return sites;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const EditSitePage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (
    session !== null &&
    session.user !== undefined &&
    typeof session.user.email === "string"
  ) {
    const sites = await getSite(session.user.email);

    if (sites && sites.length > 0) {
      return (
        <section>
          <MySites sites={sites} />
        </section>
      );
    } else {
      return (
        <h1 className="text-center text-4xl text-red-400">
          You have not created any sites so far!
        </h1>
      );
    }
  }
};
export default EditSitePage;
