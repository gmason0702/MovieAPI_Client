import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../../Config";
import MovieList from "./MovieList";
// import AddFavorite from "../favorites/AddFavorite";
// import RemoveFavorite from "../favorites/RemoveFavorite";
import FavHeading from "../favorites/FavHeading";
import Search from "../home/Search";
// import Review from "../favorites/Review";
import SideScroll from "../SideScroll";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "../favorites/AddReview";

import Heading from "./Heading";
import Logo from "../../assets/logo.png";
let page = 1;
const HomePage = ({ logout, token }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [id, setId] = useState(0);
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
    console.log({ movie });
    fetch("http://localhost:3000/favorite/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        favorite: {
          review: review,
          rating: rating,
          movieId: movie.id,
          // movieTitle: movie.movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          rating: movie.rating,
          voteAverage: movie.vote_average,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setReview("");
        setRating("");
        setId(json.id);
        console.log(json.id);
        // setMovieId("");
      });
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
          <MovieList movies={movies} handleFavoritesClick={addFavoriteMovie} />
        </div>
        <div>
          <FavHeading fav="MY FAVORITES" />
        </div>

        <div className="row">
          <MovieList
            id={id}
            movies={favorites}
            handleFavoritesClick={removeFavoriteMovie}
          />
        </div>
        {/* <div>
          <Review movies={favorites} />
        </div> */}
        <div className="row">
          {favorites.length > 0 ? (
            <AddReview id={id} token={token} movies={favorites} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;