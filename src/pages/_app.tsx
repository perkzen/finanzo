import '../styles/globals.scss';
import { AppType } from 'next/dist/shared/lib/utils';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '../server/router';
import LayoutProvider from '../components/LayoutProvider/LayoutProvider';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import { ModalProvider } from '../context/Modal/ModalProvider';
import '../i18next/i18next';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Finanzo</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="description" content="Self finance management app." />
      </Head>
      <SkeletonTheme baseColor={'#e3e4ee'} highlightColor={'#ECEDF6'}>
        <SessionProvider>
          <AuthProvider>
            <ModalProvider>
              <LayoutProvider>
                <Component {...pageProps} />
              </LayoutProvider>
            </ModalProvider>
          </AuthProvider>
        </SessionProvider>
      </SkeletonTheme>
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = '/api/trpc';

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
