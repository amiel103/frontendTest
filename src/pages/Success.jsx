import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './WebPage.css'; // Assuming you'll create a separate CSS file for styles

const WebPage = () => {
  const handleTryAgain = () => {
    console.log('Trying again...');
  };

  return (
    <div style={{ alignContent:'center', position: 'relative', width: '100vw', height: '100vh'}}>

    <div className="error-container">
      <h1>Successful</h1>
      <NavLink to="/" aria-label="Go to Home">
        <button onClick={handleTryAgain} className="try-again-button">
          Go Back
        </button>
      </NavLink>
    </div>
    </div>
  );
};

export default WebPage;