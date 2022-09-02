import { useRouter } from "next/router";
import { useEffect } from "react";
import type { GetServerSidePropsContext } from "next";

import { trpc } from "src/utils/trpc";
import { getRougeAuthSession } from "src/server/common/get-server-session";
import { useSession } from "next-auth/react";
import Menu from "src/components/menu";

const User = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: user } = trpc.proxy.user.getUser.useQuery({
    email: session?.user?.email as string,
  });

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <Menu name={user?.name as string} image={user?.image as string}>
      <h1>User</h1>
    </Menu>
  );
};

export default User;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getRougeAuthSession(ctx),
    },
  };
};
