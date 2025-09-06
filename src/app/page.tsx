import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  const clients: Array<{
    id: number;
    name: string;
    age: number;
    gender: string;
    hobby: string;
  }> = await api.client.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:grid-rows-2">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="flex max-w-xs flex-col gap-2 rounded-xl border border-green-700 bg-green-400/80 p-4 text-gray-900 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-bold">{client.name}</h3>
                <div className="text-sm">Age: {client.age}</div>
                <div className="text-sm">Gender: {client.gender}</div>
                <div className="text-sm">Hobby: {client.hobby}</div>
                <a
                  href="#"
                  className="mt-4 self-end text-sm text-red-600 underline hover:text-red-800"
                >
                  Delete
                </a>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}
