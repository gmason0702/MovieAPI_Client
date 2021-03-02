import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const Review = ({ movies }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: "32ch",
      backgroundColor: theme.palette.background.paper,
      display: "inline-block",
      overflowX: "auto!important",
      flexWrap: "nowrap!important",
      marginRight: 35,
    },
    list: {
      overflowX: "auto!important",
      flexWrap: "nowrap!important",
    },
    inline: {
      display: "inline",
    },
  }));

  const classes = useStyles();

  return (
    <>
      {movies.map((movie, index) => (
        <List className={classes.root}>
          <ListItem className={classes.list} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={`Review of: ${movie.title} `}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Gordon Mason
                    {/* {user.name} */}
                  </Typography>
                  {" — freakin loved it"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={`Review of: ${movie.title} `}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Deyonna Martin
                  </Typography>
                  {" — not bad not bad"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Add a review..."
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Username
                  </Typography>
                  {" — Tell us what you thought about this movie..."}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default Review;
