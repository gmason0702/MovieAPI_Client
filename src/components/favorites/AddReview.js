import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "31ch",
      marginRight: 28,
    },
    "& .MuiButton-contained": {
      marginLeft: 75,
    },
  },
  reviewButton: {
    padding: 20,
  },
  Rating: {
    paddingLeft: 72,
    marginBottom: 10,
  },
}));

const AddReview = ({ movies, token, favorite, id }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
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
        setReview("");
        setRating(0);
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
              name="half-rating"
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
          >
            Leave Review
          </Button>
        </form>
      ))}
    </>
  );
};

export default AddReview;
