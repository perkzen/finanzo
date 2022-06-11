import React from 'react';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data } = trpc.useQuery(['hello.get-greeting']);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div>
      <h1>{data?.greeting}</h1>
      <button className={'btn'} onClick={handleSignOut}>
        Logout
      </button>
    </div>
  );
};

export default Home;
