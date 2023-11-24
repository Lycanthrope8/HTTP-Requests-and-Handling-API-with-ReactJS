import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  
  const [movieLoaded, setMovieLoaded] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  async function FetchMovie() {
    setIsLoading(true);
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
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movieLoaded.length>0 &&<MoviesList movies={movieLoaded} />}
        {!isLoading && movieLoaded.length===0 &&<p>No Movies Available. Please Click the Fetch Movies Button.</p>}
        {isLoading &&<p>Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
