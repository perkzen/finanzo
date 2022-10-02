import React, { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ModalProps } from '../../types/modal';
import Toggle from '../Toggle/Toogle';
import { trpc } from '../../utils/trpc';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { getDateMax, getDateMin } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import { useTransactionTypeIcons } from '../../utils/transactionTypeIcons';

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
  const { t } = useTranslation();
  const transactionTypes = useTransactionTypeIcons();
  const [selectedType, setSelectedType] = useState(
    transactionTypes[0]!.category
  );

  const handleChangeType = (type: string) => {
    setSelectedType(type);
  };

  const { mutateAsync } = trpc.useMutation(['transactions.create-transaction']);

  const { register, handleSubmit, formState } = useForm<CreateTransactionForm>({
    defaultValues,
    reValidateMode: 'onSubmit',
  });

  const { dirtyFields } = formState;

  const isDisabled = () =>
    !(dirtyFields.displayName && dirtyFields.amount && dirtyFields.date);

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
          loading: t('creating'),
          success: t('created'),
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
        <h3 className="leading-6 text-gray-500 my-2">{t('type')}</h3>
        <div
          className={
            'flex flex-row justify-evenly gap-4 flex-wrap sm:gap-6 mb-2'
          }
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
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={'flex flex-col gap-2'}
        >
          <Input {...register('displayName')} label={t('display_name')} />
          <Input {...register('amount')} label={t('amount')} type={'number'} />
          <Input
            {...register('date')}
            label={t('date')}
            type={'date'}
            min={getDateMin(+year!, month)}
            max={getDateMax(+year!, month)}
          />
          <Toggle {...register('recurring')} label={t('recurring')} />
          <div className="mt-8">
            <Button label={t('save')} disabled={isDisabled()} type={'submit'} />{' '}
            <Button label={t('close')} type={'button'} onClick={handleClose} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTransactionModal;
