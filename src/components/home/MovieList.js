import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IMAGE_URL } from "../../Config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
    overflowX: "auto",
    flexWrap: "nowrap",
    margin: 5,
    backgroundColor: "#1a4645",
    marginBottom: 20,
  },
  media: {
    textAlign: "center",
    height: 400,
    maxHeight: 500,
    paddingTop: "56.25%", // 16:9
    margin: 10,
  },
  fav: {
    color: red[500],
  },
  title: {
    textAlign: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  vote: {
    display: "inline-block",
    padding: 10,
    alignItems: "center",
    textAlign: "center",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const MovieList = ({ movies, handleFavoritesClick }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {movies.map((movie, index) => (
        <Card key={index} className={classes.root}>
          <CardHeader className={classes.title} title={movie.title} />
          <Typography>
            <Link href={`/movie/${movie.id}`}></Link>
          </Typography>
          <CardMedia
            movieId={movie.id}
            className={classes.media}
            image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
            title={movie.title}
          />
          <CardActions disableSpacing>
            <IconButton className={classes.fav} aria-label="add to favorites">
              <FavoriteIcon onClick={() => handleFavoritesClick(movie)} />
            </IconButton>
            <Typography
              className={`tag ${setVoteClass(movie.vote_average)}`}
              paragraph
            >
              {movie.vote_average}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Release Date: {movie.release_date}
              </Typography>
              <br />
              <Typography paragraph>{movie.overview}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
};

export default MovieList;
