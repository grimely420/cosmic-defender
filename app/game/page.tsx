"use client";

import { useEffect, useRef, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function GamePage() {
  const { user, isLoaded } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameReady, setGameReady] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const gameInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/profile").then((r) => r.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    if (win.AsteroidsGame) {
      setTimeout(() => setGameReady(true), 0);
      return;
    }

    const SCRIPT_ID = "cosmic-defender-game-script";
    if (document.getElementById(SCRIPT_ID)) {
      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement & { dataset: DOMStringMap };
      if (existing.dataset.loaded) {
        setTimeout(() => setGameReady(true), 0);
      } else {
        existing.addEventListener("load", () => setGameReady(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "/game.js";
    script.onload = () => {
      script.dataset.loaded = "1";
      setGameReady(true);
    };
    document.body.appendChild(script);
  }, [isLoaded, user]);

  useEffect(() => {
    if (!gameReady) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (win.AsteroidsGame && !gameInstanceRef.current) {
      gameInstanceRef.current = new win.AsteroidsGame();
    }
  }, [gameReady]);

  if (!isLoaded) return null;

  const displayName = user?.fullName ?? user?.username ?? "Pilot";
  const avatarUrl = user?.imageUrl;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontFamily: "monospace",
      }}
    >
      <div className="game-layout">
        {/* Left — Player Info */}
        <div className="player-info-side">
          <div
            className="player-avatar"
            style={{ cursor: "pointer", position: "relative" }}
            onClick={() => setShowAvatarModal(true)}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={60}
                height={60}
                unoptimized
                style={{
                  borderRadius: "50%",
                  border: "2px solid #4CAF50",
                  boxShadow: "0 0 15px rgba(76,175,80,0.5)",
                }}
              />
            ) : (
              <span style={{ fontSize: 40 }}>👤</span>
            )}
          </div>
          <div className="welcome-message">
            Welcome,{" "}
            <Link href="/profile" style={{ color: "#4CAF50", textDecoration: "none", fontWeight: "bold" }}>
              {displayName}
            </Link>
            <br />
            <span style={{ fontSize: 12, color: "#ff6b6b" }}>
              <UserButton />
            </span>
          </div>
        </div>

        {/* Center — Canvas */}
        <div className="game-center">
          <div className="mobile-hud">
            <span>
              Hull <span id="lives">5</span>
            </span>
            <span>
              Wave <span id="round">1</span>
            </span>
            <span>
              Crystals <span id="score">0</span>
            </span>
          </div>
          <canvas ref={canvasRef} id="gameCanvas" width={800} height={600} />
          <div id="playNowButton" className="play-now-button">
            <button id="startGameBtn" className="blinking-button">
              BEGIN MISSION
            </button>
          </div>
          <div id="pauseIndicator" className="pause-indicator">
            MISSION PAUSED
          </div>
          <div id="gameOver" className="hidden">
            <h2>MISSION FAILED</h2>
            <p>
              Crystals Collected: <span id="finalScore">0</span>
            </p>
            <p>Hull Integrity: Critical Failure</p>
            <div className="game-over-choices">
              <p>Humanity&apos;s fate hangs in the balance...</p>
              <button id="playAgain">Retry Mission</button>
              <button id="endGameBtn">Abandon Mission</button>
            </div>
          </div>
        </div>

        {/* Right — Stats */}
        <div className="game-stats-side">
          <div className="game-stats">
            <div>
              Hull Integrity: <span id="lives">5</span>
            </div>
            <div>
              Wave: <span id="round">1</span>
            </div>
            <div>
              Crystals: <span id="score">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowAvatarModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #0f0f23)",
              padding: 30,
              borderRadius: 15,
              border: "2px solid #4CAF50",
              maxWidth: 400,
              width: "90%",
              color: "white",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#4CAF50", marginTop: 0 }}>Your Avatar</h3>
            <p style={{ color: "#ccc", fontSize: 14 }}>
              Your avatar is managed by Clerk. Click the user button in the header to update your profile photo.
            </p>
            <button
              onClick={() => setShowAvatarModal(false)}
              style={{
                background: "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .game-layout {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 2vw;
          padding: 2vh 2vw;
          width: 100%;
          box-sizing: border-box;
          flex: 1;
        }
        .player-info-side, .game-stats-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5vh;
          background: linear-gradient(135deg, rgba(26,26,46,0.8), rgba(15,15,35,0.8));
          padding: 2vh;
          border-radius: 1.5vh;
          border: 1px solid rgba(76,175,80,0.3);
          backdrop-filter: blur(10px);
          width: 12vw;
          min-width: 80px;
          max-width: 200px;
        }
        .game-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1;
          max-width: 70vw;
        }
        .game-stats { display: flex; flex-direction: column; gap: 1.5vh; font-size: clamp(10px,1.2vw,16px); font-weight: bold; }
        .game-stats div { padding: 1vh 1vw; background: rgba(76,175,80,0.2); border-radius: 1vh; border: 1px solid rgba(76,175,80,0.3); text-align: center; }
        .welcome-message { color: #fff; font-size: clamp(10px,1.1vw,16px); text-align: center; }
        .hidden { display: none !important; }
        .play-now-button { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; }
        .blinking-button { background: #4CAF50; color: white; border: none; padding: 15px 30px; font-size: clamp(14px, 2.5vw, 18px); border-radius: 8px; cursor: pointer; font-weight: bold; font-family: inherit; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .pause-indicator { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); color: #ff6b6b; font-size: clamp(18px, 3vw, 24px); font-weight: bold; display: none; pointer-events: none; }
        #gameOver { position: absolute; inset: 0; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 20px; z-index: 20; }
        #gameOver h2 { color: #ff6b6b; margin: 0 0 12px; font-size: clamp(22px, 4vw, 32px); }
        #gameOver p { margin: 6px 0; font-size: clamp(14px, 2.5vw, 18px); }
        .game-over-choices { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
        #gameOver button { background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: clamp(14px, 2.5vw, 16px); font-family: inherit; }
        #gameOver button:hover { background: #45a049; }
        #gameOver.hidden { display: none !important; }
        .mobile-hud { display: none; }
        @media (max-width: 768px) {
          /* Hide the site header/footer and side panels on the game page so the
             canvas can use the full viewport. */
          body > header, body > footer { display: none !important; }
          .game-layout { flex-direction: column; align-items: center; justify-content: center; padding: 0; height: 100vh; }
          .player-info-side, .game-stats-side { display: none !important; }
          .game-center { max-width: 100vw; width: 100%; order: 0; }
          #gameCanvas { display: block; margin: 0 auto; max-width: 100%; height: auto; }
          .mobile-hud {
            display: flex;
            gap: 16px;
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            background: rgba(0,0,0,0.6);
            border: 1px solid rgba(76,175,80,0.4);
            border-radius: 20px;
            padding: 6px 16px;
            font-size: 13px;
            font-weight: bold;
            color: #fff;
            pointer-events: none;
          }
          .mobile-hud > span > span { color: #4CAF50; }
        }
      `}</style>
    </div>
  );
}
