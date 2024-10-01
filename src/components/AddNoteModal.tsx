import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const AddNoteModal: React.FC = () => {
  const context = useContext(NoteContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleAddNote = () => {
    if (context) {
      const newNote = {
        id: Date.now(), // Genera un ID único
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
      };
      context.dispatch({ type: 'ADD_NOTE', payload: newNote });
      // Limpiar campos
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
    }
  };

  return (
    <div className="add-note-modal">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenido" />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Categoría" />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Etiquetas (separadas por comas)" />
      <button onClick={handleAddNote}>Guardar</button>
      <button onClick={() => {/* cerrar modal */}}>Cancelar</button>
    </div>
  );
};

export default AddNoteModal;
