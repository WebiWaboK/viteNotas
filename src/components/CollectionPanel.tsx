// src/components/CollectionPanel.tsx

import React from 'react';
import './CollectionPanel.css'; // Asegúrate de crear el archivo CSS para los estilos

interface Note {
  id: number;
  title: string;
  content: string;
}

interface CollectionPanelProps {
  notes: Note[];
  onClose: () => void;
}

const CollectionPanel: React.FC<CollectionPanelProps> = ({ notes, onClose }) => {
  return (
    <div className="collection-panel">
      <div className="collection-panel-content">
        <h2>Notas de la Colección</h2>
        <button className="close-button" onClick={onClose}>Cerrar</button>
        <div className="notes-list">
          {notes.length > 0 ? (
            notes.map(note => (
              <div className="note-item" key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))
          ) : (
            <p>No hay notas en esta colección.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPanel;
