/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, Drawer, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  address: {
    // border: "1px solid grey",
    marginLeft: "20%",
    marginTop: "10%",
    // width: "40vw",
    "& > *": {
      width: "40vw",
    },
  },

  textField: {
    margin: "2%",
    width: "25vw",
  },
  addTocart: {
    color: "white",
    backgroundColor: "rgb(23,26,41)",
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "3%",
    marginTop: "2%",
    float: "left",
    "&:hover": {
      backgroundColor: "rgb(23,26,41)",
    },
  },
  addressTitle: {
    fontSize: "25px",
    marginBottom: "12px",
  },
});

const DrawerExample = (props) => {
  const classes = useStyles();

  const { open, close, onSubmitData /* , address, setAddress */ } = props;
  const [data, setData] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    const key = event.target.name;
    const value = event.target.value;
    setData((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };
  return (
    <>
      <Drawer
        open={open}
        onClose={close}
        anchor="left"
        transitionDuration={{ enter: 1000, exit: 30000 }}
      >
        <div className={classes.address}>
          <form onSubmit={() => onSubmitData(data, event)}>
            <Typography
              variant="body2"
              component="p"
              className={classes.addressTitle}
              style={{ margin: "10px 10px 2px 10px" }}
            >
              Address:
            </Typography>
           {/*  <TextField
              id="phoneNo"
              name="phoneNo"
              label="Contact Number"
              className={classes.textField}
              type="tel"
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              id="FlatNo"
              name="FlatNo"
              label="Flat No"
              className={classes.textField}
              onChange={handleInputChange}
              // value={inputs.aptName}
              //  helperText={aptError}
              // error={aptError ? true : false}
              fullWidth
              required
            /> */}
            <br />
            {/* <TextField
              id="locality"
              name="locality"
              label="Locality"
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
              required
            /> */}
            <br />
            <TextField
              id="street"
              name="streetAddress"
              label="Street"
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              id="landmark"
              name="landmark"
              label="landmark"
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              id="area"
              name="area"
              label="Area"
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <br />
            <TextField
              id="city"
              name="city"
              label="City"
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
              required
            />{" "}
            <br />
            <TextField
              id="zipCode"
              name="zip"
              label="Zip Code"
              className={classes.textField}
              onChange={handleInputChange}
              type="number"
              fullWidth
              required
            />
            <br />
            <TextField
              id="state"
              name="state"
              label="State"
              className={classes.textField}
              onChange={handleInputChange}
              type="text"
              fullWidth
              required
            /><br/>
            <TextField
              id="country"
              name="country"
              label="Country"
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <br />
            <Button
              className={classes.addTocart}
              variant="contained"
              type="submit"
            >
              submit
            </Button>
          </form>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerExample;
