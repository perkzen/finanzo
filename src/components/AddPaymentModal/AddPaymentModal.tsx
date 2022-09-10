import React, { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { TbFileInvoice } from 'react-icons/tb';
import { RiCarLine, RiAccountCircleLine } from 'react-icons/ri';
import { HiOutlineHome } from 'react-icons/hi';
import Input from '../Input/Input';

interface ModalProps {
  handleClose: () => void;
}

const paymentTypes = [
  { icon: <RiCarLine />, description: 'Car' },
  { icon: <HiOutlineHome />, description: 'Home' },
  { icon: <RiAccountCircleLine />, description: 'Personal' },
  { icon: <TbFileInvoice />, description: 'Other' },
];

const AddPaymentModal: FC<ModalProps> = ({ handleClose }) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentTypes[0]?.description
  );

  const handleChangeType = (type: string) => {
    setSelectedPaymentType(type);
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Add upcoming payment
      </Dialog.Title>
      <div className="mt-2">
        <h3 className="leading-6 text-gray-500 my-2">Payment type</h3>
        <div className={'flex flex-row gap-10'}>
          {paymentTypes.map((paymentType, index) => (
            <div
              key={index}
              className={'flex flex-col justify-center items-center'}
            >
              <button
                onClick={() => handleChangeType(paymentType.description)}
                className={`flex justify-center items-center  ${
                  paymentType.description === selectedPaymentType
                    ? ' bg-blue-100'
                    : 'bg-primary'
                } shadow-md w-8 h-8 rounded-lg`}
              >
                {paymentType.icon}
              </button>
              <p className={'text-xs mt-2'}>{paymentType.description}</p>
            </div>
          ))}
        </div>
        <form>
          <Input label={'Title'} />
          <Input label={'Amount'} type={'number'} />
          <Input label={'Date'} type={'date'} />
        </form>
      </div>

      <div className="mt-8">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleClose}
        >
          Save
        </button>{' '}
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddPaymentModal;
