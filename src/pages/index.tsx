import type { NextPage } from 'next';
import classes from '../styles/index.module.scss';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const Home: NextPage = () => {
  const handleLoginWithGoogle = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/home`,
    });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Card}>
        <h1 className={'text-6xl text-accent text-center'}>Finanzo</h1>
        <h2 className={'font-bold'}>
          manage your monthly expenses and incomes
        </h2>
        <button className={'btn'} onClick={handleLoginWithGoogle}>
          <FcGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
