import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";

// Issue related with pageProps @next v12.3.0
// Solution: @link https://stackoverflow.com/questions/73668032/nextauth-type-error-property-session-does-not-exist-on-type

const MyApp = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
