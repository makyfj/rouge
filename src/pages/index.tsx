import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";

import { getRougeAuthSession } from "src/server/common/get-server-session";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Rouge</title>
        <meta name="description" content="Rouge is a workout app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex h-screen">
          <div className="m-auto flex flex-col gap-4">
            <h1 className="text-center font-bold text-4xl">Rouge</h1>
            <div className="grid grid-cols-2 gap-4 place-items-center">
              <div className="text-3xl">
                Data to enrich your online business Anim aute id magna aliqua ad
                ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                Elit sunt amet fugiat veniam occaecat fugiat aliqua.
              </div>
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded p-4 flex flex-col gap-4 shadow-md shadow-cyan-800">
                {session ? (
                  <>
                    <p className="text-xl text-center font-bold">
                      Signed in as{" "}
                      <span className="text-cyan-50">
                        {session?.user?.name}
                      </span>
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/workout">
                        <a className="p-4 border border-black rounded text-cyan-50">
                          Workout
                        </a>
                      </Link>
                      <Link href="/user">
                        <a className="p-4 border border-black rounded text-cyan-50">
                          Profile
                        </a>
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="p-4 border border-black rounded text-cyan-50"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xl text-center font-bold">
                      Sign in with
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() =>
                          signIn("google", {
                            callbackUrl: `/user`,
                          })
                        }
                        className="p-4 border border-black rounded"
                      >
                        <FcGoogle className="text-5xl" />
                      </button>
                      <button
                        onClick={() =>
                          signIn("discord", {
                            callbackUrl: `/user`,
                          })
                        }
                        className="p-4 border border-black rounded"
                      >
                        <FaDiscord className="text-5xl text-slate-100" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getRougeAuthSession(ctx),
    },
  };
};
