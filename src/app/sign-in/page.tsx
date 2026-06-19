"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
  const result = await authClient.signIn.email({
    email,
    password,
  });

  console.log(result);

  if (result.data) {
    window.location.href = "/dashboard";
  }
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-white">
          Sign In
        </h1>

        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
    </main>
  );
}