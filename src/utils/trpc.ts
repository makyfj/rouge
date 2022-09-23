// src/utils/trpc.ts
import {setupTRPC} from '@trpc/next'
import type {AppRouter} from '../server/trpc/router'
import superjson from 'superjson'
import {devtoolsLink} from 'trpc-client-devtools-link'

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return '' // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export const trpc = setupTRPC<AppRouter>({
	config() {
		return {
			links: [
				devtoolsLink({
					// `enabled` is true by default
					// If you want to use the devtools extension just for development, do the following
					enabled: process.env.NODE_ENV === 'development',
				}),
			],
			url: `${getBaseUrl()}/api/trpc`,
			transformer: superjson,
		}
	},
	ssr: false,
})
