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
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handleAddNote = () => {
    if (!title || !content) {
      setError('El título y el contenido son obligatorios.');
      return;
    }

    const newNote: Note = {
      id: Date.now(), // Usar timestamp como ID único
      title,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()), // Convierte la cadena de etiquetas a un array
    };

    dispatch({ type: 'ADD_NOTE', payload: newNote });
    onClose(); // Cerrar el modal después de agregar la nota
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Agregar Nota</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
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
        <input
          type="text"
          placeholder="Categoría (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Etiquetas (opcional, separadas por comas)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button onClick={handleAddNote}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default AddNote;
