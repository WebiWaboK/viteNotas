// src/components/AddNote.tsx

import React, { useContext, useState } from 'react';
import { NotesContext } from '../App';
import { Note } from '../types';

interface AddNoteProps {
  onClose: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ onClose }) => {
  const { dispatch } = useContext(NotesContext)!;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = () => {
    if (!title || !content) return; // Asegúrate de que el título y el contenido no estén vacíos

    const newNote: Note = {
      id: Math.floor(Math.random() * 1000), // Generar ID aleatorio
      title,
      content,
    };

    dispatch({ type: 'ADD_NOTE', payload: newNote }); // Despacha la acción para agregar la nota
    onClose(); // Cerrar el modal después de agregar la nota
    setTitle(''); // Limpiar el título
    setContent(''); // Limpiar el contenido
  };

  return (
    <div className="modal">
      <h2>Agregar Nota</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Agregar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default AddNote;
