import { useSession } from "next-auth/react";

const Workout = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div>Workout</div>;
};

export default Workout;
