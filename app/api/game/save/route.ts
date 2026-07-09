import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateProfile(clerkUserId: string) {
  const clerkUser = await currentUser();
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

function getGameId(body: { game_id?: unknown }) {
  const gameId = body.game_id;
  if (typeof gameId !== "string" || gameId.trim().length === 0) {
    return null;
  }
  return gameId;
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { action } = body;

  const profile = await getOrCreateProfile(userId);

  if (action === "start_game") {
    const game = await prisma.game.create({ data: { profileId: profile.id } });
    return NextResponse.json({ game_id: game.id });
  }

  if (action === "save_round") {
    const gameId = getGameId(body);
    if (!gameId) return NextResponse.json({ error: "Missing game_id" }, { status: 400 });

    const game = await prisma.game.findFirst({ where: { id: gameId, profileId: profile.id } });
    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    await prisma.round.create({
      data: {
        gameId,
        roundNumber: body.round_number ?? 1,
        score: body.score ?? 0,
        asteroidsDestroyed: body.asteroids_destroyed ?? 0,
        shotsFired: body.shots_fired ?? 0,
        accuracyPercentage: body.accuracy ?? 0,
      },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "save_final_score") {
    const gameId = getGameId(body);
    if (!gameId) return NextResponse.json({ error: "Missing game_id" }, { status: 400 });

    const game = await prisma.game.findFirst({ where: { id: gameId, profileId: profile.id } });
    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    await prisma.game.update({
      where: { id: gameId },
      data: {
        finalScore: body.score ?? 0,
        finalRound: body.round_number ?? 1,
        isCompleted: true,
        endedAt: new Date(),
      },
    });

    await prisma.round.create({
      data: {
        gameId,
        roundNumber: body.round_number ?? 1,
        score: body.score ?? 0,
        asteroidsDestroyed: body.asteroids_destroyed ?? 0,
        shotsFired: body.shots_fired ?? 0,
        accuracyPercentage: body.accuracy ?? 0,
      },
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
