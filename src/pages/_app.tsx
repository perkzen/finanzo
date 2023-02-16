import '../styles/globals.scss';
import { AppType } from 'next/dist/shared/lib/utils';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import LayoutProvider from '../components/LayoutProvider/LayoutProvider';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import { ModalProvider } from '../context/Modal/ModalProvider';
import '../i18next/i18next';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { trpc } from '../utils/trpc';

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

export default trpc.withTRPC(MyApp);
