import React from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  return (
    <div>
      {router.query.year} {router.query.month}
    </div>
  );
};

export default Index;
