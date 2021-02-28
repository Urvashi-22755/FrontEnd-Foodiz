import React from "react";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Box,
  Container,
  Paper,
} from "@material-ui/core";

import axios from "axios";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";

import NavAppBar from "./Navbar";

import FooterGrid from "./Footer";
import { Redirect } from "react-router-dom";

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
  checkOtp: {
    backgroundColor: "#171a29",
    marginTop: "5%",
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
}));

const avatarStyle = { backgroundColor: "black", fontsize: "large" };

const initialState = {
  email: "",
  newPassword: "",
  otp: "",
  confirmPassword: "",
};

export default function ForgotPassword(props) {
  const classes = useStyles();

  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState();
  const [otp, setOtp] = useState(false);
  const [newPass, setnewPass] = useState(false);
  const [flag, setFlag] = useState(0);
  const [resOtp, setResOtp] = useState();


  const handleChange = (event) => {
    event.persist();
    const key = event.target.name;
    const value = event.target.value;
    setUserData((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };

  //set otp feild true
  const handleOtpAndPassword = async (event) => {
    event.preventDefault();
    let res;

    //send otp to email
    if (flag === 0) {
      setOtp(true);
      setFlag((flag) => flag + 1);
      res = await axios.post(
        "http://localhost:5000/user/sendotpforforgotpassword",
        { email: userData.email }
      );

      if (res.data.forgotPasswordOtp) {
        setResOtp(res.data.forgotPasswordOtp);
        setErrors(res.data.message);
        console.log(res.data.forgotPasswordOtp);
      }
    }

    //if otp matched then
    if (userData.newPassword !== "" && userData.confirmPassword !== "") {
      console.log("both not empty");

      if (userData.newPassword == userData.confirmPassword) {
        console.log("both are SAME  ");

        try {
          let resetPassword = await axios.post(
            "http://localhost:5000/user/resetPassword",
            { email: userData.email, newPassword: userData.newPassword }
          );

          console.log("Response of reset password call", resetPassword);
          setErrors("Password has been reseted successfully!");
          //props.history.push("/");
        } catch (e) {
          if (e.response && e.response.data) {
            console.log(e.response.data.message); // some reason error message
          }
        }
      }
    } else {
      //setErrors("Please enter correct password.");
    }
  };

  //open new feilds for changing password
  const handleNewPassword = (event) => {
    event.preventDefault();

    if (userData.otp) {
      console.log("in otp method", userData.otp);
    }

    if (userData.otp === resOtp) {
      console.log("OTP matched!");
      setOtp(false);
      setnewPass(true);
    } else {
      console.log("Otp did not matched");
    }
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
                    <h4>Change Password</h4>
                  </Grid>

                  <form
                    style={{ width: "500px", marginRight: "2%" }}
                    onSubmit={handleOtpAndPassword}
                  >
                    <TextField
                      label="Email"
                      name="email"
                      placeholder="Enter Email to get OTP."
                      className={classes.textField}
                      onChange={handleChange}
                      disabled={otp ? true : false}
                      fullWidth
                    />
                    {errors ? (
                      <div style={{ color: "green", marginTop: "1%" }}>
                        {" "}
                        {errors}
                      </div>
                    ) : null}

                    {otp ? (
                      <Box display="flex" flexDirection="row">
                        <TextField
                          label="OTP"
                          value={userData.Otp}
                          name="otp"
                          type="text"
                          placeholder="Enter Otp to get OTP."
                          className={classes.textField}
                          onChange={handleChange}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          value="Submit"
                          onClick={handleNewPassword}
                          className={classes.checkOtp}
                        >
                          check
                        </Button>
                      </Box>
                    ) : null}

                    {newPass ? (
                      <>
                        <TextField
                          label="New Password"
                          name="newPassword"
                          type="text"
                          placeholder="Enter New Password"
                          className={classes.textField}
                          onChange={handleChange}
                          fullWidth
                        />
                        <TextField
                          label="Confirm Password"
                          name="confirmPassword"
                          type="text"
                          placeholder="Enter Confirm Password"
                          className={classes.textField}
                          onChange={handleChange}
                          fullWidth
                        />
                      </>
                    ) : null}

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      value="Submit"
                      fullWidth
                      className={classes.submitButton}
                    >
                      {flag === 0 ? "Send OTP" : "Change Password"}
                    </Button>

                    {errors ? (
                      <div style={{ color: "green", marginTop: "1%" }}>
                        {" "}
                        {errors}
                      </div>
                    ) : null}
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
