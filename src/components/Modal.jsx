import React from "react";
import ReactDOM from "react-dom"
import styles from "./Modal.module.css"
import HoldButton from "./HoldButton";

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma"}) {
    if (!show) return null // se show è false, non renderizza nulla
    
    
    
    return ReactDOM.createPortal (
        <>
      <div className={styles.overlay} onClick={onClose}></div>

      <div className={styles.modal}>
        <div className={styles.flex}>
          <h3>{title}</h3>
          <button className={styles["btn-close"]} onClick={onClose}>
            ⨉
          </button>
        </div>

        <div className={styles.content}>
          {content}
        </div>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={onClose}>
            Annulla
          </button>
          <HoldButton onHoldComplete={onConfirm} label={confirmText}/>
        </div>
      </div>
    </>,
    document.body
    );
}

export default Modal;