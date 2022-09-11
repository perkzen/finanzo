import React, { FC } from 'react';
import { Dialog } from '@headlessui/react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Button from '../Button/Button';
import { ModalProps } from '../../types/modal';

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
      <Button color={'blue'} label={'Close'} onClick={handleClose} />
    </div>
  );
};

export default SettingsModal;
