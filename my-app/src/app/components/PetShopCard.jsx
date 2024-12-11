'use client';
import React from 'react';
import './styles/PetShopCard.css';

const PetShopCard = ({ pet, onBuy }) => {
  return (
    <article className="pet-shop-card" aria-labelledby={`pet-title-${pet.id}`} aria-describedby={`pet-price-${pet.id}`}>
      <img src={pet.image} alt={`Image of ${pet.name}`} className="pet-image" />
      <div className="pet-shop-info">
        <h1 id={`pet-title-${pet.id}`}>{pet.name}</h1>
        <p id={`pet-price-${pet.id}`}>💰 Price: {pet.price}</p>

        <div className="pet-shop-stats">
          <div className="stat">
            <label htmlFor={`hearts-progress-${pet.id}`}>❤️ Hearts</label>
            <progress id={`hearts-progress-${pet.id}`} value={pet.hearts} max="100"></progress>
            <span>{pet.hearts}%</span>
          </div>
          <div className="stat">
            <label htmlFor={`happiness-progress-${pet.id}`}>😊 Happiness</label>
            <progress id={`happiness-progress-${pet.id}`} value={pet.happiness} max="100"></progress>
            <span>{pet.happiness}%</span>
          </div>
          <div className="stat">
            <label htmlFor={`food-progress-${pet.id}`}>🍖 Food</label>
            <progress id={`food-progress-${pet.id}`} value={pet.food} max="100"></progress>
            <span>{pet.food}%</span>
          </div>
        </div>

        <button 
          onClick={() => onBuy(pet)} 
          className="buy-button" 
          aria-label={`Buy ${pet.name} for ${pet.price} coins`}
        >
          Buy
        </button>
      </div>
    </article>
  );
};

export default PetShopCard;

