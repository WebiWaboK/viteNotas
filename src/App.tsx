// src/App.tsx

import React, { createContext, useReducer, useState } from 'react'; // Asegúrate de incluir createContext
import AddNote from './components/AddNote';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { Note } from './types';

// Crear el contexto de notas
export const NotesContext = createContext<{ state: Note[], dispatch: React.Dispatch<any> }>({
  state: [],
  dispatch: () => null,
});

const notesReducer = (state: Note[], action: any) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter((note) => note.id !== action.payload);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false); // Controla el modal de agregar nota

  const [state, dispatch] = useReducer(notesReducer, []);

  const addNote = (newNote: Note) => {
    dispatch({ type: 'ADD_NOTE', payload: newNote });
    setIsAddNoteOpen(false); // Cierra el modal de agregar nota
  };

  const confirmDeleteNote = (note: Note) => {
    setNoteToDelete(note);
    setIsModalOpen(true); // Abre el modal de confirmación de eliminación
  };

  const handleDeleteNote = () => {
    if (noteToDelete) {
      dispatch({ type: 'DELETE_NOTE', payload: noteToDelete.id });
    }
    setIsModalOpen(false);
    setNoteToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setNoteToDelete(null);
  };

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <h1>Mi Aplicación de Notas</h1>

        {/* Modal de agregar nota */}
        {isAddNoteOpen && (
          <AddNote onAddNote={addNote} onClose={() => setIsAddNoteOpen(false)} />
        )}

        {/* Lista de notas */}
        <div className="notes-container">
          {state.map((note) => (
            <div className="note" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button className="edit-button">Editar</button>
              <button className="delete-button" onClick={() => confirmDeleteNote(note)}>Eliminar</button>
            </div>
          ))}
        </div>

        {/* Modal de confirmación de eliminación */}
        {isModalOpen && (
          <ConfirmDeleteModal
            onConfirm={handleDeleteNote}
            onCancel={handleCancelDelete}
          />
        )}

        {/* Botón de agregar nota */}
        <button
          className="add-note-button"
          onClick={() => setIsAddNoteOpen(true)}
        >
          +
        </button>
      </div>
    </NotesContext.Provider>
  );
};

export default App;
