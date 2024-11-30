'use client';
import React, { useState } from 'react';
import './styles/Popup.css';

const Popup = ({ pet, onClose, onUpdatePet, onCollect }) => {
  if (!pet) return null;

  const [petState, setPetState] = useState(pet);

  const handleIncrease = (stat) => {
    const newValue = Math.min(petState[stat] + 10, 100);
    const updatedPet = {
      ...petState,
      [stat]: newValue, 
    };
    setPetState(updatedPet);
    onUpdatePet(updatedPet);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{petState.name}</h2>
        <img src={petState.image} alt={petState.name} className="popup-image" />
        {/* New container for stats and buttons */}
        <div className="popup-stats-buttons-container">
          <div className="popup-stats">
            <p>❤️ Hearts: {petState.hearts}</p>
            <p>😊 Happiness: {petState.happiness}</p>
            <p>🍖 Food: {petState.food}</p>
            <p>💰 Money: {petState.money}</p>
            <p>📅 Acquired: {petState.acquiredDate}</p>
          </div>
          <div className="popup-buttons">
            <button onClick={() => handleIncrease('happiness')}>
              Increase Happiness
            </button>
            <button onClick={() => handleIncrease('food')}>
              Increase Food
            </button>
            <button onClick={() => handleIncrease('hearts')}>
              Increase Hearts
            </button>
            <button
              onClick={() => {
                onCollect(petState); // Update parent state
                const updatedPet = {
                  ...petState,
                  money: 0, // Reset money after collecting
                };
                setPetState(updatedPet);
                onUpdatePet(updatedPet);
              }}
            >
              Collect
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
