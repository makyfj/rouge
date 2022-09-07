// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { workoutRouter } from "./workout";
import { exerciseRouter } from "./exercise";
import { setRouter } from "./set";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  workout: workoutRouter,
  exercise: exerciseRouter,
  set: setRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
