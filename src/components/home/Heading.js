import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
}));
const Heading = ({ heading, title, logo }) => {
  const classes = useStyles();

  return (
    <>
      <div className="col title">
        <h1 className={classes.title}>{title}</h1>
      </div>
      <div>
        <img className={classes.logoIcon} src={logo} alt="logo" />
      </div>
    </>
  );
};

export default Heading;
