'use client';
import React, { useState } from 'react';
import './styles/Popup.css';

// Health stages: Sick, Okay, Healthy
const healthStages = ['Sick', 'Okay', 'Healthy'];

// Function to determine health based on stats
const getHealthStage = (pet) => {
  if (pet.hearts >= 90 && pet.happiness >= 90 && pet.food >= 90) {
    return healthStages[2]; // Healthy
  } else if (pet.hearts >= 50 && pet.happiness >= 50 && pet.food >= 50) {
    return healthStages[1]; // Okay
  } else {
    return healthStages[0]; // Sick
  }
};

const Popup = ({ pet, onClose, onUpdatePet, onCollect }) => {
  if (!pet) return null;

  const [petState, setPetState] = useState(pet);
  const [showBio, setShowBio] = useState(false); // New state to toggle the bio visibility

  const handleIncrease = (stat) => {
    const newValue = Math.min(petState[stat] + 10, 100);
    let updatedPet = {
      ...petState,
      [stat]: newValue,
    };

    // Check if a stat reached max value (100) and if it was below 100 before
    if (newValue === 100 && petState[stat] < 100) {
      updatedPet.money += 100; // Increase pet money by 100 when stat reaches 100
    }

    setPetState(updatedPet);
    onUpdatePet(updatedPet);
  };

  return (
    <div 
      className="popup-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-labelledby={`popup-title-${petState.id}`} 
      aria-describedby={`popup-description-${petState.id}`}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-button" 
          onClick={onClose} 
          aria-label="Close popup"
        >
          ×
        </button>
        <h2 id={`popup-title-${petState.id}`}>{petState.name}</h2>
        <img 
          src={petState.image} 
          alt={`Image of ${petState.name}`} 
          className="popup-image" 
        />
        <div 
          id={`popup-description-${petState.id}`} 
          className="popup-stats-buttons-container"
        >
          <section className="popup-stats" aria-label="Pet statistics">
            <div className="stat">
              <label htmlFor={`hearts-progress-${petState.id}`}>❤️ Hearts</label>
              <progress id={`hearts-progress-${petState.id}`} value={petState.hearts} max="100"></progress>
              <span>{petState.hearts}%</span>
            </div>
            <div className="stat">
              <label htmlFor={`happiness-progress-${petState.id}`}>😊 Happiness</label>
              <progress id={`happiness-progress-${petState.id}`} value={petState.happiness} max="100"></progress>
              <span>{petState.happiness}%</span>
            </div>
            <div className="stat">
              <label htmlFor={`food-progress-${petState.id}`}>🍖 Food</label>
              <progress id={`food-progress-${petState.id}`} value={petState.food} max="100"></progress>
              <span>{petState.food}%</span>
            </div>
            <p>💰 Money: {petState.money}</p>
            <p>🌱 Health: {getHealthStage(petState)}</p> {/* Health Stage */}
            <p>📅 Acquired: {petState.acquiredDate}</p>
          </section>
          <section className="popup-buttons" aria-label="Interaction buttons">
            <button 
              onClick={() => handleIncrease('happiness')} 
              aria-label="Increase happiness by playing with the pet"
            >
              Play!
            </button>
            <button 
              onClick={() => handleIncrease('food')} 
              aria-label="Increase food by feeding the pet"
            >
              Feed!
            </button>
            <button 
              onClick={() => handleIncrease('hearts')} 
              aria-label="Increase hearts by showing love to the pet"
            >
              Love!
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
              aria-label="Collect money from the pet"
            >
              Collect
            </button>
          </section>
          
          {/* Read Bio Button */}
          <button 
            className="bio-button" 
            onClick={() => setShowBio(!showBio)} 
            aria-label="Read the pet's bio"
          >
            {showBio ? 'Hide Bio' : 'Read Bio'}
          </button>

          {/* Bio Section */}
          {showBio && (
            <div className="popup-bio">
              <h3>Bio:</h3>
              <p>{petState.bio || 'No bio available for this pet.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;

// 'use client';
// import React, { useState } from 'react';
// import './styles/Popup.css';

// // Health stages: Sick, Okay, Healthy
// const healthStages = ['Sick', 'Okay', 'Healthy'];

// // Function to determine health based on stats
// const getHealthStage = (pet) => {
//   if (pet.hearts >= 90 && pet.happiness >= 90 && pet.food >= 90) {
//     return healthStages[2]; // Healthy
//   } else if (pet.hearts >= 50 && pet.happiness >= 50 && pet.food >= 50) {
//     return healthStages[1]; // Okay
//   } else {
//     return healthStages[0]; // Sick
//   }
// };

// const Popup = ({ pet, onClose, onUpdatePet, onCollect }) => {
//   if (!pet) return null;

//   const [petState, setPetState] = useState(pet);

//   const handleIncrease = (stat) => {
//     const newValue = Math.min(petState[stat] + 10, 100);
//     let updatedPet = {
//       ...petState,
//       [stat]: newValue,
//     };

//     // Check if a stat reached max value (100) and if it was below 100 before
//     if (newValue === 100 && petState[stat] < 100) {
//       updatedPet.money += 100; // Increase pet money by 100 when stat reaches 100
//     }

//     setPetState(updatedPet);
//     onUpdatePet(updatedPet);
//   };

//   return (
//     <div 
//       className="popup-overlay" 
//       onClick={onClose} 
//       role="dialog" 
//       aria-labelledby={`popup-title-${petState.id}`} 
//       aria-describedby={`popup-description-${petState.id}`}
//     >
//       <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//         <button 
//           className="close-button" 
//           onClick={onClose} 
//           aria-label="Close popup"
//         >
//           ×
//         </button>
//         <h2 id={`popup-title-${petState.id}`}>{petState.name}</h2>
//         <img 
//           src={petState.image} 
//           alt={`Image of ${petState.name}`} 
//           className="popup-image" 
//         />
//         <div 
//           id={`popup-description-${petState.id}`} 
//           className="popup-stats-buttons-container"
//         >
//           <section className="popup-stats" aria-label="Pet statistics">
//             <div className="stat">
//               <label htmlFor={`hearts-progress-${petState.id}`}>❤️ Hearts</label>
//               <progress id={`hearts-progress-${petState.id}`} value={petState.hearts} max="100"></progress>
//               <span>{petState.hearts}%</span>
//             </div>
//             <div className="stat">
//               <label htmlFor={`happiness-progress-${petState.id}`}>😊 Happiness</label>
//               <progress id={`happiness-progress-${petState.id}`} value={petState.happiness} max="100"></progress>
//               <span>{petState.happiness}%</span>
//             </div>
//             <div className="stat">
//               <label htmlFor={`food-progress-${petState.id}`}>🍖 Food</label>
//               <progress id={`food-progress-${petState.id}`} value={petState.food} max="100"></progress>
//               <span>{petState.food}%</span>
//             </div>
//             <p>💰 Money: {petState.money}</p>
//             <p>🌱 Health: {getHealthStage(petState)}</p> {/* Health Stage */}
//             <p>📅 Acquired: {petState.acquiredDate}</p>
//           </section>
//           <section className="popup-buttons" aria-label="Interaction buttons">
//             <button 
//               onClick={() => handleIncrease('happiness')} 
//               aria-label="Increase happiness by playing with the pet"
//             >
//               Play!
//             </button>
//             <button 
//               onClick={() => handleIncrease('food')} 
//               aria-label="Increase food by feeding the pet"
//             >
//               Feed!
//             </button>
//             <button 
//               onClick={() => handleIncrease('hearts')} 
//               aria-label="Increase hearts by showing love to the pet"
//             >
//               Love!
//             </button>
//             <button
//               onClick={() => {
//                 onCollect(petState); // Update parent state
//                 const updatedPet = {
//                   ...petState,
//                   money: 0, // Reset money after collecting
//                 };
//                 setPetState(updatedPet);
//                 onUpdatePet(updatedPet);
//               }}
//               aria-label="Collect money from the pet"
//             >
//               Collect
//             </button>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;