import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { IModal } from '../../types/modal';
import Modal from '../../components/Modal/Modal';

export enum ModalActionType {
  ADD_MODAL = 'ADD_MODAL',
  REMOVE_MODAL = 'REMOVE_MODAL',
}

interface ModalAction {
  type: ModalActionType;
  payload: IModal | null;
}

interface ModalState {
  isOpen: boolean;
  modal: IModal | null;
}

const initialState: ModalState = { isOpen: false, modal: null };

const ModalContext = createContext<ModalState>(initialState);
const ModalDispatchContext = createContext<Dispatch<ModalAction>>(() => null);

const modalReducer = (state: ModalState, action: ModalAction) => {
  const { type, payload } = action;
  switch (type) {
    case ModalActionType.REMOVE_MODAL:
      return { isOpen: false, modal: null };
    case ModalActionType.ADD_MODAL:
      return { isOpen: true, modal: payload };
    default:
      return state;
  }
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { modal, isOpen } = state;

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {modal && <Modal modal={modal} isOpen={isOpen} />}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

export const useModalDispatch = () => {
  return useContext(ModalDispatchContext);
};
