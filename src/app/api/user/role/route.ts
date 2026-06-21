import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID as string;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;
const WHITELIST_ROLE_ID = "1518143675111051317"; // Allowlisted

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ isAllowlisted: false, error: "Not authenticated" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ isAllowlisted: false, error: "No user ID" }, { status: 400 });
    }

    const memberResponse = await fetch(
      `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/members/${userId}`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
        cache: 'no-store'
      }
    );

    if (memberResponse.status === 404 || !memberResponse.ok) {
      return NextResponse.json({ isAllowlisted: false });
    }

    const memberData = await memberResponse.json();
    const hasRole = memberData.roles?.includes(WHITELIST_ROLE_ID) || false;

    return NextResponse.json({ isAllowlisted: hasRole });
  } catch (error) {
    console.error("Error in role check API:", error);
    return NextResponse.json({ isAllowlisted: false, error: "Internal Server Error" }, { status: 500 });
  }
}
