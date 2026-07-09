"use client";

import { useEffect, useState } from "react";
import { useUser, UserProfile } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type Profile = {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
};

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetch("/api/profile")
      .then((r) => r.json())
      .then((p) => {
        setProfile(p);
        setBio(p.bio ?? "");
      });
  }, [isLoaded, user]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });
      if (!response.ok) throw new Error("Failed to save profile");

      const updated = await response.json();
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!isLoaded) {
    return (
      <div style={styles.container}>
        <p style={{ color: "#ccc" }}>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <p style={{ color: "#ccc" }}>Please sign in to view your profile.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.container}>
        <p style={{ color: "#ccc" }}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatarRow}>
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="Avatar"
              width={80}
              height={80}
              unoptimized
              style={styles.avatar}
            />
          ) : (
            <div style={styles.avatarPlaceholder}>👤</div>
          )}
          <div>
            <h1 style={styles.name}>{profile.displayName ?? profile.username}</h1>
            <p style={styles.username}>@{profile.username}</p>
            <p style={styles.joinDate}>
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            style={styles.textarea}
            placeholder="Tell the galaxy about yourself..."
          />
          <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
            {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Bio"}
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={{ color: "#4CAF50", marginBottom: 16 }}>Account Settings</h3>
          <UserProfile routing="hash" />
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <Link href="/game" style={styles.backBtn}>
            ← Back to Game
          </Link>
          <Link href="/" style={{ ...styles.backBtn, background: "transparent", border: "1px solid #4CAF50", color: "#4CAF50" }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "monospace",
  },
  card: {
    background: "rgba(26,26,46,0.9)",
    border: "1px solid rgba(76,175,80,0.3)",
    borderRadius: 16,
    padding: 32,
    width: "100%",
    maxWidth: 640,
    color: "white",
  },
  avatarRow: { display: "flex", gap: 20, alignItems: "center", marginBottom: 28 },
  avatar: { width: 80, height: 80, borderRadius: "50%", border: "3px solid #4CAF50", objectFit: "cover" },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: "50%", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 },
  name: { margin: "0 0 4px", fontSize: 24, color: "#4CAF50" },
  username: { margin: "0 0 4px", color: "#888", fontSize: 14 },
  joinDate: { margin: 0, color: "#666", fontSize: 12 },
  section: { marginBottom: 28 },
  label: { display: "block", color: "#4CAF50", marginBottom: 8, fontWeight: "bold" },
  textarea: { width: "100%", background: "#111", border: "1px solid #333", color: "white", borderRadius: 8, padding: 12, fontSize: 14, resize: "vertical", boxSizing: "border-box" },
  saveBtn: { marginTop: 10, background: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" },
  backBtn: { background: "#4CAF50", color: "white", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontWeight: "bold", display: "inline-block" },
};
