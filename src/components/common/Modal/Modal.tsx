import React, { FC, forwardRef, useImperativeHandle, useState } from "react";
import clsx from "clsx";

// UI Semantic
import { Modal as ModalSemantic } from "semantic-ui-react";

// Files
import { close } from "../../../assets/icons";
import './Modal.scss';

interface ModalProps {
  theme: "grey" | "light";
  className?: string;
  children: React.ReactNode;
}

export type ModalHandle = {
  openModal: () => void,
  closeModal: () => void,
  display: () => boolean,
};

const Modal: React.ForwardRefRenderFunction<ModalHandle, ModalProps> = ({children, theme, className}, ref) => {

  const [displayModal, setDisplayModal] = useState(false);
  const handleOpen = () => setDisplayModal(true);
  const handleClose = () => setDisplayModal(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleOpen(),
      closeModal: () => handleClose(),
      display: () => displayModal,
    }
  });

  return(
    <ModalSemantic 
      className={clsx(`modal-theme-${theme}`, className)}
      size="small" 
      open={displayModal}
      closeIcon={
        <img 
          src={close} 
          className="close-icon"
          onClick={() => handleClose()}
          alt="close" />
      }
      >
        <ModalSemantic.Content>
          {children}
        </ModalSemantic.Content>
    </ModalSemantic>
  );
}
export default forwardRef(Modal);