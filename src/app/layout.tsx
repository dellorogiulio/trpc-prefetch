import "./globals.css";
import { appRouter } from "@/trpc";
import Providers from "@/components/Providers";
import { createServerCaller } from "@/trpc/trpc";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { createServerSideHelpers } from "@trpc/react-query/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // THIS THROWS useContext error
  // const helpers = createServerSideHelpers({
  //   router: appRouter,
  //   ctx: {},
  // });
  // await helpers.say_hello.prefetch();
  // const dehydratedState = helpers.dehydrate();

  // THIS WORKS
  const serverCaller = createServerCaller(appRouter);
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [["say_hello"], { type: "query" }], // I HAD TO USE DEVTOOLS TO INSPECT THE QUERY
      queryFn: async () => await serverCaller.say_hello(),
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body>
        <Providers dehydrateState={dehydratedState}>{children}</Providers>
      </body>
    </html>
  );
}
