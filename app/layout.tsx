import {ClerkProvider, Show, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmic Defender",
  description: "Defend humanity from the asteroid field — track your scores and climb the leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <header className="flex h-16 items-center justify-end gap-4 border-b px-4">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
          <footer className="mt-auto border-t border-gray-300 py-6 text-center text-sm" style={{ borderColor: '#cccccc', color: '#333333' }}>
            <p>
              <Link href="/terms" className="hover:underline" style={{ color: '#059669' }}>
                Terms of Service
              </Link>{" "}
              &middot;{" "}
              <Link href="/privacy" className="hover:underline" style={{ color: '#059669' }}>
                Privacy Policy
              </Link>
            </p>
            <p className="mt-2">&copy; Mark Geden. All Rights Reserved.</p>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}