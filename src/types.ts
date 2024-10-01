export interface Note {
    id: number;
    title: string;
    content: string;
    category?: string; // Agregar categoría como opcional
    tags?: string[]; // Agregar etiquetas como opcional
}
  
export interface NotesState {
    notes: Note[];
}
  
export interface NotesAction {
    type: string;
    payload?: Note | number; // Puede ser un objeto Note o un número (ID para eliminar)
}
