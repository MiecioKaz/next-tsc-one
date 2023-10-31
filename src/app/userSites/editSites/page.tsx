import MySites from "@/app/components/mySites";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth";
import clientPromise from "../../utils/mongodb";

const getSite = async (id: string) => {
  try {
    const client = await clientPromise;
    const db = client.db("bel-sites");

    const sites = await db
      .collection("sites")
      .find({ userId: { $eq: id } })
      .toArray();

    return sites;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
};

const EditSitePage = async () => {
  const session = await getServerSession(authOptions);

  const sites = await getSite(session.user.id);

  const sitesObj = [];
  for (let site of sites) {
    const siteObj = await JSON.parse(JSON.stringify(site));
    sitesObj.push(siteObj);
  }

  // const sitesObj = sites.map((site) => site.toString());

  if (sitesObj.length > 0) {
    return (
      <section>
        <MySites sites={sitesObj} />
      </section>
    );
  } else {
    <p>No sites yet</p>;
  }
};
export default EditSitePage;
