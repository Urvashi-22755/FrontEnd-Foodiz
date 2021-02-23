import React from "react";
import { Avatar, Button, Grid, TextField, Box } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode"; 

const initialValue = {
  username: "",
  password: "",
  remember: false,
};

const useStyles = makeStyles((theme) => ({
    textField: {
      margin: "2%",
    },
  }));

const avatarStyle = { backgroundColor: "black", fontsize: "large" };
/* 
const validationSchema = Yup.object().shape({
    username: Yup.string().email('Please Enter a Valid Email').required('Compulsory Field'),
    password: Yup.string().required('Compulsory Field')
}) */
/* const onSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
    console.log(props);
} */

const initialState = {
  email: "",
  password: ""
};

function SignIn( props ) {
    const classes = useStyles();


  const [userData, setUserData] = useState(initialState);
  const changeEmail=(event)=>
  {
        var data1 = { ...userData };
    data1.email = event.target.value;
    setUserData(data1);
  }

  const changePassword=(event)=>
  {
        var data1 = { ...userData  };
    data1.password = event.target.value;
    setUserData(data1);
  }

  const handleSubmit=(event)=>
  {
    event.preventDefault();
    console.log('login data', userData)
   
      //axios call
      setUserLogin(userData)
    }

    const setUserLogin = (userData) => {
         //Posting Data to the Server.
 
      axios.post("http://localhost:5000/user/authenticate", userData)//User Id and User ROle in TOken
        .then((res) => {
            console.log('Login res',res);
         localStorage.setItem("token", res.data.token);
        

        //Decoding the token and fetching the roles of the loggedIn user.
            var token1=(localStorage.getItem("token",res.data.token))
            var decoded = jwt_decode(token1);
            console.log(decoded);
            console.log('User decode d role', decoded.role);
            localStorage.setItem("role", decoded.role);
            localStorage.setItem("userId", decoded.userId)
        // Rendering condition for User and Delivery Executive.
        if ("DE" == decoded.role) {
          props.history.push("/deliverypage");
        } else {
          props.history.push("/profile");
        }
      });
    }

    return (
        <div className="loginStyle">
      <Box>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonIcon />
          </Avatar>
          <h2> Sign In</h2>
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
            required
          />
          <TextField
            className={classes.textField}
            name="password"
            value={userData.password}
            onChange={changePassword}
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            value="Submit"
            style={{ backgroundColor: "#171a29", marginTop: "12%" }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
        </div>
    )
}

export default withRouter(SignIn);
