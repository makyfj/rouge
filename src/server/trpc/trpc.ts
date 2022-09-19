import {initTRPC, TRPCError} from '@trpc/server'
import superjson from 'superjson'

import type {Context} from './context'

export const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({shape}) {
		return shape
	},
})

export const authedProcedure = t.procedure.use(({ctx, next}) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({code: 'UNAUTHORIZED'})
	}
	return next({
		ctx: {
			...ctx,
			// infers that `session` is non-nullable to downstream resolvers
			session: {...ctx.session, user: ctx.session.user},
		},
	})
})
