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

  console.log(user);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <Menu
      name={session?.user?.name as string}
      image={session?.user?.image as string}
    >
      <h1>User</h1>
    </Menu>
  );
};

export default User;
