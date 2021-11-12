import { FC } from "react";
import clsx from "clsx";

// UI Semantic
import { Modal as ModalSemantic } from "semantic-ui-react";

// Files
import { close } from "../../../assets/icons";
import './Modal.scss';

interface ModalProps {
  theme: "grey" | "light";
  open: boolean;
  className?: string;
}

const Modal:FC<ModalProps> = ({children, theme, open, className}) => {
  return(
    <ModalSemantic 
      className={clsx(`modal-theme-${theme}`, className)}
      size="small" 
      open={open}
      closeIcon={<img src={close} className="close-icon" alt="close" />} >
        <ModalSemantic.Content>
          {children}
        </ModalSemantic.Content>
    </ModalSemantic>
  );
}
export default Modal;