"use client";

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "@/trpc/client";
import { useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  dehydrateState?: DehydratedState;
};

const Providers = ({ children, dehydrateState }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `http://localhost:3000/api/trpc`,
        }),
      ],
    })
  );

  const hydratedState = trpc.useDehydratedState(trpcClient, dehydrateState);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={hydratedState}>{children}</HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
