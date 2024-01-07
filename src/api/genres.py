from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGZiMDZkNWQzNWM4ZjdmMmM5YWE0NjU2OThlYWNhNyIsInN1YiI6IjY1ODEwMzBmMmY4ZDA5MDhmNGE4NWMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V_9zL_OToSVntD9bYtYd_Q86KrbxWZvwLEvzvCxHtbU" 

# Endpoint para obtener géneros de películas desde TMDb
@app.route('/genres', methods=['GET'])
def obtener_generos():
    url = "https://api.themoviedb.org/3/genre/movie/list"
    params = {"api_key": TMDB_API_KEY}
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        genres = response.json()["genres"]
        return jsonify({"genres": genres})
    else:
        return jsonify({"error": "Error al obtener los géneros"}), 500

if __name__ == '__main__':
    app.run(debug=True)