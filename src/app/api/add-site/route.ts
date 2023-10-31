import clientPromise from "@/app/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const {
      name,
      region,
      province,
      address,
      description,
      userId,
      siteImgData: [...siteImgData],
    } = await request.json();

    const site = await db.collection("sites").insertOne({
      name,
      region,
      province,
      address,
      description,
      userId,
      siteImgData: [...siteImgData],
    });

    return NextResponse.json(site);
  } catch (e) {
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
}
