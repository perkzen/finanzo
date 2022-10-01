import React, { FC } from 'react';
import { Dialog } from '@headlessui/react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Button from '../Button/Button';
import { ModalProps } from '../../types/modal';
import { useTranslation } from 'react-i18next';

const SettingsModal: FC<ModalProps> = ({ handleClose }) => {
  const { t } = useTranslation();
  return (
    <div className={'flex flex-col gap-4'}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        {t('settings')}
      </Dialog.Title>
      <LanguageSelector />
      <Button color={'blue'} label={t('close')} onClick={handleClose} />
    </div>
  );
};

export default SettingsModal;
