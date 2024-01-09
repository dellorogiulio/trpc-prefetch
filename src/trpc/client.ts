import { createTRPCReact } from "@trpc/react-query";
import type { AppRouterType } from "./";

export const trpc = createTRPCReact<AppRouterType>({});
