import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { trpc } from "src/utils/trpc";
import Menu from "src/components/menu";

const User = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: user } = trpc.user.getUser.useQuery({
    email: session?.user?.email as string,
  });

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <Menu name={user?.name as string} image={user?.image as string}>
      <h1 className="text-center text-xl">Basic Info</h1>
      <div className="max-w-lg bg-cyan-500 flex flex-col justify-evenly items-center gap-4 mx-auto rounded py-2">
        <div className="flex gap-2">
          <span>Name: </span>
          <span>{user?.name}</span>
        </div>
        <div className="flex justify-center">
          <button className="button">Delete Account</button>
        </div>
      </div>
    </Menu>
  );
};

export default User;
