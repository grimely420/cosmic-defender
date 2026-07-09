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

  const leaderboard = topGames.map((game, index) => ({
    rank: index + 1,
    username: game.profile.username,
    displayName: game.profile.displayName,
    avatarUrl: game.profile.avatarUrl,
    score: game.finalScore,
    roundReached: game.finalRound,
    achievedAt: game.endedAt,
  }));

  return NextResponse.json(leaderboard);
}
