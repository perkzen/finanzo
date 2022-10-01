import React from 'react';
import { TbDatabaseOff } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

const EmptyTable = () => {
  const { t } = useTranslation();
  return (
    <div className={'w-full'}>
      <div className={'flex flex-col items-center justify-center h-[300px]'}>
        <TbDatabaseOff
          className={'h-[48px] w-[48px] bg-gray-100 rounded-full p-2'}
        />
        <div className={'mt-4 text-center text-lg font-semibold text-gray-500'}>
          {t('no_data')}
        </div>
      </div>
    </div>
  );
};

export default EmptyTable;
