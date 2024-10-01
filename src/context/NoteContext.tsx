import React, { createContext, useReducer, ReactNode } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

interface State {
  notes: Note[];
}

type Action =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: number }
  | { type: 'EDIT_NOTE'; payload: Note };

const initialState: State = { notes: [] };

const noteReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => (note.id === action.payload.id ? action.payload : note)),
      };
    default:
      return state;
  }
};

export const NoteContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  return <NoteContext.Provider value={{ state, dispatch }}>{children}</NoteContext.Provider>;
};

export default NoteContext;
