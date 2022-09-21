import {useSession} from 'next-auth/react'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

import Menu from 'src/components/menu'
import {trpc} from 'src/utils/trpc'

const CreateWorkout = () => {
	const createWorkout = trpc.workout.createWorkout.useMutation()
	const router = useRouter()
	const {data: session} = useSession()

	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	}, [router, session])
	return (
		<Menu>
			<h1 className='pages-title'>Create Workout</h1>
		</Menu>
	)
}

export default CreateWorkout
