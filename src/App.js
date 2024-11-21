import React, { useState } from 'react';
import './styles.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=7d95daee&s=${searchQuery}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const getMovieDetails = async (id) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=7d95daee&i=${id}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  const clearDetails = () => setSelectedMovie(null);

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>
      {selectedMovie ? (
        <div className="movie-details">
          <button onClick={clearDetails}>Back</button>
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Director:</strong> {selectedMovie.Director}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="card" key={movie.imdbID} onClick={() => getMovieDetails(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} />
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">Year: {movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
