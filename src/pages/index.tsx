import type { NextPage } from 'next';
import classes from '../styles/index.module.scss';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const handleClick = async () => {
    await router.push('/home');
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Card}>
        <h1 className={'text-6xl text-accent text-center'}>Finanzo</h1>
        <h2 className={'font-bold'}>
          manage your monthly expenses and incomes
        </h2>
        <button className={'btn'} onClick={handleClick}>
          Let&lsquo;s get started
        </button>
      </div>
    </div>
  );
};

export default Home;
