import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';

const NotePanel: React.FC = () => {
  const context = useContext(NoteContext);
  if (!context) return null;
  const { state } = context;

  return (
    <div className="note-panel">
      {state.notes.map(note => (
        <div key={note.id} className="note">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => {/* manejar la edición */}}>Editar</button>
          <button onClick={() => {/* manejar la eliminación */}}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default NotePanel;
