import React, { useState } from "react";

import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  Box,
  CssBaseline,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import Form from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
/* import * as Yup from "yup"; */

const CustomRadio = withStyles({
  root: {
    color: "#171a29",
    "&$checked": {
      color: "#171a29",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const CustomCheckbox = withStyles({
  root: {
    color: "#171a29",
    "&$checked": {
      color: "#171a29",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "2%",
  },
}));

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  birthDate:"",
  password: "",
  role: "user",
  vehicleNumber: "",
  location: "",
  activityStatus: "",
  nameError: "",
  emailError: "",
  passwordError: "",
  phoneError: "",
  gender: "male",
};

export default function SignUp() {
  const classes = useStyles();

  const [data, setData] = useState(initialState);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const changeFirstName = (event) => {
    var data1 = { ...data };
    data1.firstname = event.target.value;
    setData(data1);
    console.log("firstname", data);
  };
  const changeLastName = (event) => {
    var data1 = { ...data };
    data1.lastname = event.target.value;
    setData(data1);
    console.log("lastname", data);
  };
  const changeEmail = (event) => {
    var data1 = { ...data };
    data1.email = event.target.value;
    setData(data1);
    console.log("email", data);
  };
  const changePassword = (event) => {
    var data1 = { ...data };
    data1.password = event.target.value;
    setData(data1);
    console.log("password", data);
  };
  const changePhone = (event) => {
    var data1 = { ...data };
    data1.phone = event.target.value;
    setData(data1);
    console.log("phone", data);
  };
  const changeGender = (event) => {
    var data1 = { ...data };
    data1.gender = event.target.value;
    console.log("gender", data1.gender);
    setData(data1);
  };
  const changeVehicleNumber = (event) => {
    var data1 = { ...data };
    data1.vehicleNumber = event.target.value;
    console.log("vehicle No", data1.vehicleNumber);
    setData(data1);
  };
  const checkLocation = (event) => {
    var data1 = { ...data };
    data1.location = event.target.value;
    console.log("location No", data1.location);
    setData(data1);
  };
  const changeActivityStatus = (event) => {
    var data1 = { ...data };
    data1.activityStatus = event.target.value;
    console.log("activity status No", data1.activityStatus);
    setData(data1);
  };

  const changeBirthDate = (event) => {
    var data1 = { ...data };
    data1.birthDate = event.target.value;
    console.log("activity status No", data1.birthDate);
    setData(data1);
  }

  const validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let phoneError = "";

    if (data.firstname.length < 5 || data.firstname.length > 20) {
      firstNameError = " Name should be greater than 5 and less than 20";
    }
    if (data.lastname.length < 5 || data.lastname.length > 20) {
      lastNameError = " Name should be greater than 5 and less than 20";
    }
    if (data.phone.length < 10 || data.phone.length > 10) {
      phoneError = " 10 number required";
    }
    if (data.password.length < 5 || data.password.length > 20) {
      passwordError = " password should be greater than 8";
    }

    if (!data.email.includes("@") || !data.email.includes(".")) {
      emailError = "invalid Email";
    }
    if (
      emailError ||
      firstNameError ||
      lastNameError ||
      passwordError ||
      phoneError
    ) {
      this.setState({
        emailError,
        firstNameError,
        lastNameError,
        passwordError,
        phoneError,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("onsubmit");
    console.log("onsubmit checked", checked);
    const isValid = { validate };
    let registerUserObj;
    if (checked) {
      
      registerUserObj = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        vehicleNumber: data.vehicleNumber,
        location: data.location,
        activityStatus: data.activityStatus,
        gender: data.gender,
        birthDate: data.birthDate,
      };
    } else {
      registerUserObj = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
        location: data.location,
        gender: data.gender,
        birthDate: data.birthDate,
      };
      console.log(registerUserObj);
    }
  };
  /* Display feilds for delivery executive */

  const radioYes = checked ? (
    <div>
      <TextField
        className={classes.textField}
        label="vehicleNumber"
        value={data.vehicleNumber}
        onChange={changeVehicleNumber}
        type="number"
        placeholder="Ente r  Vehicle Number"
        fullWidth
        required
        /*   onChange={this.changeVehicleNumber} value={this.state.vehicleNumber} */
      />

      <TextField
        className={classes.textField}
        value={data.location}
        onChange={checkLocation}
        label="Location"
        placeholder="Enter Location"
        fullWidth
        required
        /* onChange={this.changeLocation} value={this.state.location} */
      />
      <TextField
        className={classes.textField}
        value={data.activityStatus}
        onChange={changeActivityStatus}
        label="Activity Status"
        type="boolean"
        placeholder="Activity Status"
        fullWidth
        required
        /*  onChange={this.changeActivityStatus} value={this.state.activityStatus} */
      />
    </div>
  ) : null;

  return (
    <div>
      <div style={{ padding: 16, margin: "auto", width: "auto" }}>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Sign Up Form
        </Typography>

        <form style={{ width: "500px", marginRight: "2%" }} onSubmit={handleSubmit}>
          <TextField
            label="FirstName"
            value={data.firstname}
            name="firstname"
            placeholder="Enter First Name"
            className={classes.textField}
            onChange={changeFirstName}
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            value={data.lastname}
            name="lastname"
            label="LastName"
            placeholder="Enter Last Name"
            onChange={changeLastName}
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            label="Email"
            name="email"
            value={data.email}
            onChange={changeEmail}
            placeholder="Enter Email"
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            value={data.phone}
            name="phone"
            onChange={changePhone}
            label="Phone Number"
            type="number"
            placeholder="Enter Phone Number"
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            name="password"
            value={data.password}
            onChange={changePassword}
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
          />

          <TextField
            className={classes.textField}
            label="Birthdate"
            value={data.birthDate}
            onChange={changeBirthDate}
            name="birthdate"
            type="date"
            style={{ paddingTop: "4%" }}
            fullWidth
            required
          />

          <Box>
            <RadioGroup
              aria-label="gender"
              name="gender"
              row
              // value={value}
              // onChange={handleChange}
            >
              <span style={{ marginTop: "2%", marginRight: "2%" }}>
                Gender:
              </span>
              <FormControlLabel
                value="female"
                checked={data.gender === "female"}
                onChange={changeGender}
                control={<CustomRadio />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                checked={data.gender === "male"}
                onChange={changeGender}
                control={<CustomRadio />}
                label="Male"
              />
            </RadioGroup>
          </Box>

          <Box>
            <span style={{ marginTop: "2%", marginRight: "2%" }}>
              {" "}
              Do you wish to work as Delivery Executive?
            </span>
            <FormControlLabel
              control={
                <CustomCheckbox
                  value="delivery"
                  checked={checked}
                  onChange={handleChange}
                />
              }
            />
          </Box>

          <div> {radioYes} </div>

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
      </div>
    </div>
  );
}
