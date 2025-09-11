import Link from "next/link";
import { redirect } from "next/navigation";
// import { LatestPost } from "~/app/_components/post";
import { ClientCard } from "~/app/_components/client-card";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  // const hello = await api.post.hello({ text: "from tRPC" });

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  const clients: Array<{
    id: number;
    name: string;
    age: number;
    gender: string;
    hobby: string;
  }> = await api.client.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center gap-4 px-4 pt-8 pb-4">
          <div className="w-full max-w-7xl mb-20">
            {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}

            <div className="mb-10 flex w-full flex-row items-center justify-between">
              {session && (
                <span className="text-2xl text-white">
                  Welcome {session.user?.name}
                </span>
              )}
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:grid-rows-2">
            {clients.map((client, idx) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
          {/* {session?.user && <LatestPost />} */}
        </div>
      </main>
    </HydrateClient>
  );
}
