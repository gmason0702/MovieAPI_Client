import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../../Config";
import MovieList from "./MovieList";
import AddFavorite from "../favorites/AddFavorite";
import RemoveFavorite from "../favorites/RemoveFavorite";
import FavHeading from "../favorites/FavHeading";
import Search from "../home/Search";
import Review from "../favorites/Review";
import SideScroll from "../SideScroll";
import "bootstrap/dist/css/bootstrap.min.css";

import Heading from "./Heading";
import Logo from "../../assets/logo.png";
let page = 1;
const HomePage = ({ logout }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // const [searchValue, setSearchValue] = useState("");
  const popular_url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

  const scrollRef = SideScroll();
  const scrollRefFav = SideScroll();

  const getMovies = async () => {
    const response = await fetch(popular_url);
    const data = await response.json();
    console.log(data.results);
    setMovies(data.results);
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("movie-radar-favorites")
    );

    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-radar-favorites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.id !== movie.id
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid home-wrapper">
      <div className="header-wrapper">
        <Heading
          logout={logout}
          className="header"
          title="MOVIE RADAR"
          logo={Logo}
        />
        <Search movies={movies} setMovies={setMovies} />
      </div>
      <div className="movie-container">
        <div className="row" ref={scrollRef}>
          <MovieList
            movies={movies}
            handleFavoritesClick={addFavoriteMovie}
            // favoriteComponent={AddFavorite}
          />
        </div>
        <div>
          <FavHeading fav="MY FAVORITES" />
        </div>
        <div className="row">
          <MovieList
            movies={favorites}
            handleFavoritesClick={removeFavoriteMovie}
            // favoriteComponent={RemoveFavorite}
          />
        </div>
        <div>
          <Review movies={favorites} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
