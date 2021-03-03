import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "31ch",
      marginRight: 28,
    },
    "& .MuiButton-contained": {
      marginLeft: 80,
    },
  },
  reviewButton: {
    padding: 20,
  },
}));

const AddReview = ({ movies, owner }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const createFavorite = (event) => {
    event.preventDefault();
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
        // json.favorite.isUpdating = false;
        // const newFavoriteList = [...favs, movie];
        // setFavs(newFavoriteList);
      });
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {movies.map((movie, index) => (
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.review}>
            <TextField
              id="outlined-multiline-textarea"
              label="Review"
              multiline
              rows={4}
              placeholder={`Leave a review for ${movie.title}...`}
              variant="outlined"
              onchange={handleChange}
            />
          </div>
          <Button
            className={classes.ReviewButton}
            type="Submit"
            variant="contained"
          >
            Leave Review
          </Button>
        </form>
      ))}
    </>
  );
};

export default AddReview;
