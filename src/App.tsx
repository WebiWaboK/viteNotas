// src/App.tsx

import React, { createContext, useReducer, useState } from 'react';
import AddNote from './components/AddNote';
import AppBar from './components/AppBar'; // Importa el AppBar
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import CollectionPanel from './components/CollectionPanel'; // Importa el Panel de Colección de Notas
import { Note } from './types';
import { IconButton } from '@mui/material'; // Importa el componente IconButton
import AddIcon from '@mui/icons-material/Add'; // Asegúrate de que este ícono esté instalado

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
  const [isCollectionPanelOpen, setIsCollectionPanelOpen] = useState(false); // Controla el panel de colección
  const [selectedCollectionNotes, setSelectedCollectionNotes] = useState<Note[]>([]); // Notas de la colección seleccionada

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

  const openCollectionPanel = (notes: Note[]) => {
    setSelectedCollectionNotes(notes); // Asigna las notas seleccionadas
    setIsCollectionPanelOpen(true); // Abre el panel de colección
  };

  const closeCollectionPanel = () => {
    setIsCollectionPanelOpen(false); // Cierra el panel de colección
  };

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <AppBar /> {/* Añade el AppBar aquí */}
        
        {/* Modal de agregar nota */}
        {isAddNoteOpen && (
          <AddNote onAddNote={addNote} onClose={() => setIsAddNoteOpen(false)} />
        )}

        {/* Panel de colección de notas */}
        {isCollectionPanelOpen && (
          <CollectionPanel notes={selectedCollectionNotes} onClose={closeCollectionPanel} />
        )}

        {/* Lista de notas */}
        <div className="notes-container">
          {state.map((note) => (
            <div className="note" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button className="edit-button">Editar</button>
              <button className="delete-button" onClick={() => confirmDeleteNote(note)}>Eliminar</button>
              <button className="view-collection-button" onClick={() => openCollectionPanel([note])}>Ver colección</button>
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

        {/* Botón de agregar nota con ícono */}
        <IconButton
          className="add-note-button"
          onClick={() => setIsAddNoteOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#ffcccb', // Color pastel
            borderRadius: '50%',
            padding: '10px',
          }}
        >
          <AddIcon style={{ color: '#000' }} /> {/* Color del ícono */}
        </IconButton>
      </div>
    </NotesContext.Provider>
  );
};

export default App;
