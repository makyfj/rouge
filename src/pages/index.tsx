import type {GetServerSidePropsContext, NextPage} from 'next'
import Link from 'next/link'
import {useSession, signIn, signOut} from 'next-auth/react'
import Head from 'next/head'
import {FcGoogle} from 'react-icons/fc'
import {FaDiscord, FaDumbbell} from 'react-icons/fa'

import {getRougeAuthSession} from 'src/server/common/get-server-session'

const Home: NextPage = () => {
	const {data: session} = useSession()

	return (
		<>
			<Head>
				<title>Rouge</title>
				<meta name='description' content='Rouge is a workout app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='container mx-auto p-4'>
				<div className='flex h-screen'>
					<div className='m-auto flex flex-col gap-4'>
						<h1 className='flex items-center justify-center gap-2 text-4xl font-bold'>
							Rouge
							<FaDumbbell className='text-5xl text-cyan-50' />
						</h1>
						<div className='grid grid-cols-1 place-items-center gap-4 md:grid-cols-2'>
							<div className='text-center text-3xl'>
								Rouge is simpler and more powerful than a notebook, and designed
								to stay out of your way. Plan your training and track your
								progress.
							</div>
							<div className='flex flex-col gap-4 rounded bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 shadow-md shadow-cyan-800'>
								{session ? (
									<>
										<p className='text-center text-xl font-bold'>
											Signed in as{' '}
											<span className='text-cyan-50'>
												{session?.user?.name}
											</span>
										</p>
										<div className='flex justify-center gap-4'>
											<Link href='/workout'>
												<a className='rounded border border-black p-4 text-cyan-50'>
													Workout
												</a>
											</Link>
											<Link href='/user'>
												<a className='rounded border border-black p-4 text-cyan-50'>
													User
												</a>
											</Link>
											<button
												onClick={() => signOut()}
												className='rounded border border-black p-4 text-cyan-50'
											>
												Logout
											</button>
										</div>
									</>
								) : (
									<>
										<p className='text-center text-xl font-bold'>
											Sign in with
										</p>
										<div className='flex justify-center gap-4'>
											<button
												onClick={() =>
													signIn('google', {
														callbackUrl: `/`,
													})
												}
												className='rounded border border-black p-4'
											>
												<FcGoogle className='text-5xl' />
											</button>
											<button
												onClick={() =>
													signIn('discord', {
														callbackUrl: `/`,
													})
												}
												className='rounded border border-black p-4'
											>
												<FaDiscord className='text-5xl text-slate-100' />
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	return {
		props: {
			session: await getRougeAuthSession(ctx),
		},
	}
}
