import type { NextPage } from 'next';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession();

  return <>{data ? <Dashboard /> : <Login />}</>;
};

export default Home;
