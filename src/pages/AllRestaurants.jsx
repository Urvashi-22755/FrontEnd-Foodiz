import React from "react";
import NavAppBar from "../components/Navbar";
import FooterGrid from "../components/Footer";
import foodData from "../data/Restaurants";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { fade, Grid, Card } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
// import Avatar from "@material-ui/core/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
// import "materialize-css/dist/css/materialize.min.css";
import StarRateIcon from "@material-ui/icons/StarRate";
import SearchBar from "material-ui-search-bar";
import FullWidthTabs from '../components/ratings';
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
    // paddingTop: theme.spacing(3)
  },
  cardtitle: {
    fontWeight: 700,
    fontSize: "4rem",
    textAlign: "center",

    // paddingBottom: theme.spacing,
    color: "#282c3f",
  },
  card: {
    // border: "2px solid white",
    borderRadius: "16px",
    maxwidth: "100%",
    /*  "&$selected": {
          backgroundColor: "white !important"

        } */
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    "&:hover": { transform: "translate3D(0,-7px,0) scale(1.05)" },
  },

  restcontainer: {
    marginTop: "5%",
  },

  media: {
    height: 200,
  },
  searchbar: {
    marginTop: "5%",
    marginBottom: '5%',
    height: "6vh",
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
}));

const handleId = (rest) => {
  console.log(rest);
};

export default function AllRestaurants() {
  const classes = useStyles();
  const restaurants = foodData();

  return (
    <React.Fragment>
      <NavAppBar></NavAppBar>

      <Container maxWidth="lg" className={classes.foodsContainer}>
        <Typography className={classes.cardtitle} variant="h4">
          RESTAURANTS
        </Typography>
        <SearchBar
          className={classes.searchbar}
          placeholder="Search for Restaurants or dishes.."
        />



<FullWidthTabs></FullWidthTabs>

        <Grid
          item
          container
          spacing={10}
          mt={10}
          className={classes.restcontainer}
        >
          <Grid item container xs={12} sm={12} md={12} lg={12} spacing={6}>
            {restaurants.map((rest) => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <div className={classes.cardborder}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/allrestaurants/${rest._id}`}
                  >
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={rest.imageUrl}
                          title=""
                          onClick={() => handleId(rest)}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {rest.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {rest.description}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="h3"
                          >
                            Rs. {rest.price} for Two
                          </Typography>
                          <Typography>
                            <p className={classes.rating}>
                              <StarRateIcon /> 4.5
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
