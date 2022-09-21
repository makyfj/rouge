import {useSession} from 'next-auth/react'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

import Menu from 'src/components/menu'
import {trpc} from 'src/utils/trpc'

const ViewWorkouts = () => {
	const router = useRouter()
	const {data: session} = useSession()
	const viewWorkouts = trpc.workout.getWorkouts.useQuery()

	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	}, [router, session])
	return (
		<Menu>
			<h1 className='pages-title'>View Workouts</h1>
		</Menu>
	)
}

export default ViewWorkouts
