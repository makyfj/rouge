import { useSession } from "next-auth/react";

import Menu from "src/components/menu";

const Workout = () => {
  const { data: session } = useSession();
  return (
    <Menu
      name={session?.user?.name as string}
      image={session?.user?.image as string}
    >
      <h1>Workout</h1>
    </Menu>
  );
};

export default Workout;
