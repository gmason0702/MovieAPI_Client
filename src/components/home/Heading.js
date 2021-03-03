import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  logoIcon: {
    height: 100,
    width: 100,
    padding: 10,
    // marginLeft: 10,
  },
  title: {
    display: "flex",
    justifyContent: "end",
  },
  logoutButton: {
    marginTop: "2rem",
    marginRight: "2rem",
  },
}));
const Heading = ({ heading, title, logo, logout }) => {
  const classes = useStyles();

  return (
    <>
      <div className="col title">
        <h1 className={classes.title}>{title}</h1>
      </div>
      <div>
        <Button
          className={classes.logoutButton}
          onClick={logout}
          variant="contained"
        >
          Logout
        </Button>
      </div>
      <div>
        <img className={classes.logoIcon} src={logo} alt="logo" />
      </div>
    </>
  );
};

export default Heading;
