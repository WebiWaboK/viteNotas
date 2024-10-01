// src/components/Modal.tsx

import React from 'react';
import './Modal.css'; // Asegúrate de tener un archivo CSS para el estilo del modal

const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
