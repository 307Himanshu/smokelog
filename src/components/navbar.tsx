import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-10">
          <Link
  href="/"
  className="group flex items-center gap-2"
>
  <span className="text-2xl transition-transform duration-300 group-hover:-rotate-12">
    🚬
  </span>

  <span className="text-2xl font-black tracking-tight">
    SmokeLog
  </span>
</Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/cigarettes"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-white"
            >
              Cigarettes
            </Link>

            <Link
              href="/users"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-white"
            >
              People
            </Link>
          </div>
        </div>

        {/* Center Search */}
        <Link
  href="/search"
  className="hidden md:flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 transition hover:text-white"
>
  🔍 Search
</Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          

          {user ? (
            <Link
              href={`/users/${user.id}`}
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-zinc-500"
            >
              {user.name}
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-zinc-500"
            >
              Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}