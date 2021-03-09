import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { Rating } from "@material-ui/lab";
import APIURL from "../../helpers/environment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "19.5ch",
      marginRight: 23,
    },
    "& .MuiButton-contained": {
      marginLeft: 35,
    },
  },
  reviewButton: {
    padding: 20,
  },
  Rating: {
    paddingLeft: 29,
    marginBottom: 10,
  },
}));

const AddReview = ({
  movies,
  token,
  favorite,
  id,
  fetchFavorites,
  favorites,
  inReview,
}) => {
  const classes = useStyles();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (event, favorite) => {
    event.preventDefault();
    fetch(`${APIURL}/favorite/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        favorite: {
          review: review,
          rating: Number(rating),
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setReview();
        setRating();
        fetchFavorites();
      });
  };

  return (
    <>
      {movies.map((movie, index) => (
        <form
          key={index}
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <div className={classes.review}>
            <TextField
              id="outlined-multiline-textarea"
              label="Leave a review"
              multiline
              rows={4}
              placeholder={`Leave a review for ${movie.title}...`}
              variant="outlined"
              onChange={(e) => setReview(e.target.value)}
              review={review}
            />
          </div>
          <div className={classes.Rating}>
            <Rating
              defaultValue={2}
              size="large"
              onChange={(e) => setRating(e.target.value)}
              rating={rating}
            />
          </div>
          <Button
            className={classes.ReviewButton}
            type="Submit"
            variant="contained"
            onClick={() => {
              alert(`Review added for ${movie.title}!`);
              console.log(movie.movieId);
            }}
          >
            Leave Review
          </Button>
        </form>
      ))}
    </>
  );
};

export default AddReview;
