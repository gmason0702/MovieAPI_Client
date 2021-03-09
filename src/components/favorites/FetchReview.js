import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "../../App.css";
import CommentIcon from "@material-ui/icons/Comment";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    background: "rgba(38, 104, 103, 0.2)",
    marginRight: 8,
    marginLeft: 3,
    borderRadius: 15,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  listItem: {
    marginLeft: 10,
  },
}));

const FetchReview = ({ movies, fetchFavorites }) => {
  const classes = useStyles();

  return (
    <>
      {movies.map((movie, index) => (
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <CommentIcon />
            <ListItemText
              className="listItem"
              primary={movie.review}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default FetchReview;
