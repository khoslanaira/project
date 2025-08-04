from flask import Flask, request, jsonify
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load CSV
df = pd.read_csv("final_perfume_data.csv", encoding='latin1')
df['combined'] = (df['Name'] + " " + df['Brand'] + " " + df['Description'] + " " + df['Notes']).fillna("")

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Precompute perfume embeddings
perfume_embeddings = model.encode(df['combined'].tolist(), show_progress_bar=True)

# Function to recommend perfumes
def recommend_perfume(user_input, top_k=3):
    user_embedding = model.encode([user_input])
    similarities = cosine_similarity(user_embedding, perfume_embeddings)[0]
    top_indices = similarities.argsort()[::-1][:top_k]
    results = df.iloc[top_indices]

    perfumes = []
    for _, row in results.iterrows():
        perfumes.append({
            "name": row['Name'],
            "brand": row['Brand'],
            "notes": row['Notes'],
            "description": row['Description'],
            "image_url": row['Image URL']
        })
    return perfumes

# Create API route
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_input = data.get("query", "")
    results = recommend_perfume(user_input)
    return jsonify(results)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
