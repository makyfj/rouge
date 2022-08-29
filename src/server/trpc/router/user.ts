import { t } from "../trpc";
import { z } from "zod";

export const userRouter = t.router({
  getUser: t.procedure
    .input(z.object({ email: z.string().email() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
});
