import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { add } from "lodash";
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "200ch",
    },
  },
}));
const HomeComponent = () => {
  const classes = useStyles();
  const [address, setAddress] = useState();
  const [addres_components, setaddres_components] = useState();

  const handleGeoAddress = (event) => {
    //setAddress(event.target.value);
    event.persist();
    const value = event.target.value;
    setAddress(value);
  };

  const getCurrentLocation = () => {
    console.log("In current location");
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("Possition:", position);
        getUserAddressByLatitudeAndLongitude(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      function (error) {
        alert("The Locator was denied, Please add your address manually");
      }
    );
  };
  const getUserAddressByLatitudeAndLongitude = (latitude, longitude) => {
    console.log("In latitude and Longitude", latitude + " " + longitude);
    //queryParameter for APi.
  /*   const latlng = {
      lat: latitude,
      lng: longitude,
    }; */
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key= AIzaSyD1R9Z7TR31k1Gl0i0xOD_nWf9_RLYalmI`
      )
      .then((result) => {
      //  console.log("Latitude and Longitude:", latlng);
        console.log("Result:====", result.data);

        //state,city, pin ,country
        const address_components = result.data.results[0].address_components.map(
          (name) => {
            return name.long_name;
          }
        );
        setaddres_components(address_components);

        console.log("address_components:====", address_components);

        if (result.data.results[0].formatted_address === "")
          localStorage.removeItem("location");
        else
          localStorage.setItem(
            "location",
            result.data.results[0].formatted_address
          );
        setAddress(result.data.results[0].formatted_address);
        //   fetchRestByLocation(latlng);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("Adresss Setted:", address);
  return (
    <div>
      <button onClick={getCurrentLocation}>Click here</button>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          name="address"
          placeholder="Enter Delivery Address"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={address}
          onChange={handleGeoAddress}
        />
        <MyLocationIcon onClick={getCurrentLocation} />
        {addres_components != null
          ? addres_components.map((item, index) => {
              return (
                <>
                  <p>{item} </p>
                  {/*   <p>{index === 0 ? <p>City : {item}</p> : null}</p>
              <p>{index === 1 ? <p> : {item}</p> : null}</p>
              <p>{index === 0 ? <p>City : {item}</p> : null}</p>
              <p>{index === 0 ? <p>City : { item}</p>: null}</p> */}
                </>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default HomeComponent;
