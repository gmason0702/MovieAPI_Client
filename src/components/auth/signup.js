import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import APIURL from "../../helpers/environment";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  signupButton: {
    padding: 5,
    marginTop: 20,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Signup = ({ updateToken }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "darkblue" };

  let handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          username: username,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateToken(data.sessionToken);
      });
  };

  return (
    <Grid onSubmit={handleSubmit}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {" "}
            <AddCircleOutlineOutlinedIcon />{" "}
          </Avatar>
          <h2 style={headerStyle}>Sign Up </h2>
          <Typography variant="caption">
            Please fill this form to create a account
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter Email"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            fullWidth
            label="Username"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            type="password"
            fullWidth
            label="Password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            fullWidth="true"
            className={classes.signupButton}
            type="Submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default Signup;
