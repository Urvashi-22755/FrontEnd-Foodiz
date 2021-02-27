import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Container,
  Box,
  Checkbox,
  Paper,
  FormControlLabel,
  Button,
  TextField,
  Chip,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SearchBar from "../components/SearchBar";
import RestaurantItems from "../components/RestaurantItems";
import foodData from "../data/FoodData";
import NavAppBar from "../components/Navbar";
import FooterGrid from "../components/Footer";
import Carousels from "../components/Carousels";
import StarRateIcon from "@material-ui/icons/StarRate";
import RestaurantInfoCarausal from "./../components/RestaurantInfoCarausal";
import EcoIcon from "@material-ui/icons/Eco";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import axios from "axios";
/* caraausaal data */
import images from "../data/RestCarausalData";

import { getRestaurantById } from "../services/axiosData";
import SimpleRating from "../components/Rating";

const GreenCheckbox = withStyles({
  root: {
    color: "#171a29",
    "&$checked": {
      color: "#171a29",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 12,
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  restBack: {
    // marginTop: "3%",
    height: "40vh",
    width: "100%",
    backgroundColor: "#171a29",
    marginTop: "-2%",
  },
  imgContainer: {
    //marginTop: "20px",
    width: "97%",
    height: "100%",
  },
  control: {
    padding: theme.spacing(),
  },
  restDetails: {
    marginLeft: "70px",
    color: "black",
    marginBottom: "2%",
  },
  restDetailRating: {
    paddingRight: "8px",
    //border: "1px solid black",
    marginTop: "1rem",
  },
  restDetailRatingDiv: {
    marginRight: "1.5rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
  },
  typographyDetails: {
    letterSpacing: "1px",
    fontFamily: "ProximaNova,Arial,Helvetica Neue,sans-serif",
    paddingTop: "5px",
    lineHeight: "1.2",
  },
  random: {
    width: "200px",
    height: "200px",
  },
  orderbox: {
    marginTop: "5%",
    marginBottom: "5%",
    height: "auto ",
    backgroundColor: "white",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  grid1: {
    backgroundColor: "#171a29",
    color: "white",
  },
  grid2: {
    backgroundColor: "white",
    color: "#171a29",
  },
  checkBoxStyle: {
    float: "right",
  },
  rating: {
    marginTop: "5%",
    width: "60px",
    backgroundColor: "#48c479",
    color: "white",
  },
  vegSection: {
    width: "auto",
    height: "40px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.22)",
    padding: "5px",
  },
  editHeading:{
    textAlign:"center",
    
  },
  addRating:{
    fontWeight:'bold',
    fontSize:"20px",
    color:"#171a29"
  },
  ratingDialog:{
    padding:"20px"
  },
  addRatingBtn:{
    color:"#171a29",
    fontWeight:'bold',
    cursor:"pointer"
  }
}));

const RestaurantContainer = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [vegChecked, setvegChecked] = useState(false);
  const allVeg = items.every((item) => item.type === "veg");
  const data = foodData();
  const [restaurantData, setRestaurant] = useState({});
  const [open, setOpen] = useState(false);
  const [ratings,setRatings] = useState({});


  /* const getRestaurant = async () => {
    console.log(props.match.params.restaurantId);
    const res = await axios(
      "http://localhost:5000/restaurant/getrestaurantbyid/" +
        props.match.params.restaurantId
    );
    setRestaurant(res.data);
    setItems(res.data.menuDetails);
  } */

  //rating modal open
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("hello above effect");
  useEffect(() => {
    (async function () {
      const res = await getRestaurantById(props.match.params.restaurantId);
      console.log("method response", res);
      setRestaurant(res);
      setItems(res.menuDetails);
    })();

  }, []);


  //filter based on  search
  const handleSearch = (value) => {
    let filteredItems = items?.filter((search) => {
      return (
        search.foodDescription.toLowerCase().includes(value) ||
        search.foodName.toLowerCase().includes(value)
      );
    });
    setItems(filteredItems);
    /*   if (vegChecked === true && value !== "") {
      let filteredItemsVeg = items.filter((search) => {
        return (
          (search.type === "veg" &&
            search.description.toLowerCase().includes(value)) ||
          search.title.toLowerCase().includes(value)
        );
      });
    //  console.log("filteredItemsVeg", filteredItemsVeg);
      setItems(filteredItemsVeg);
    } else if (value !== "") {
      setItems(filteredItems);
    } else setItems(data); */
  };

  //filter based on veg-only..
  const handleChange = (event) => {
    
    console.log("value:", event.target.value);
    // if (vegChecked === true) {
    //   setvegChecked(false);
    //   setItems(data);
    // } else {
    //   setvegChecked(true);

    //   let filter = data.filter((d) => d.type === event.target.value);
    //   // console.log("veg data", filter);
    //   // console.log(event.target.value);
    //   setItems(filter);

    //   //console.log("filter [0] - ", filter);
    // }
  };

  const handleSubmitOfRating = (ratingData,event) => {
    event.preventDefault();
    setRatings(ratingData);
    console.log("rating data in parent container statess",ratings);

    console.log('resdt id', restaurantData._id)

  }

  return (
    <>
      <NavAppBar></NavAppBar>
     
      <Container>
        <Grid container className={classes.orderbox}>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={1}
            className={classes.grid1}
          ></Grid>
          <Grid
            container
            item
            xs={10}
            s={10}
            md={10}
            lg={11}
            className={classes.grid2}
          >
            <Grid item xs={12} s={12} md={5} lg={6}>
              <div className={classes.restDetails}>
                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  style={{ fontStyle: "bolder" }}
                  className={classes.typographyDetails}
                >
                  {/*   Id is : {match.params.id} */}
                  <br />
                  {restaurantData.restaurantName}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#171A29" }}
                  component="body2"
                  className={classes.typographyDetails}
                >
                  {
                    <div>
                     
                     

                        {restaurantData?.restaurantCategory?.map((cat,index) => {
                            return (
                              
                                cat ? <><Chip variant="outlined" size="small" label={cat} /> </>:  "No Categories defined"
                              
                              
                            )

                        })}
                    </div>
                  }
                </Typography>

                <Typography
                  variant="body2"
                  className={classes.typographyDetails}
                  style={{ color: "#171A29" }}
                >
                    


                  {restaurantData.restaurantDescription}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  className={classes.typographyDetails}
                  style={{ color: "#171A29" }}
                >
                  {/* <b>Address</b>: */}
                  {restaurantData?.restaurantLocation?.streetAddress +
                    "," +
                    restaurantData?.restaurantLocation?.area +
                    "," +
                    restaurantData?.restaurantLocation?.landmark +
                    "," +
                    restaurantData?.restaurantLocation?.city +
                    "," +
                    restaurantData?.restaurantLocation?.state +
                    "," +
                    restaurantData?.restaurantLocation?.country}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.typographyDetails}
                  color="#171A29"
                >
                  Call: {restaurantData?.restaurantMobileNumber}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.typographyDetails}
                  color="#171A29"
                >
                  Dine-In Timing: {restaurantData?.workingHours?.start} AM to{" "}
                  {restaurantData?.workingHours?.end} PM
                </Typography>
                <Box
                  display="flex"
                  direction="row"
                  className={classes.restDetailRating}
                >
                  <div className={classes.restDetailRatingDiv}>
                    <p className={classes.rating}>
                      <StarRateIcon /> {parseFloat(restaurantData.rating_avg).toFixed(1)}
                    </p>
                  </div>

                  <div className={classes.restDetailRatingDiv}>
                    <b>Rs. {restaurantData.restaurantCostForTwo}</b>
                    <br />
                    Costs for Two
                  </div>
                  <div className={classes.restDetailRatingDiv}> <p onClick={handleClickOpen} className={classes.addRatingBtn}>Add Rating</p></div>
                 
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                   
                  >
                    <DialogTitle className={classes.editHeading}>
                     <p  className={classes.addRating}>Add Rating</p> 
                    </DialogTitle>
                  
                    <DialogContent  className={classes.ratingDialog}>
                    <SimpleRating handleSubmitOfRating={handleSubmitOfRating}    onClose={handleClose}/> {console.log('Value of stars',ratings)}
                    </DialogContent>
                  
                  </Dialog>
                </Box>
              </div>
            </Grid>
            {/* ImageSEction */}
            <Grid item xs={12} sm={12} md={7} lg={6}>
              <Box className={classes.imgContainer}>
                {/*Rest caaarausala for images */}
                <RestaurantInfoCarausal
                  images={restaurantData?.restaurantImages}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container direction="row" style={{ marginTop: 40 }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={3}
            md={3}
            style={{ marginTop: 20, marginLeft: "80", paddingLeft: 10 }}
          >
            <SearchBar page="items" handleSearch={handleSearch} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            style={{
              paddingLeft: "50px",
            }}
            lg={6}
            md={6}
          >
            <Typography
              gutterBottom
              variant="h5"
              noWrap
              style={{ textAlign: "center" }}
            >
              Why starve when you have us&nbsp;&nbsp;
              <span role="img" aria-label="fries" style={{ fontSize: 40 }}>
                🍟
              </span>
            </Typography>
            <Typography variant="body1" noWrap style={{ textAlign: "center" }}>
              Order from wide varieties of different available Items below
            </Typography>
            <br />
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            lg={3}
            md={3}
            style={{
              marginTop: 20,
              right: "10px",
            }}
          >
            <div className={classes.checkBoxStyle}>
              {console.log(
                "veg irem check",
                items.every((item) => item.type === "veg")
              )}
              {allVeg ? (
                <Paper className={classes.vegSection}>
                  <EcoOutlinedIcon
                    classes={classes.ecoOutlinedIcon}
                    style={{ color: "green", transform: "scaleX(-1)" }}
                  />{" "}
                  <EcoIcon style={{ marginLeft: "-13px", color: "green" }} />
                  <b>Pure Veg</b>{" "}
                </Paper>
              ) : null}
              {/*  {!allVeg ? ( */}
              <Paper className="classes.vegSection">
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={vegChecked}
                      value="veg"
                      onChange={handleChange}
                    />
                  }
                  label="Veg Only"
                />
              </Paper>
              {/*   ) : null} */}
            </div>
          </Grid>
        </Grid>
      </Container>
      <Grid
        item
        xs={12}
        sm={12}
        lg={12}
        md={12}
        //style={{ marginTop: 20, marginLeft: "20", paddingLeft: 10 }}
      >
        <RestaurantItems
          items={items}
          restaurantId={props.match.params.restaurantId}
        />
      </Grid>
      <FooterGrid />
    </>
  );
};
export default RestaurantContainer;
