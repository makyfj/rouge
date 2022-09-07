import trpc from "@trpc/server";
import { z } from "zod";

import { t, authedProcedure } from "../trpc";

export const setRouter = t.router({
  getSets: authedProcedure.query(({ ctx }) => {
    const sets = ctx.prisma.set.findMany();
    if (!sets) {
      throw new trpc.TRPCError({
        code: "NOT_FOUND",
        message: "No sets found",
      });
    }
    return sets;
  }),

  getSetById: authedProcedure.input(z.string()).query(({ ctx, input }) => {
    const set = ctx.prisma.set.findUnique({
      where: {
        id: input,
      },
    });

    if (!set) {
      throw new trpc.TRPCError({
        code: "NOT_FOUND",
        message: "No set found",
      });
    }
    return set;
  }),

  createSets: authedProcedure
    .input(
      z.array(
        z.object({
          exerciseId: z.string(),
          reps: z.number(),
          weight: z.number(),
          workoutId: z.string(),
        })
      )
    )
    .mutation(({ ctx, input }) => {
      const newSets = ctx.prisma.set.createMany({
        data: input.map((set) => ({
          exerciseId: set.exerciseId,
          reps: set.reps,
          weight: set.weight,
          workoutId: set.workoutId,
        })),
      });

      if (!newSets) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "No sets found",
        });
      }

      return newSets;
    }),

  updateSets: authedProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          reps: z.number(),
          weight: z.number(),
        })
      )
    )
    .mutation(({ ctx, input }) => {
      const updatedSets = ctx.prisma.set.updateMany({
        data: input.map((set) => ({
          reps: set.reps,
          weight: set.weight,
        })),
        where: {
          id: {
            in: input.map((set) => set.id),
          },
        },
      });

      if (!updatedSets) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "No sets found",
        });
      }

      return updatedSets;
    }),

  deleteSets: authedProcedure
    .input(z.array(z.string()))
    .mutation(({ ctx, input }) => {
      const deletedSets = ctx.prisma.set.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });

      if (!deletedSets) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "No sets found",
        });
      }

      return deletedSets;
    }),
});
