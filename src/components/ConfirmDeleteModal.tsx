// src/components/ConfirmDeleteModal.tsx

import React from 'react';

const ConfirmDeleteModal = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¿Estás seguro?</h2>
        <p>¿Realmente quieres eliminar esta nota?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Eliminar</button>
          <button onClick={onCancel} className="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
