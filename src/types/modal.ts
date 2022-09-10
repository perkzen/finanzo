export enum ModalType {
  ADD_PAYMENT = 'ADD_PAYMENT',
  SETTINGS = 'SETTINGS',
}

export interface IModal {
  type: ModalType;
}
