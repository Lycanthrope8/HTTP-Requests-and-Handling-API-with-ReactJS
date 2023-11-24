import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieLoaded, setMovieLoaded] = useState([]);
  async function FetchMovie() {
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const MovieData = data.results.map((movieData) => {
      return {
        title: movieData.title,
        id: movieData.episode_id,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovieLoaded(MovieData);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieLoaded} />
      </section>
    </React.Fragment>
  );
}

export default App;
