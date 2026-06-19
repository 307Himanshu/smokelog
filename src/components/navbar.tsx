import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            SmokeLog 🚬
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-300 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/cigarettes"
              className="text-zinc-300 hover:text-white"
            >
              Cigarettes
            </Link>

            <Link
              href="/users"
              className="text-zinc-300 hover:text-white"
            >
              People
            </Link>
          </div>
        </div>
        <Link
  href="/search"
  className="text-zinc-300 hover:text-white"
>
  Search
</Link>

        <div>
          {user ? (
            <Link
              href={`/users/${user.id}`}
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500"
            >
              {user.name}
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}