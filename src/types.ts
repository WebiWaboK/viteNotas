export interface Note {
    id: number;
    title: string;
    content: string;
  }
  
  export interface NotesState {
    notes: Note[];
  }
  
  export interface NotesAction {
    type: string;
    payload?: Note | number; // Puede ser un objeto Note o un número (ID para eliminar)
  }
  