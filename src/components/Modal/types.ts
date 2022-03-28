interface IModalBaseProps {
  heading: string;
  containerClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  closeModalHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

interface IModalPostBaseProps {
  containerClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  closeModalHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

interface IModalProps {
  modalName: string;
  heading: string;
  temporal: boolean;
}

interface ILocationModalProps {
  type?: 'default' | 'post';
  heading?: string;
  position?: 'center' | 'start';
  onClose?: () => void;
}

type ModalCloseFunction = () => void;

export {
  IModalBaseProps,
  IModalPostBaseProps,
  IModalProps,
  ILocationModalProps,
  ModalCloseFunction,
};
