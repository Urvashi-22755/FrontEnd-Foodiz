import React, { useState, useEffect } from "react";
import NavAppBar from "./../components/Navbar/Navbar";
import FooterGrid from "../components/Footer";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  fade,
  Grid,
  Card,
  FormControl,
  InputLabel,
  InputBase,
  Checkbox,
  Select,
  Paper,
  FormControlLabel,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import StarRateIcon from "@material-ui/icons/StarRate";
import SearchBar from "material-ui-search-bar";
import EcoIcon from "@material-ui/icons/Eco";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import axios from "axios";

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
    backgroundColor: "#2c446e",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image: {
    width: "80%",
    paddingTop: "5%",
  },
  p: {
    fontSize: "1rem",
    fontWeight: 100,
  },
  hero: {
    margin: 0,
    backgroundImage: `url('https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80')`,
    backgroundRepeat: "no-repeat",
    height: "60vh",
    flexWrap: "wrap",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    flexDirection: "col",

    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    marginTop: "5vh",
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },

    paddingLeft: "2%",
    paddingRight: "2%",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing(1),
      width: "100vh",
      height: "7vh",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 120),
    height: "100%",
    width: "100",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  foodsContainer: {
    marginTop: "6%",
  },
  restPagetitle: {
    fontWeight: 700,
    fontSize: "4rem",
    textAlign: "center",

    // paddingBottom: theme.spacing,
    color: "#282c3f",
  },
  card: {
   
    borderRadius: "5px",
    maxwidth: "100%",
    height: '53vh',
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    "&:hover": {
      transform: "translate3D(0,-7px,0) scale(1.05)",
      transition: "0.7s",
    },
  },

  restcontainer: {
    marginTop: "5%",
  },

  media: {
    height: 200,
  },
  searchbar: {
    marginTop: "5%",
    // marginBottom: '5%',
    height: "7vh",
    width: "auto",

    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    color: "white",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
      "&:focus": {
        width: "10ch",
      },
    },
  },

  rating: {
    marginTop: "5%",
    width: "60px",
    backgroundColor: "#48c479",
    color: "white",
  },
  searchAlign: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: '',
    marginLeft: "5%",
  },
  statusSelect: {
    marginTop: "2%",
    marginRight: "2%",
    float: "left",
  },
  hrstyle: {
    // justifyContent: 'center',
    width: "70%",
    borderTop: "2px dashed #2c446e",
  },
  filterItemsAlign:{
    marginTop: '5%'
  },
  alignRestcards:{
    justifyContent: 'center'
  },
  checkboxstyle:{
    width: '5%'
  },
  cardContent:{
    fontWeight: 400 ,
    color: '#4a4b52',
    fontSize: '13px'
  }
 
}));

const handleId = (rest) => {
  console.log("Rest Id", rest);
};

