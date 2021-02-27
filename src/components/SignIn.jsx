import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  Grid,
  TextField,
  Box,
  Container,
  Paper,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import NavAppBar from "./Navbar";
import Mirage from "@material-ui/core/colors";
import FooterGrid from "./Footer";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { authUser } from './../services/authUser';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#171a29",
    },
  },
  textField: {
    marginTop: "2%",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
    fontWeight: "strong",
  },
  submitButton: {
    backgroundColor: "#171a29",
    marginTop: "12%",
    "&:hover": {
      backgroundColor: "#171a29",
    },
  },
  paper: {
    height: "auto",
    width: "auto",
    padding: "2vw",
  },
  container: {
    marginTop: "2%",
  },
  foodie: {
    marginTop: "2%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  forgetpassword: {
    cursor: "pointer",
    marginLeft: "2px",
  },
  wantToregister: {
    float: "right",
  },
}));

const avatarStyle = { backgroundColor: "black", fontsize: "large" };

const initialState = {
  email: "",
  password: "",
};

export default function SignIn(props) {
  const classes = useStyles();

  const { visible, onClose, Transition } = props;

  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState();

  const changeEmail = (event) => {
    var data1 = { ...userData };
    data1.email = event.target.value;
    setUserData(data1);
  };

  const changePassword = (event) => {
    var data1 = { ...userData };
    data1.password = event.target.value;
    setUserData(data1);
  };

  //  Login Validations
  const validate = (userData) => {
    const errors = {};

    if (!userData.email) {
      errors.email = "Email cant be empty!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email)
    ) {
      errors.email = "Invalid email address";
    }

    //Password Errors
    if (!userData.password) {
      errors.password = "Password can't be empty!";
    } else if (userData.password.length < 6) {
      errors.password = "Password length must be 6 characters.";
    }

    // return errors;
    setErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login data", userData);

    validate(userData);

    console.log("Validation response", errors);

    if (errors === {}) {
      console.log("The resoonse in validation");
      return errors;
    } else {
      //axios call
      loginUser(userData);
    }
  };

  const loginUser = (userData) => {
    //Posting Data to the Server.

  
    const response = authUser(userData,props);
    console.log('Login Response', response)
    /* axios
      .post("http://localhost:5000/user/authenticate", userData) //User Id and User ROle in TOken
      .then((res) => {
        console.log("Login res", res);
        localStorage.setItem("token", res.data.token);

        //Decoding the token and fetching the roles of the loggedIn user.
        var token1 = localStorage.getItem("token", res.data.token);
        var decoded = jwt_decode(token1);
        console.log(decoded);
        console.log("User decode d role", decoded.role);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("userId", decoded.userId);
        // Rendering condition for User and Delivery Executive.
        if ("DE" == decoded.role) {
          props.history.push("/deliverypage");
        } else {
          props.history.push("/profile");
        }
      }); */
  };

  return (
    <div>
      <NavAppBar />
      <Container className={classes.container}>
        <Grid spacing={2}>
          <Grid item container justify="center">
            <Paper className={classes.paper}>
              <div
                style={{ padding: 16, margin: "auto", width: "auto" }}
                className="loginStyle"
              >
                <Box>
                  <Grid align="center">
                    <h4> Sign In</h4>
                  </Grid>

                  <form
                    style={{ width: "500px", marginRight: "2%" }}
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      label="Email"
                      value={userData.email}
                      name="email"
                      placeholder="Enter Email Name"
                      className={classes.textField}
                      onChange={changeEmail}
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.errorMessage}>{errors.email}</div>
                    ) : null}
                    <TextField
                      className={classes.textField}
                      name="password"
                      value={userData.password}
                      onChange={changePassword}
                      label="Password"
                      placeholder="Enter Password"
                      type="password"
                      fullWidth
                    />
                    {errors ? (
                      <div className={classes.errorMessage}>
                        {errors.password}
                      </div>
                    ) : null}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      value="Submit"
                      fullWidth
                      className={classes.submitButton}
                    >
                      Sign In
                    </Button>
                    <Grid item justify="space-between">
                      <p className={classes.foodie}>
                        Forgot Password?
                        <Link
                          to="/forgotpassword"
                          className={classes.forgetpassword}
                        >
                          {"   "} Change Password.
                        </Link>
                        <div className={classes.wantToregister}>
                          Want to register?
                          <Link to="/signup" className={classes.forgetpassword}>
                            Sign Up
                          </Link>
                        </div>
                      </p>
                    </Grid>
                  </form>
                </Box>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <FooterGrid />
    </div>
  );
}
