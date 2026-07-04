import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let profile = await prisma.profile.findUnique({ where: { clerkUserId: userId } });

  if (!profile) {
    const clerkUser = await currentUser();
    const username =
      clerkUser?.username ??
      clerkUser?.emailAddresses[0]?.emailAddress?.split("@")[0] ??
      userId.slice(0, 12);

    profile = await prisma.profile.create({
      data: {
        clerkUserId: userId,
        username,
        displayName: clerkUser?.fullName ?? null,
        avatarUrl: clerkUser?.imageUrl ?? null,
      },
    });
  }

  return NextResponse.json(profile);
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { displayName, bio } = body;

  const profile = await prisma.profile.update({
    where: { clerkUserId: userId },
    data: { displayName, bio },
  });

  return NextResponse.json(profile);
}
