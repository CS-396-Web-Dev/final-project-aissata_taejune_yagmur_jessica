// InstructionsCard.jsx
import React from 'react';
import './styles/InstructionsCard.css';

const InstructionsCard = ({ onDismiss }) => {
  return (
    <section className="instructions-card" aria-labelledby="instructions-heading">
      <button className="dismiss-btn" onClick={onDismiss}>
        &times;
      </button>
      <h2 id="instructions-heading">Welcome to Pet World!</h2>
      <p>Here's how to play with your pets:</p>
      <ul>
        <li>
          <strong>My Pets</strong>: View the pets you've bought. 
          <span role="note"> Click to interact with them.</span>
        </li>
        <li>
          <strong>Pet Shop</strong>: Browse available pets for purchase. 
          <span role="note">You need enough money to buy new pets.</span>
        </li>
        <li>
          <strong>Pet Stats</strong>: Keep an eye on your pets' hearts, happiness, and food levels to keep them healthy and happy!
        </li>
        <li>
          <strong>Level Up</strong>: As you collect money, your level will increase.
        </li>
      </ul>
    </section>
  );
};

export default InstructionsCard;
