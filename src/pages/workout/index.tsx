import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useEffect} from 'react'

import Menu from 'src/components/menu'

const Workout = () => {
	const {data: session} = useSession()
	const router = useRouter()

	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	}, [router, session])

	return (
		<Menu>
			<h1 className='pages-title'>Workout</h1>
			<div className='mx-auto flex max-w-lg flex-col items-center justify-evenly gap-4 rounded bg-cyan-500 py-2'>
				<Link href='/workout/create-workout'>
					<button className='button'>Create Workout</button>
				</Link>
				<Link href='/workout/view-workouts'>
					<button className='button'>View Workouts</button>
				</Link>
			</div>
		</Menu>
	)
}

export default Workout
