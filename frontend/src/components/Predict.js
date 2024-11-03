// Predict.js (React component)

import React, { useState } from 'react';

function Predict() {
    const [excerpt, setExcerpt] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = async () => {
        try {
            const response = await fetch("https://orca-app-xrzwb.ondigitalocean.app/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ excerpt }),
            });

            if (response.ok) {
                const data = await response.json();
                setPrediction(data.prediction);
            } else {
                console.error("Error in prediction request");
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
        }
    };

    return (
        <div>
            <h1>Text Prediction</h1>
            <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Enter text here"
            />
            <button onClick={handlePredict}>Predict</button>
            {prediction !== null && (
                <p>Predicted Value: Grade {prediction.toFixed(0)}</p>
            )}
        </div>
    );
}

export default Predict;
