import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { action } = body;

  const profile = await prisma.profile.findUnique({ where: { clerkUserId: userId } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  if (action === "start_game") {
    const game = await prisma.game.create({ data: { profileId: profile.id } });
    return NextResponse.json({ game_id: game.id });
  }

  if (action === "save_round") {
    const game = await prisma.game.findFirst({ where: { id: body.game_id, profileId: profile.id } });
    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    await prisma.round.create({
      data: {
        gameId: body.game_id,
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
    const game = await prisma.game.findFirst({ where: { id: body.game_id, profileId: profile.id } });
    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    await prisma.game.update({
      where: { id: body.game_id },
      data: {
        finalScore: body.score ?? 0,
        finalRound: body.round_number ?? 1,
        isCompleted: true,
        endedAt: new Date(),
      },
    });

    await prisma.round.create({
      data: {
        gameId: body.game_id,
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
