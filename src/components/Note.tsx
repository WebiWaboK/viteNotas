// src/components/Note.tsx

import React, { useContext } from 'react';
import { NotesContext } from '../App';
import { Note as NoteType } from '../types'; // Asegúrate de importar el tipo

const Note = ({ note }: { note: NoteType }) => {
  const { dispatch } = useContext(NotesContext)!; // Usar el contexto de notas

  const handleDelete = () => {
    // Confirmar la eliminación de la nota
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      dispatch({
        type: 'DELETE_NOTE',
        payload: note.id,
      });
    }
  };

  const handleEdit = () => {
    // Aquí puedes implementar la lógica de edición
  };

  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button className="edit-button" onClick={handleEdit}>
        Editar
      </button>
      <button className="delete-button" onClick={handleDelete}>
        Eliminar
      </button>
    </div>
  );
};

export default Note;
