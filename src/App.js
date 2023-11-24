import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieLoaded, setMovieLoaded] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const FetchMovie = useCallback(async ()=> {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something Went Wrong!!!");
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[])

  useEffect(() => {
    FetchMovie();
  }, [FetchMovie]);

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movieLoaded.length > 0 && (
          <MoviesList movies={movieLoaded} />
        )}
        {!isLoading && movieLoaded.length === 0 && !error && (
          <p>No Movies Available. Please Click the Fetch Movies Button.</p>
        )}
        {!isLoading && error && <p> {error} </p>}
        {isLoading && <p>Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
