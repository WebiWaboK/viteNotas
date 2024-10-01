import React, { useContext } from 'react';
import { NotesContext } from '../App';
import { Note as NoteType } from '../types'; // Asegúrate de importar el tipo
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div className="note" draggable>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="edit-button" onClick={handleEdit}>
        <EditIcon />
        <span className="tooltip">Editar</span>
      </div>
      <div className="delete-button" onClick={handleDelete}>
        <DeleteIcon />
        <span className="tooltip">Eliminar</span>
      </div>
    </div>
  );
};

export default Note;
