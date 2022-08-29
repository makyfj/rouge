import { useSession } from "next-auth/react";

import { trpc } from "src/utils/trpc";

const Workout = () => {
  const { data: session } = useSession();

  return <div>Workout</div>;
};

export default Workout;
