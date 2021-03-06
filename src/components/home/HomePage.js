import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../../Config";
import MovieList from "./MovieList";
import FavHeading from "../favorites/FavHeading";
import Search from "../home/Search";
import SideScroll from "../SideScroll";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "../favorites/AddReview";
// import DisplayReview from "../favorites/DisplayReview";
import Heading from "./Heading";
import Logo from "../../assets/logo.png";
import APIURL from "../../helpers/environment";
let page = 1;

const HomePage = ({ logout, token }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [movieId, setMovieId] = useState(0);

  const [id, setId] = useState(0);
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
    fetch(`${APIURL}/favorite/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        favorite: {
          review: review,
          personalRating: rating,
          movieId: movie.id,
          movieTitle: movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setReview("");
        setRating(0);

        setId(json.id);
        console.log(json.id);
      });
  };

  const fetchFavorites = () => {
    console.log(token);
    fetch(`${APIURL}/favorite/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFavorites(data);
      });
  };

  const removeFavoriteMovie = (movie, id) => {
    console.log(movie);
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.id !== movie.id
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);

    console.log(newFavoriteList);
    fetch(`${APIURL}/favorite/delete/${movie.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",

        Authorization: token,
      }),
    }).then(() => fetchFavorites());
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
        {/* <DisplayReview /> */}
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
