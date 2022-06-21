import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/modal.module.css";

function Modal({ children, show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalcontent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClick}>
            <button>Close</button>
          </a>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalcontent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
