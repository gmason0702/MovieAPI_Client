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

const AddReview = ({ movies, token, favorite, userFilm }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/favorite/update/${favorite.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        favorite: {
          review: review,
          rating: rating,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setReview("");
        setRating("");
      });
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setReview(event.target.value);
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
              onChange={(e) => handleChange(e)}
              //   value={value}
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
