// src/components/AddCollection.tsx

import React, { useContext, useState } from 'react';
import { NotesContext } from '../App';
import { Collection } from '../types';

interface AddCollectionProps {
    onClose: () => void;
}

const AddCollection: React.FC<AddCollectionProps> = ({ onClose }) => {
    const { dispatch } = useContext(NotesContext);
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCollection: Collection = {
            id: Date.now(),
            name,
        };
        dispatch({ type: 'ADD_COLLECTION', payload: newCollection });
        onClose();
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la colección"
                required
            />
            <button type="submit">Agregar Colección</button>
            <button type="button" onClick={onClose}>Cerrar</button>
        </form>
    );
};

export default AddCollection;
