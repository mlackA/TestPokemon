import React from 'react';

interface ModalInterface {
    isOpen: boolean,
    onClose: () => void,
    pokemon: any
}

const Modal = ({ isOpen, onClose, pokemon }: ModalInterface) => {
    if (!isOpen || !pokemon) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">{pokemon.name}</h2>
                <img 
                    src={pokemon.sprites.other?.home.front_default} 
                    alt={pokemon.name} 
                    className="w-32 h-32 object-cover" 
                />
                <p>Type: {pokemon.types[0].type.name}</p>


                <p>Moves: {pokemon.moves[0].move.name}</p>
                <button onClick={onClose} className="mt-4 p-2 bg-red-500 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;