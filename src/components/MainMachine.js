// src/components/MainMachine.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './MainMachine.css';
import Predict from './Predict';

const MainMachine = ({ imageSrc }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClick = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className={`main-machine ${isPopupOpen ? 'hover-disabled' : ''}`} onClick={handleClick}>
            <img src={imageSrc} alt="Main Machine" className="main-machine-image" />

            {isPopupOpen && ReactDOM.createPortal(
                <div className="popup" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <Predict />
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MainMachine;
