import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.profile.findUnique({ where: { clerkUserId: userId } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const game = await prisma.game.create({
    data: { profileId: profile.id },
  });

  return NextResponse.json({ gameId: game.id });
}
