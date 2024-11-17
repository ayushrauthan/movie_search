import React from 'react';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>Year: {movie.Year}</p>
      <p>Type: {movie.Type}</p>
    </div>
  );
}

export default MovieCard;
