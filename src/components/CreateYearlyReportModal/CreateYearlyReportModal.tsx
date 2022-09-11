import React, { FC, FormEvent, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-hot-toast';

interface ModalProps {
  handleClose: () => void;
}

const CreateYearlyReportModal: FC<ModalProps> = ({ handleClose }) => {
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  const { mutateAsync } = trpc.useMutation('reports.create-yearly-report');

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await toast.promise(mutateAsync({ year }), {
        loading: 'Creating report...',
        success: 'Report created!',
        error: (err) => err.message,
      });
      handleClose();
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
        Create Yearly Report
      </Dialog.Title>
      <form className={'mt-2'} onSubmit={handleSave}>
        <Input
          label={'Year'}
          type={'number'}
          value={year}
          onChange={(e) => setYear(+e.target.value)}
        />
        <div className="mt-8">
          <Button color={'blue'} label={'Save'} type={'submit'} />{' '}
          <Button
            color={'red'}
            label={'Cancel'}
            type={'button'}
            onClick={handleClose}
          />
        </div>
      </form>
    </>
  );
};

export default CreateYearlyReportModal;
