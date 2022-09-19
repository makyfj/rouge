import trpc from '@trpc/server'
import {z} from 'zod'

import {authedProcedure, t} from '../trpc'

export const workoutRouter = t.router({
	getWorkouts: authedProcedure.query(({ctx}) => {
		const workouts = ctx.prisma.workout.findMany()
		if (!workouts) {
			throw new trpc.TRPCError({
				code: 'NOT_FOUND',
				message: 'No workouts found',
			})
		}
		return workouts
	}),
	getWorkoutById: authedProcedure.input(z.string()).query(({ctx, input}) => {
		const workout = ctx.prisma.workout.findUnique({
			where: {
				id: input,
			},
		})

		if (!workout) {
			throw new trpc.TRPCError({
				code: 'NOT_FOUND',
				message: 'No workout found',
			})
		}
		return workout
	}),
	createWorkout: authedProcedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.mutation(({ctx, input}) => {
			const newWorkout = ctx.prisma.workout.create({
				data: {
					name: input.name,
				},
			})

			if (!newWorkout) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: 'No workout found',
				})
			}

			return newWorkout
		}),

	updateWorkout: authedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
			})
		)
		.mutation(({ctx, input}) => {
			const workoutUpdated = ctx.prisma.workout.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
				},
			})

			if (!workoutUpdated) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: 'No workout found',
				})
			}

			return workoutUpdated
		}),

	deleteWorkout: authedProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(({ctx, input}) => {
			const workoutDeleted = ctx.prisma.workout.delete({
				where: {
					id: input.id,
				},
			})

			if (!workoutDeleted) {
				throw new trpc.TRPCError({
					code: 'NOT_FOUND',
					message: 'No workout found',
				})
			}

			return workoutDeleted
		}),
})
