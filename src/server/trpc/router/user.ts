import {authedProcedure, t} from '../trpc'
import {z} from 'zod'

export const userRouter = t.router({
	getUser: authedProcedure
		.input(z.object({email: z.string()}))
		.query(({input, ctx}) => {
			return ctx.prisma.user.findUnique({
				where: {
					email: input.email,
				},
			})
		}),
})
