"use client";

import { useEffect, useRef, useState } from "react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

type LeaderboardEntry = {
  rank: number;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  score: number;
  roundReached: number;
  achievedAt: string | null;
};

export default function LandingPage() {
  const { user, isLoaded } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setLeaderboard(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-15, -12);
    ctx.lineTo(-10, -8);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-15, 12);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(5, 0, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(-10, -5);
    ctx.lineTo(-20, -8);
    ctx.moveTo(-10, 5);
    ctx.lineTo(-20, 8);
    ctx.stroke();
    ctx.restore();

    [[100, 100, 20], [300, 150, 15], [200, 250, 10]].forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = `${r}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("$", x, y);
    });
  }, []);

  return (
    <div style={styles.container}>
      {/* Title */}
      <div style={styles.titleSection}>
        <h1 style={styles.title}>COSMIC DEFENDER</h1>
        <p style={styles.subtitle}>The Fate of Humanity Rests in Your Hands</p>
        <p style={styles.story}>
          In the year 2157, Earth&apos;s last remaining starfighter pilot stands against an endless asteroid field
          threatening the remnants of human civilization. As asteroids containing precious energy crystals hurtle
          toward the last colony, you must destroy them to harvest their power while avoiding certain death. Each
          crystal brings humanity one step closer to survival. Will you be our savior or our final chapter?
        </p>
      </div>

      {/* Auth Buttons */}
      {isLoaded && (
        <div style={styles.authButtons}>
          {user ? (
            <>
              <Link href="/game" style={{ ...styles.btn, ...styles.btnPrimary }}>
                Play Game
              </Link>
              <Link href="/profile" style={{ ...styles.btn, ...styles.btnSecondary }}>
                Profile
              </Link>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button style={{ ...styles.btn, ...styles.btnPrimary }}>Login</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{ ...styles.btn, ...styles.btnSecondary }}>Register</button>
              </SignUpButton>
            </>
          )}
        </div>
      )}

      {/* Features */}
      <div style={styles.features}>
        {[
          { icon: "🎯", title: "Progressive Difficulty", desc: "Game gets harder each round with more asteroids" },
          { icon: "🏆", title: "Score Tracking", desc: "Track your scores and compete for the top spot" },
          { icon: "🎮", title: "Multiplayer", desc: "Play against other players and climb the leaderboard" },
          { icon: "💾", title: "Save Progress", desc: "Your games and scores are saved automatically" },
        ].map((f) => (
          <div key={f.title} style={styles.feature}>
            <h3 style={{ color: "#4CAF50", marginBottom: 10 }}>
              {f.icon} {f.title}
            </h3>
            <p style={{ color: "#ccc", margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Preview Canvas */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#4CAF50" }}>Preview</h2>
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          style={{ border: "2px solid #333", marginTop: 20 }}
        />
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div style={{ width: "100%", maxWidth: 700, margin: "40px auto" }}>
          <h2 style={{ color: "#4CAF50", textAlign: "center", marginBottom: 20 }}>🏆 Top Players</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #4CAF50" }}>
                {["Rank", "Player", "Score", "Round", "Date"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#4CAF50" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((e) => (
                <tr key={e.rank} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "8px 12px", color: e.rank <= 3 ? "#FFD700" : "white" }}>
                    #{e.rank}
                  </td>
                  <td style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                    {e.avatarUrl ? (
                      <img src={e.avatarUrl} alt="" width={30} height={30} style={{ borderRadius: "50%" }} />
                    ) : (
                      <span>👤</span>
                    )}
                    {e.displayName ?? e.username}
                  </td>
                  <td style={{ padding: "8px 12px" }}>{e.score.toLocaleString()}</td>
                  <td style={{ padding: "8px 12px" }}>{e.roundReached}</td>
                  <td style={{ padding: "8px 12px" }}>
                    {e.achievedAt ? new Date(e.achievedAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    padding: "30px 50px",
    background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    fontFamily: "monospace",
    gap: 40,
  },
  titleSection: {
    padding: 30,
    background: "linear-gradient(135deg, rgba(26,26,46,0.8), rgba(15,15,35,0.8))",
    borderRadius: 15,
    border: "1px solid rgba(76,175,80,0.3)",
    backdropFilter: "blur(10px)",
    maxWidth: 700,
  },
  title: {
    fontSize: "clamp(2em,5vw,4em)",
    fontWeight: "bold",
    color: "#4CAF50",
    textShadow: "0 0 20px rgba(76,175,80,0.5)",
    marginBottom: 15,
    letterSpacing: 3,
    textTransform: "uppercase",
    animation: "glow 2s ease-in-out infinite alternate",
  },
  subtitle: { fontSize: "1.5em", color: "#ffffff", marginBottom: 20, opacity: 0.9 },
  story: { fontSize: "1.1em", color: "#cccccc", maxWidth: 600, margin: "0 auto", lineHeight: 1.6, fontStyle: "italic" },
  authButtons: { display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" },
  btn: { padding: "15px 30px", fontSize: "1.1em", border: "none", borderRadius: 5, cursor: "pointer", textDecoration: "none", transition: "all 0.3s ease", display: "inline-block" },
  btnPrimary: { background: "#4CAF50", color: "white" },
  btnSecondary: { background: "transparent", color: "#4CAF50", border: "2px solid #4CAF50" },
  features: { display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap" },
  feature: { background: "rgba(255,255,255,0.1)", padding: 20, borderRadius: 8, width: 200, textAlign: "left" },
};
