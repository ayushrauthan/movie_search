import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = '7d95daee'; // Replace with your OMDb API Key

  // Search for movies
  const searchMovies = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: { apikey: API_KEY, s: searchQuery },
      });
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        alert(response.data.Error);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch movie details
  const getMovieDetails = async (id) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/`, {
        params: { apikey: API_KEY, i: id },
      });
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // Clear movie details
  const clearDetails = () => setSelectedMovie(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Movie Search App</h1>

      {/* Search Bar */}
      {!selectedMovie && (
        <div>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          />
          <button onClick={searchMovies} style={{ padding: '10px' }}>
            Search
          </button>
        </div>
      )}

      {/* Movie Details View */}
      {selectedMovie ? (
        <div style={{ marginTop: '20px' }}>
          <button onClick={clearDetails} style={{ marginBottom: '20px' }}>
            Back to Search
          </button>
          <h2>{selectedMovie.Title}</h2>
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            style={{ width: '300px' }}
          />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </div>
      ) : (
        /* Movie List View */
        <div style={{ marginTop: '20px' }}>
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => getMovieDetails(movie.imdbID)}
              style={{
                display: 'inline-block',
                width: '200px',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: '100%', borderRadius: '5px' }}
              />
              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>
                {movie.Title}
              </h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
