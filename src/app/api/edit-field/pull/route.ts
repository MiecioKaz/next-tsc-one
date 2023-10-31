import clientPromise from "@/app/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const id = searchParams.get("id");
    const imgData = await request.json();

    const site = await db.collection("sites").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $pull: {
          siteImgData: { ...imgData },
        },
      }
    );

    return NextResponse.json(site);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
}
