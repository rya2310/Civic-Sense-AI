import sys
import joblib
import spacy
import re
import string
import json

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# Load saved models, encoders, and vectorizer
models = joblib.load("random_forest_models2.0.pkl")
label_encoders = joblib.load("label_encoders2.0.pkl")
tfidf = joblib.load("tfidf_vectorizer2.0.pkl")

# Text Cleaning Function
def clean_text(text):
    text = text.lower().strip()
    text = re.sub(f"[{string.punctuation}]", "", text)  # Remove punctuation
    text = re.sub(r"\d+", "", text)  # Remove numbers
    doc = nlp(text)
    tokens = [token.lemma_ for token in doc if not token.is_stop]
    return " ".join(tokens)

# Function to make predictions
def predict_complaint(complaint_text):
    cleaned_text = clean_text(complaint_text)
    transformed_text = tfidf.transform([cleaned_text])

    predictions = {}
    for target, model in models.items():
        pred_label = model.predict(transformed_text)[0]
        predictions[target] = label_encoders[target].inverse_transform([pred_label])[0]

    return predictions

# Check if the script is run directly (useful when testing)
if __name__ == "__main__":
    try:
        # Get the complaint text passed from the Node.js app
        complaint_text = sys.argv[1]

        # Get the predicted result from the model
        predictions = predict_complaint(complaint_text)

        # Print the predictions as a JSON string to ensure Node.js can parse it
        print(json.dumps(predictions))  # Only print JSON
    except Exception as e:
        print(json.dumps({"error": "Failed to process complaint", "message": str(e)}))
    sys.stdout.flush()
    