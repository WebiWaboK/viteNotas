// src/App.tsx

import React, { createContext, useReducer, useState, useEffect } from 'react';
import AddNote from './components/AddNote';
import AppBar from './components/AppBar'; 
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import CollectionPanel from './components/CollectionPanel'; 
import { Note, Collection } from './types';
import { IconButton } from '@mui/material'; 
import AddIcon from '@mui/icons-material/Add';

// Crear el contexto de notas
export const NotesContext = createContext<{
    state: { notes: Record<string, Note[]>; collections: Collection[] };
    dispatch: React.Dispatch<any>;
}>({
    state: { notes: {}, collections: [] },
    dispatch: () => null,
});

const notesReducer = (state: { notes: Record<string, Note[]>; collections: Collection[] }, action: any) => {
    switch (action.type) {
        case 'ADD_NOTE': {
            const { category } = action.payload;
            const updatedNotes = {
                ...state.notes,
                [category]: [...(state.notes[category] || []), action.payload],
            };
            return { ...state, notes: updatedNotes };
        }
        case 'DELETE_NOTE': {
            const updatedNotes = { ...state.notes };
            for (const category in updatedNotes) {
                updatedNotes[category] = updatedNotes[category].filter(note => note.id !== action.payload);
            }
            return { ...state, notes: updatedNotes };
        }
        case 'ADD_COLLECTION':
            return { ...state, collections: [...state.collections, action.payload] };
        default:
            return state;
    }
};

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
    const [isCollectionPanelOpen, setIsCollectionPanelOpen] = useState(false);
    const [selectedCollectionNotes, setSelectedCollectionNotes] = useState<Note[]>([]);

    const [state, dispatch] = useReducer(notesReducer, { notes: {}, collections: [] });

    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        const savedCollections = localStorage.getItem('collections');
        if (savedNotes) {
            dispatch({ type: 'LOAD_NOTES', payload: JSON.parse(savedNotes) });
        }
        if (savedCollections) {
            dispatch({ type: 'LOAD_COLLECTIONS', payload: JSON.parse(savedCollections) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(state.notes));
        localStorage.setItem('collections', JSON.stringify(state.collections));
    }, [state.notes, state.collections]);

    const addNote = (newNote: Note) => {
        dispatch({ type: 'ADD_NOTE', payload: newNote });
        setIsAddNoteOpen(false);
    };

    const confirmDeleteNote = (note: Note) => {
        setNoteToDelete(note);
        setIsModalOpen(true);
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
        setSelectedCollectionNotes(notes);
        setIsCollectionPanelOpen(true);
    };

    const closeCollectionPanel = () => {
        setIsCollectionPanelOpen(false);
    };

    return (
        <NotesContext.Provider value={{ state, dispatch }}>
            <div className="app">
                <AppBar />

                {isAddNoteOpen && (
                    <AddNote onAddNote={addNote} onClose={() => setIsAddNoteOpen(false)} />
                )}

                {isCollectionPanelOpen && (
                    <CollectionPanel notes={selectedCollectionNotes} onClose={closeCollectionPanel} />
                )}

                {/* Lista de notas agrupadas por categoría */}
                <div className="notes-container">
                    {Object.entries(state.notes).map(([category, notes]) => (
                        <div key={category} className="category-container">
                            <h3>{category}</h3>
                            <div className="notes-flex-container"> {/* Nuevo contenedor flex */}
                                {notes.map((note) => (
                                    <div className="note" key={note.id}>
                                        <h3>{note.title}</h3>
                                        <p>{note.content}</p>
                                        <button className="edit-button">Editar</button>
                                        <button className="delete-button" onClick={() => confirmDeleteNote(note)}>Eliminar</button>
                                        <button className="view-collection-button" onClick={() => openCollectionPanel([note])}>Ver colección</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <ConfirmDeleteModal
                        onConfirm={handleDeleteNote}
                        onCancel={handleCancelDelete}
                    />
                )}

                <IconButton
                    className="add-note-button"
                    onClick={() => setIsAddNoteOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#ffcccb',
                        borderRadius: '50%',
                        padding: '10px',
                    }}
                >
                    <AddIcon style={{ color: '#000' }} />
                </IconButton>
            </div>
        </NotesContext.Provider>
    );
};

export default App;
