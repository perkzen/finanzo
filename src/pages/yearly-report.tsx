import React from 'react';
import { NextPage } from 'next';
import Title from '../components/Title/Title';
import { TableHeader } from '../components/Table/Table';

const headers: TableHeader<any>[] = [];

const YearlyReport: NextPage = () => {
  return (
    <div className={'py-5 mt-10 px-20 flex flex-col w-5/6 gap-8'}>
      <Title
        title={'YearlyReport'}
        subtitle={'All finances information for selected year'}
      />
    </div>
  );
};

export default YearlyReport;
