import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white" style={{ backgroundColor: '#ffffff' }}>
      <SignUp />
      <footer className="mt-8 border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        <p>
          <Link href="/terms" className="text-emerald-600 hover:underline" style={{ color: '#059669' }}>
            Terms of Service
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="text-emerald-600 hover:underline" style={{ color: '#059669' }}>
            Privacy Policy
          </Link>
        </p>
        <p className="mt-2">&copy; Mark Geden. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
