export enum ModalType {
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  SETTINGS = 'SETTINGS',
  CREATE_YEARLY_REPORT = 'CREATE_YEARLY_REPORT',
  DELETE = 'DELETE',
}

export interface IModal {
  type: ModalType;
  title?: string;
  callback?: () => void;
  data?: unknown;
}

export interface ModalProps {
  modal: IModal;
  handleClose: () => void;
}
