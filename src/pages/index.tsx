import type { NextPage } from 'next';
import classes from '../styles/index.module.scss';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';

const Home: NextPage = () => {
  const handleClick = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/dashboard' });
  };

  return (
    <div
      className={
        'flex flex-col justify-center items-center pb-20 gap-5 h-screen'
      }
    >
      <div>
        <h1 className={'text-8xl text-center'}>Finanzo</h1>
        <h2 className={'text-gray-500'}>
          manage your monthly expenses and incomes
        </h2>
      </div>
      <button
        className={
          'flex flex-row items-center justify-center btn bg-neutral-800 gap-4 text-white rounded-lg px-5 py-2'
        }
        onClick={handleClick}
      >
        <FcGoogle />
        Login with Google
      </button>
      <Footer />
    </div>
  );
};

export default Home;
