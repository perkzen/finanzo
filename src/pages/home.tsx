import React from 'react';
import { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data } = trpc.useQuery(['hello.get-greeting']);

  return (
    <div>
      <h1>{data?.greeting}</h1>
    </div>
  );
};

export default Home;
