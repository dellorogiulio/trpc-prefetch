"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
  const { data, status } = trpc.say_hello.useQuery();

  const isLoading = status !== "success";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <p className="text-3xl text-red-800">LOADING</p>
      ) : (
        <p className="text-2xl text-green-600">{data}</p>
      )}
    </main>
  );
}
