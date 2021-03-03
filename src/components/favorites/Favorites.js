import React from "react";
import MovieList from "../home/HomePage";
import styled from "styled-components";

const StyledContainer = styled.div``;

const Favorites = ({ movies, favorites, userFavorite }) => {
  const [favs, setFavs] = useState([]);

  //create favorite
  const createFavorite = (review, rating, owner, movie) => {
    fetch("http://localhost:3000/favorite/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite: {
          review: review,
          rating: rating,
          owner: owner, //not sure
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.favorite);
        json.favorite.isUpdating = false;
        const newFavoriteList = [...favs, movie];
        setFavs(newFavoriteList);
      });
  };

  //get all favorites
  useEffect(() => {
    fetch("http://localhost:3000/favorite/")
      .then((response) => response.json())
      .then((data) => {
        data.favs.map((f) => (f.isUpdating = false));
        if (data.favs) {
          setFavorites(data.favs);
          console.log(data.favs);
        }
      });
  }, []);

  const updateFavorites = () => {
    console.log(userFavorite.id, review, rating);
    fetch(`http://localhost:3000/favorite/update/${userFavorite.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: review,
        rating: rating,
      }),
    });
  };

  const deleteFavorite = (id) => {
    fetch(`http://localhost:3000/favorite/delete/${id}`, { method: "DELETE" });
  };

  return (
    <StyledContainer>
      <MovieList createFavorite={createFavorite} />
      {favs.map((fav) => {
        return (
          <div key={fav.review}>
            <h3>{fav.rating}</h3>
            <h4>{fav.owner}</h4>
            <button onClick={() => setUserFav(fav)}>Details</button>
          </div>
        );
      })}
    </StyledContainer>
  );
};

export default Favorites;
