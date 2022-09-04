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
      <div
        className={
          'transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'
        }
      >
        <div className={classes.Card}>
          <h1 className={'text-6xl text-white text-center'}>Finanzo</h1>
          <h2 className={'font-bold text-white'}>
            manage your monthly expenses and incomes
          </h2>
          <button className={'btn'} onClick={handleClick}>
            <FcGoogle />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
