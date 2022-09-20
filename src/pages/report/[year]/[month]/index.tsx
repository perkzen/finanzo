import React from 'react';
import { useRouter } from 'next/router';
import Title from '../../../../components/Title/Title';

const Index = () => {
  const router = useRouter();
  const { year, month } = router.query;
  return (
    <div className={'py-5 mt-10 px-20 flex flex-col w-5/6 gap-8 w-full'}>
      <Title
        title={month + ' ' + year}
        subtitle={'Transactions of selected month'}
      />
    </div>
  );
};

export default Index;
