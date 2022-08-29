import { useRouter } from "next/router";
import { trpc } from "src/utils/trpc";

const User = () => {
  const { queryClient } = trpc.useContext();
  const { data } = trpc.proxy.auth.getSession.useQuery();

  const { data: user } = trpc.proxy.user.getUser.useQuery({
    email: data?.user?.email as string,
  });

  async () => {
    await queryClient.refetchQueries(["user.getUser"]);
  };
  console.log(user);
  return <div>UserId</div>;
};

export default User;
