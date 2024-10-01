// src/types.ts

export interface Note {
    id: number;
    title: string;
    content: string;
    category?: string; // Agregar categoría como opcional
    tags?: string[]; // Agregar etiquetas como opcional
    collectionId?: number; // Opcional para asociar notas a una colección
}
  
export interface Collection {
    id: number;
    name: string;
}
  
export interface NotesState {
    notes: Note[];
    collections: Collection[]; // Agregar estado para colecciones
}
  
export interface NotesAction {
    type: string;
    payload?: Note | number | Collection; // Puede ser un objeto Note, un número (ID para eliminar) o una Collection
}
