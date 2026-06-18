export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-zinc-400">
          Track, review, and discover cigarettes.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Cigarettes Tried
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              0
            </h2>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Reviews Written
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              0
            </h2>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">
              Following
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              0
            </h2>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Quick Actions
          </h2>

          <div className="flex gap-4">
            <button className="rounded-lg bg-white px-4 py-2 font-medium text-black">
              Add Cigarette
            </button>

            <button className="rounded-lg border border-zinc-700 px-4 py-2">
              Write Review
            </button>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Recent Activity
          </h2>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            No activity yet.
          </div>
        </section>
      </div>
    </main>
  );
}