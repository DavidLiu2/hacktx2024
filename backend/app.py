from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import tensorflow as tf
import pandas as pd

# Import or define the custom layer class
@tf.keras.utils.register_keras_serializable()
class ReadabilityScoreLayer(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super(ReadabilityScoreLayer, self).__init__(**kwargs)

    def call(self, inputs):
        words = tf.strings.split(inputs)
        word_count = tf.map_fn(lambda x: tf.size(x), words, fn_output_signature=tf.int32)
        word_count = tf.cast(word_count, tf.float32)

        sentence_count = tf.strings.regex_replace(inputs, r"[^\.]", "")
        sentence_count = tf.strings.length(sentence_count)
        sentence_count = tf.cast(sentence_count, tf.float32)
        sentence_count = tf.maximum(sentence_count, 1.0)

        readability_score = (0.39 * (word_count / sentence_count)) + (11.8 * (word_count / word_count)) - 15.59
        return tf.expand_dims(readability_score, axis=-1)

    def compute_output_shape(self, input_shape):
        return (input_shape[0], 1)

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the saved model
model = load_model("backend/model.keras", custom_objects={'ReadabilityScoreLayer': ReadabilityScoreLayer})



@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.json
    text = data['excerpt']  # Assume input is in a key called 'excerpt'

    # Convert the text to a tensor for prediction
    text_input = tf.convert_to_tensor([text], dtype=tf.string)
    
    # Make prediction
    prediction = model.predict(text_input)

    result = pd.cut([prediction[0][0]], bins=[-2.35, -1.875, -1.53, -1.199, -1.192, -0.643, -0.466, -.136, .47 , .81, 1.71], labels=range(12, 2, -1))[0]

    # Return the prediction as JSON
    return jsonify({'prediction': result})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
