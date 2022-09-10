import React, { FC } from 'react';
import { Dialog } from '@headlessui/react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

interface ModalProps {
  handleClose: () => void;
}

const SettingsModal: FC<ModalProps> = ({ handleClose }) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Settings
      </Dialog.Title>
      <LanguageSelector />
      <button
        type="button"
        className="inline-flex w-fit justify-center rounded-lg border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export default SettingsModal;
