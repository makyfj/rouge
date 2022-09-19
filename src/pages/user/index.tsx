import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useSession} from 'next-auth/react'

import {trpc} from 'src/utils/trpc'
import Menu from 'src/components/menu'

const User = () => {
	const router = useRouter()
	const {data: session} = useSession()
	const {data: user} = trpc.user.getUser.useQuery({
		email: session?.user?.email as string,
	})

	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	}, [router, session])

	return (
		<Menu>
			<h1 className='pages-title'>Basic Info</h1>
			<div className='mx-auto flex max-w-lg flex-col items-center justify-evenly gap-4 rounded bg-cyan-500 py-2'>
				<div className='flex gap-2 text-lg'>
					<span>Name: </span>
					<span>{user?.name}</span>
				</div>
				<div className='flex justify-center'>
					<button className='button'>Delete Account</button>
				</div>
			</div>
		</Menu>
	)
}

export default User
