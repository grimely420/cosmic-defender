import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateProfile(clerkUserId: string) {
  const clerkUser = await currentUser();
  // Use the Clerk username if available; otherwise use the userId, which is guaranteed unique.
  const username = clerkUser?.username ?? clerkUserId;

  return prisma.profile.upsert({
    where: { clerkUserId },
    update: {},
    create: {
      clerkUserId,
      username,
      displayName: clerkUser?.fullName ?? null,
      avatarUrl: clerkUser?.imageUrl ?? null,
    },
  });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getOrCreateProfile(userId);
  return NextResponse.json(profile);
}

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { displayName, bio } = body;

  // Ensure the profile exists before patching so callers don't hit a 404.
  await getOrCreateProfile(userId);

  const profile = await prisma.profile.update({
    where: { clerkUserId: userId },
    data: { displayName, bio },
  });

  return NextResponse.json(profile);
}