export default function AllRestaurants() {
  const classes = useStyles();
  // const restaurants = foodData();
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("Gandhinagar");
  const [restaurants, setRestaurants] = useState([]);
  const token = localStorage.getItem("token");
  const [vegChecked, setVegChecked] = useState(false);
  const [globalRestaurant, setGlobalRestaurant] = useState([]);
  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const handleVegCheckChange = (event) => {
    setVegChecked(!vegChecked);
    if (vegChecked != true) {
      const restaurantFilter = restaurants.filter(
        (restaurant) => restaurant.restaurantType == "Veg"
      );
      console.log("in if", restaurantFilter);
      setRestaurants(restaurantFilter);
    } else {
      setRestaurants(globalRestaurant);
    }
  };
  const handleCityChange = async (event) => {
    console.log("In handle City Change city : ", event.target.value);
    setCity(event.target.value);
    const data = await getSearchedRestaurants(event.target.value, search);
    setRestaurants(data);
  };

  const handleSearchChange = async (event) => {
    console.log("In handle Search Change city :  search : ", city, event);
    setSearch(event);
    const data = await getSearchedRestaurants(city, search);
    setRestaurants(data);
    console.log("All rest after global", restaurants);
  };

  const getSearchedRestaurants = async (city, search) => {
    console.log("City : ", city, "Search : ", search);
    if (search == "" && city == "") {
      console.log("if search");
      return globalRestaurant;
    } else {
      console.log("else search", city);
      const resp = await axios.get(
        "http://localhost:5000/restaurant/searchrestaurants",
        { params: { city: city, search: search } }
        // {
        //   headers: headers,
        // }
      );
      return resp.data;
    }
  };

  useEffect(() => {
    (async function () {
      console.log("sdfsdf");
      const res = await axios.get(
        "http://localhost:5000/restaurant/getrestaurants"
      );
      setGlobalRestaurant(res.data);
      setRestaurants(res.data);
      // const res1=await getSearchedRestaurants(city,search)
      // setRestaurants(res1)
    })();
  }, []);

  return (
    <React.Fragment>
      <NavAppBar></NavAppBar>

      <Container maxWidth="lg" className={classes.foodsContainer}>
        <Typography className={classes.restPagetitle} variant="h4">
          Restaurants In Your City
          <hr className={classes.hrstyle} />
        </Typography>

        <Grid container >
          <Grid item container xs={12} sm={12} md={12} lg={12} spacing={6} className={classes.filterItemsAlign}> 
            <Grid item xs={12} sm={3} md={3} lg={2}  justify="flex-start">

                  <FormControl variant="outlined" >
                    <InputLabel htmlFor="age-native-simple"  className={classes.checkboxstyle}>Select City</InputLabel>
                    <Select
                      native
                      value={city}
                      onChange={handleCityChange}
                      label="Status"
                   
                    >
                      {/* <option aria-label="None" value="" /> */}
                      <option value="Gandhinagar">Gandhinagar</option>
                      <option value="Abad">Abad</option>
                    </Select>
                  </FormControl>
            
            </Grid>
            <Grid item xs={12} sm={5} md={6} lg={7} justify="center">

            <SearchBar
             
              placeholder="Search for Restaurants or dishes.."
              onChange={handleSearchChange}
            />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}  justify="flex-end">

            <div >
              <Paper>
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={vegChecked}
                      onChange={handleVegCheckChange}
                     
                    />
                  }
                  className={classes.PureVegCheckbox}
                />
                <EcoOutlinedIcon
                  style={{ color: "green", transform: "scaleX(-1)" }}
                />
                <EcoIcon style={{ marginLeft: "-13px", color: "green" }} />
                <b>Pure Veg</b>
              </Paper>
            </div>
            </Grid>
          </Grid>
        </Grid>

      
        {/* <FullWidthTabs></FullWidthTabs> */}

        <Grid
          item
          container
          spacing={10}
          mt={10}
          className={classes.restcontainer}
        >
          <Grid item container xs={12} sm={12} md={12} lg={12} spacing={6} className={classes.alignRestcards}>
            {restaurants?.map((rest) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={rest._id} >
                <div className={classes.cardborder}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`restaurant/${rest._id}`}
                  >
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={rest.restaurantImages[0]}
                          title=""
                          onClick={() => handleId(rest)}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2" >
                            {rest.restaurantName}
                          </Typography>
                          <Typography variant="body2" className={classes.cardContent}>
                            {rest.restaurantCategory.join(",")}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            className={classes.cardContent}
                           
                          >
                            {rest.restaurantDescription}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            className={classes.cardContent}
                            
                          >
                            {rest.restaurantType}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={classes.cardContent}
                            
                          >
                            {rest?.restaurantLocation?.streetAddress +
                              "," +
                              rest?.restaurantLocation?.area +
                              " ," +
                              rest?.restaurantLocation?.landmark +
                              " ," +
                              rest?.restaurantLocation?.city +
                              " ," +
                              rest?.restaurantLocation?.state +
                              " ," +
                              rest?.restaurantLocation?.country}
                          </Typography>
                          <Typography>
                            <p className={classes.rating}>
                              <StarRateIcon />
                              {parseFloat(rest.rating_avg).toFixed(1)}
                            </p>
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                      <CardActions></CardActions>
                    </Card>
                  </Link>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>

      <FooterGrid></FooterGrid>
    </React.Fragment>
  );
}
