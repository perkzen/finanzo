import React, { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ModalProps } from '../../types/modal';
import Toggle from '../Toggle/Toogle';
import { trpc } from '../../utils/trpc';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { transactionTypes } from '../../utils/transactionTypeIcons';
import { getDateMax, getDateMin } from '../../utils/date';

interface CreateTransactionForm {
  recurring: boolean;
  displayName: string;
  amount: number;
  date: Date;
}

const defaultValues: CreateTransactionForm = {
  recurring: false,
  displayName: '',
  amount: 0,
  date: new Date(),
};

const AddTransactionModal: FC<ModalProps> = ({
  handleClose,
  modal: { title, callback, data },
}) => {
  const [selectedType, setSelectedType] = useState(
    transactionTypes[0]!.category
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
          createdAt: new Date(data.date),
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

  const { year, month } = data
    ? (data as { year: string; month: string })
    : { year: null, month: null };

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
        <div
          className={'flex flex-row justify-evenly gap-4 flex-wrap sm:gap-6'}
        >
          {transactionTypes.map((paymentType, index) => (
            <div
              key={index}
              className={'flex flex-col justify-center items-center'}
            >
              <button
                onClick={() => handleChangeType(paymentType.category)}
                className={`flex justify-center items-center  ${
                  paymentType.category === selectedType
                    ? ' bg-blue-100'
                    : 'bg-primary'
                } shadow-md w-8 h-8 rounded-lg`}
              >
                {paymentType.icon}
              </button>
              <p className={'text-xs mt-2'}>{paymentType.category}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('displayName')} label={'Display name'} />
          <Input {...register('amount')} label={'Amount'} type={'number'} />
          <Input
            {...register('date')}
            label={'Date'}
            type={'date'}
            min={getDateMin(+year!, month)}
            max={getDateMax(+year!, month)}
          />
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
