import React from 'react';
import { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const session = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div>
      <code>{JSON.stringify(session.data)}</code>
      <button className={'btn'} onClick={handleSignOut}>
        Logout
      </button>
    </div>
  );
};

export default Home;
