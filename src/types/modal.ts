export enum ModalType {
  ADD_PAYMENT = 'ADD_PAYMENT',
  SETTINGS = 'SETTINGS',
  CREATE_YEARLY_REPORT = 'CREATE_YEARLY_REPORT',
  DELETE = 'DELETE',
}

export interface IModal {
  type: ModalType;
  callback?: () => void;
}

export interface ModalProps {
  modal: IModal;
  handleClose: () => void;
}
