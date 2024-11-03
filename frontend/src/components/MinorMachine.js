import React from 'react';
import './MinorMachine.css';

function MinorMachine({ imageSrc }) {
  return (
    <div className="minor-machine">
      <img src={imageSrc} alt="Minor Machine" className="minor-machine-image" draggable='false'/>
    </div>
  );
}

export default MinorMachine;