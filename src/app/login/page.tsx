"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Welcome, {session.user?.name}!</p>
          <button
            onClick={() => signOut()}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="rounded-lg bg-white p-20 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Welcome to the T3 App
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Please sign in to continue
        </p>
        <button
          onClick={() => signIn("google")}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
