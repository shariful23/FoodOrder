import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} >
    
  </div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalHelper = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose}/>, portalHelper)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalHelper
      )}
    </Fragment>
  );
};
export default Modal;
