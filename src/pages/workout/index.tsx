import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

import Menu from "src/components/menu";

const Workout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <Menu>
      <h1 className="pages-title">Workout</h1>
      <div className="max-w-lg bg-cyan-500 flex flex-col justify-evenly items-center gap-4 mx-auto rounded py-2">
        <Link href="/workout/create-workout">
          <button className="button">Create Workout</button>
        </Link>
        <Link href="/workout/view-workouts">
          <button className="button">View Workouts</button>
        </Link>
      </div>
    </Menu>
  );
};

export default Workout;
