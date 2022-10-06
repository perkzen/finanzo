import React, { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Footer from '../Footer/Footer';
import { signIn } from 'next-auth/react';

const Login: FC = () => {
  const handleClick = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/' });
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

export default Login;
