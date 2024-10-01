// src/components/Collection.tsx

import React from 'react';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface CollectionProps {
    notes: Note[];
    onDelete: (id: number) => void;
}

const Collection: React.FC<CollectionProps> = ({ notes, onDelete }) => {
    return (
        <div className="collection-container">
            {notes.map((note, index) => (
                <div
                    key={note.id}
                    className="note-overlay"
                    draggable // Permite el evento "drag and drop"
                    onClick={() => {
                        // Lógica para mostrar el panel de colección de notas
                    }}
                    style={{ transform: `translateY(-${index * 10}px)` }} // Ajusta la posición de superposición
                >
                    <button className="delete-button" onClick={() => onDelete(note.id)}>
                        ❌ {/* Aquí puedes usar un ícono de eliminar */}
                        <span className="tooltip">Eliminar</span>
                    </button>
                    <h3 className="note-title">{note.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default Collection;
