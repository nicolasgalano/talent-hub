import React, { FC, forwardRef, useImperativeHandle, useState } from "react";
import clsx from "clsx";

// UI Semantic
import { Modal as ModalSemantic } from "semantic-ui-react";

// Files
import { close } from "../../../assets/icons";
import './Modal.scss';
import Typography from "../Typography/Typography";

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
        {children}
    </ModalSemantic>
  );
}
export default forwardRef(Modal);

// Modal Header
interface ModalHeaderProps {
  children: React.ReactNode;
}

export const ModalHeader:FC <ModalHeaderProps> = ({children}) => {
  return (
    <div className="modal-header">
      <Typography variant="heading-xxs" element="h3">{children}</Typography>
    </div>
  );
}

// Modal Body
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody:FC <ModalBodyProps> = ({children, className}) => {
  return (
    <ModalSemantic.Content className={className}>
      {children}
    </ModalSemantic.Content>
  );
}

// Modal Footer
interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter:FC <ModalFooterProps> = ({children}) => {
  return (
    <div className="modal-footer">
      {children}
    </div>
  );
}