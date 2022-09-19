import trpc from '@trpc/server'
import {z} from 'zod'

import {t, authedProcedure} from '../trpc'

export const exerciseRouter = t.router({
	getExercises: authedProcedure.query(({ctx}) => {
		const exercises = ctx.prisma.exercise.findMany()
		if (!exercises) {
			throw new trpc.TRPCError({
				code: 'NOT_FOUND',
				message: 'No exercises found',
			})
		}
		return exercises
	}),

	getExerciseById: authedProcedure.input(z.string()).query(({ctx, input}) => {
		const exercise = ctx.prisma.exercise.findUnique({
			where: {
				id: input,
			},
		})

		if (!exercise) {
			throw new trpc.TRPCError({
				code: 'NOT_FOUND',
				message: 'No exercise found',
			})
		}
		return exercise
	}),

	createExercise: authedProcedure
		.input(
			z.object({
				name: z.string(),
				workoutId: z.string(),
			})
		)
		.mutation(({ctx, input}) => {
			const newExercise = ctx.prisma.exercise.create({
				data: {
					name: input.name,
					workoutId: input.workoutId,
				},
			})

			if (!newExercise) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: 'No exercise found',
				})
			}

			return newExercise
		}),

	updateExercise: authedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
			})
		)
		.mutation(({ctx, input}) => {
			const updatedExercise = ctx.prisma.exercise.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
				},
			})

			if (!updatedExercise) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: 'No exercise found',
				})
			}

			return updatedExercise
		}),

	deleteExercise: authedProcedure.input(z.string()).mutation(({ctx, input}) => {
		const deletedExercise = ctx.prisma.exercise.delete({
			where: {
				id: input,
			},
		})

		if (!deletedExercise) {
			throw new trpc.TRPCError({
				code: 'NOT_FOUND',
				message: 'No exercise found',
			})
		}

		return deletedExercise
	}),
})
