"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.data) {
        window.location.href = "/dashboard";
      } else if (result.error) {
        setError(result.error.message || "Failed to create account.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-white">
          Create Account
        </h1>

        {error && (
          <div className="text-sm font-medium text-red-400 bg-red-950/30 border border-red-900/50 rounded-md p-3">
            ⚠️ {error}
          </div>
        )}

        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-white focus:outline-none focus:border-zinc-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full cursor-pointer"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </main>
  );
}