import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  FormField,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Login = ({ handleChange, updateToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  let handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({ user: { email: email, password: password } }),
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
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form>
          <TextField
            label="Email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="Submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            required
          >
            Sign in
          </Button>
          <Typography>
            {" "}
            Do you have an account ?
            <Link href="#" onClick={() => handleChange("event", 1)}>
              Sign Up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
