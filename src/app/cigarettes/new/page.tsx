import { createCigarette } from "./actions";
export default function NewCigarettePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-2xl p-8">
        <h1 className="text-4xl font-bold">
          Add Cigarette
        </h1>

        <p className="mt-2 text-zinc-400">
          Add a new cigarette to SmokeLog.
        </p>

       <form action={createCigarette} className="mt-8 space-y-4">
        <input
           name="name"
           type="text"
           placeholder="Name"
           className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
           name="brand"
           type="text"
           placeholder="Brand"
           className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
           name="country"
           type="text"
           placeholder="Country"
           className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-3"
           />

          <button
            type="submit"
            className="rounded-md bg-white px-6 py-3 font-medium text-black"
          >
            Add Cigarette
          </button>
        </form>
      </div>
    </main>
  );
}