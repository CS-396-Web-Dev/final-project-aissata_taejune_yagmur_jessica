'use client';
import React, { useState } from 'react';
import './styles/Card.css';

const healthStages = ['Sick', 'Okay', 'Healthy'];

// Calculate the health stage based on pet attributes
const getHealthStage = (pet) => {
  // Calculate the average of the three stats (food, happiness, hearts)
  const average = (pet.food + pet.happiness + pet.hearts) / 3;

  // Determine health stage based on the average value
  if (average <= 40) {
    return healthStages[0]; // Sick
  } else if (average <= 70) {
    return healthStages[1]; // Okay
  } else {
    return healthStages[2]; // Healthy
  }
};

const Card = ({ pet, onClick, onCollect }) => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [bioVisible, setBioVisible] = useState(false); // State to toggle bio visibility

  const toggleBioVisibility = (e) => {
    e.stopPropagation(); // Prevent the card's click handler from firing when the button is clicked
    setBioVisible(!bioVisible); // Toggle the visibility of the bio
  };

  return (
    <article className="pet-card" onClick={onClick} aria-label={`Pet card for ${pet.name}`}>
      <section className="pet-card-top">
        <img
          src={pet.image}
          alt={`Image of ${pet.name}`}
          className="pet-image"
        />
        <div className="pet-info">
          <h2>{pet.name}</h2>
          <p>🌱 Health:
            <span aria-live="polite" aria-label={`Health stage is ${getHealthStage(pet)}`}>
              {getHealthStage(pet)}
            </span>
          </p>
        </div>
      </section>

      {/* Pet Stats with Progress Bars */}
      <section className="pet-stats">
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
      </section>

      {/* Bio Section (Initially Hidden) */}
      <section className="pet-bio">
        <button 
          className="view-bio-button"
          onClick={toggleBioVisibility}
          aria-label={`Toggle bio visibility for ${pet.name}`}
        >
          {bioVisible ? 'Hide Bio' : 'Read Bio'}
        </button>
        
        {bioVisible && <p>{pet.bio}</p>} {/* Bio content displayed when bioVisible is true */}
      </section>

      <section className="pet-card-bottom">
        <button
          className="collect-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the card
            onCollect(pet);
          }}
          aria-label={`Collect ${pet.money} coins from ${pet.name}`}
        >
          💰 Collect: {pet.money}
        </button>
        <p>Acquired: <time dateTime={pet.acquiredDate}>{pet.acquiredDate}</time></p>
      </section>
    </article>
  );
};

export default Card;


