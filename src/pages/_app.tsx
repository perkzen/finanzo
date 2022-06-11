import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Finanzo</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="description" content="Self finance management app." />
      </Head>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
