import sys
import re
import string
import joblib
import spacy
import json
from sklearn.feature_extraction.text import TfidfVectorizer

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# Load trained ML models
models = joblib.load("random_forest_models.pkl")
tfidf = joblib.load("tfidf_vectorizer.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# Text Cleaning Function
def clean_text(text):
    text = text.lower().strip()
    text = re.sub(f"[{string.punctuation}]", "", text)  # Remove punctuation
    text = re.sub(r"\d+", "", text)  # Remove numbers
    
    # Process with spaCy NLP
    doc = nlp(text)
    tokens = [token.lemma_ for token in doc if not token.is_stop]
    
    return " ".join(tokens)

# Function to Predict Complaint Category
def predict_complaint_category(complaint_text):
    cleaned_text = clean_text(complaint_text)  # Clean input text
    X_tfidf = tfidf.transform([cleaned_text])  # Convert to TF-IDF
    
    # Make Predictions
    category_pred = models["Category"].predict(X_tfidf)
    department_pred = models["Department"].predict(X_tfidf)
    sentiment_pred = models["Sentiment"].predict(X_tfidf)

    # Convert numeric predictions back to labels
    category = label_encoders["Category"].inverse_transform(category_pred)[0]
    department = label_encoders["Department"].inverse_transform(department_pred)[0]
    sentiment = label_encoders["Sentiment"].inverse_transform(sentiment_pred)[0]

    return {
        "category": category,
        "department": department,
        "sentiment": sentiment
    }

# 🔥 Handle Command-line Arguments (from Node.js)
if __name__ == "__main__":
    complaint_text = sys.argv[1]  # Take input from Node.js
    predictions = predict_complaint_category(complaint_text)
    print(json.dumps(predictions))  # Convert predictions to JSON and print
