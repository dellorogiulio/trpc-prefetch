import { initTRPC } from "@trpc/server";
import { AppRouterType } from ".";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const createServerCaller = (appRouter: AppRouterType) =>
  t.createCallerFactory(appRouter)({});
