import React, { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../../Config";
// import MovieList from "../home/MovieList";

let page = 1;

const Search = ({ setMovies, movies }) => {
  const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState([]);
  const search_url = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;

  const getMovies = async (query) => {
    const search_url = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;

    const response = await fetch(search_url);
    const data = await response.json();
    console.log(data.results);
    setMovies(data.results);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (query) {
      getMovies(search_url + query);
      setQuery("");
    }
  };
  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            value={query}
            onChange={handleOnChange}
            placeholder="Type to search..."
          ></input>
        </form>
      </div>
    </>
  );
};

export default Search;
