import React, { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TbFileInvoice } from 'react-icons/tb';
import { RiCarLine, RiAccountCircleLine } from 'react-icons/ri';
import { HiOutlineHome } from 'react-icons/hi';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ModalProps } from '../../types/modal';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import Toggle from '../Toggle/Toogle';
import { trpc } from '../../utils/trpc';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const paymentTypes = [
  { icon: <RiCarLine />, displayName: 'Car' },
  { icon: <HiOutlineHome />, displayName: 'Home' },
  { icon: <RiAccountCircleLine />, displayName: 'Personal' },
  { icon: <MdOutlineLocalGroceryStore />, displayName: 'Shopping' },
  { icon: <TbFileInvoice />, displayName: 'Bills' },
  { icon: <IoFastFoodOutline />, displayName: 'Food & drinks' },
];

interface CreateTransactionForm {
  //  category: string;
  recurring: boolean;
  displayName: string;
  amount: number;
  date: Date;
  // monthReportId: string;
}

const defaultValues: CreateTransactionForm = {
  recurring: false,
  displayName: '',
  amount: 0,
  date: new Date(),
};

const AddTransactionModal: FC<ModalProps> = ({
  handleClose,
  modal: { title, callback },
}) => {
  const [selectedType, setSelectedType] = useState(
    paymentTypes[0]!.displayName
  );

  const handleChangeType = (type: string) => {
    setSelectedType(type);
  };

  const { mutateAsync } = trpc.useMutation(['transactions.create-transaction']);

  const { register, handleSubmit } = useForm<CreateTransactionForm>({
    defaultValues,
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: CreateTransactionForm) => {
    try {
      await toast.promise(
        mutateAsync({
          category: selectedType,
          displayName: data.displayName,
          createdAt: data.date,
          recurring: data.recurring,
          amount: +data.amount,
        }),
        {
          loading: 'Creating transaction...',
          success: 'Transaction created!',
          error: (err) => err.message,
        }
      );
      handleClose();
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        {title}
      </Dialog.Title>
      <div className="mt-2">
        <h3 className="leading-6 text-gray-500 my-2">Type</h3>
        <div className={'flex flex-row gap-6'}>
          {paymentTypes.map((paymentType, index) => (
            <div
              key={index}
              className={'flex flex-col justify-center items-center'}
            >
              <button
                onClick={() => handleChangeType(paymentType.displayName)}
                className={`flex justify-center items-center  ${
                  paymentType.displayName === selectedType
                    ? ' bg-blue-100'
                    : 'bg-primary'
                } shadow-md w-8 h-8 rounded-lg`}
              >
                {paymentType.icon}
              </button>
              <p className={'text-xs mt-2'}>{paymentType.displayName}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('displayName')} label={'Display name'} />
          <Input {...register('amount')} label={'Amount'} type={'number'} />
          <Input {...register('date')} label={'Date'} type={'date'} />
          <Toggle {...register('recurring')} label={'Recurring'} />
          <div className="mt-8">
            <Button label={'Save'} type={'submit'} />{' '}
            <Button label={'Cancel'} onClick={handleClose} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTransactionModal;
