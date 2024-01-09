import { router, publicProcedure } from "./trpc";

const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const appRouter = router({
  say_hello: publicProcedure.query(async () => {
    await delay(1000);
    return "hello there";
  }),
});

export type AppRouterType = typeof appRouter;
