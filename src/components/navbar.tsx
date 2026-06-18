import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center gap-6 p-4 text-white">
        <Link
          href="/"
          className="text-xl font-bold"
        >
          SmokeLog 🚬
        </Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/cigarettes">
          Cigarettes
        </Link>

        <Link href="/cigarettes/new">
          Add Cigarette
        </Link>
      </div>
    </nav>
  );
}