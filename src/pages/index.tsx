import type { NextPage } from 'next';
import classes from '../styles/index.module.scss';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const Home: NextPage = () => {
  const handleClick = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/finances' });
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Card}>
        <h1 className={'text-6xl text-accent text-center'}>Finanzo</h1>
        <h2 className={'font-bold'}>
          manage your monthly expenses and incomes
        </h2>
        <button className={'btn'} onClick={handleClick}>
          <FcGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Home;
