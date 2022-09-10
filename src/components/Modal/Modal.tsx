import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ModalActionType,
  useModalDispatch,
} from '../../context/Modal/ModalProvider';
import AddPaymentModal from '../AddPaymentModal/AddPaymentModal';
import { IModal, ModalType } from '../../types/modal';

interface ModalProps {
  modal: IModal | null;
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ modal, isOpen }) => {
  const dispatch = useModalDispatch();

  const handleClose = () => {
    dispatch({ type: ModalActionType.REMOVE_MODAL, payload: null });
  };

  const renderModal = (type?: ModalType) => {
    switch (type) {
      case ModalType.ADD_PAYMENT:
        return <AddPaymentModal handleClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {renderModal(modal?.type)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
