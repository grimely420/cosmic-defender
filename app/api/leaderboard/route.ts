import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const topGames = await prisma.game.findMany({
    where: { isCompleted: true },
    orderBy: { finalScore: "desc" },
    take: 10,
    include: {
      profile: {
        select: {
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  const leaderboard = topGames.map((g: (typeof topGames)[number], i: number) => ({
    rank: i + 1,
    username: g.profile.username,
    displayName: g.profile.displayName,
    avatarUrl: g.profile.avatarUrl,
    score: g.finalScore,
    roundReached: g.finalRound,
    achievedAt: g.endedAt,
  }));

  return NextResponse.json(leaderboard);
}
