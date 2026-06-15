"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    console.log(result);

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-white">
          Create Account
        </h1>

        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </main>
  );
}