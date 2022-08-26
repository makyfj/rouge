import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Rouge</title>
        <meta name="description" content="Rouge is a workout app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center font-bold">Rouge</h1>
    </>
  );
};

export default Home;
