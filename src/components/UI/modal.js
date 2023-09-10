import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./modal.module.css";

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Portalelement=document.getElementById('overlays');

const Modal = props => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />,Portalelement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,Portalelement)}
    </Fragment>
};

export default Modal;