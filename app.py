from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load CSV
csv_path = "final_perfume_data.csv"
if not os.path.exists(csv_path):
    print(f"Warning: {csv_path} not found. Please ensure the CSV file is in the same directory.")
    df = pd.DataFrame()
else:
    df = pd.read_csv(csv_path, encoding='latin1')
    df['combined'] = (df['Name'] + " " + df['Brand'] + " " + df['Description'] + " " + df['Notes']).fillna("")

# Load model
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    # Precompute perfume embeddings
    if not df.empty:
        perfume_embeddings = model.encode(df['combined'].tolist(), show_progress_bar=True)
    else:
        perfume_embeddings = []
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    perfume_embeddings = []

def recommend_perfume(user_input, top_k=3):
    if model is None or df.empty:
        return []
    
    try:
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
                "image_url": row['Image URL'] if 'Image URL' in row else ""
            })
        return perfumes
    except Exception as e:
        print(f"Error in recommendation: {e}")
        return []

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        user_query = data.get('query', '')
        
        if not user_query:
            return jsonify({'error': 'No query provided'}), 400
        
        recommendations = recommend_perfume(user_query, top_k=3)
        
        return jsonify({
            'recommendations': recommendations,
            'query': user_query
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000) 