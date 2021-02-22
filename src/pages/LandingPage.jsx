import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Card, Slide } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FooterGrid from "../components/Footer";
import "materialize-css/dist/css/materialize.min.css";
import Parallax from "../components/Parallax";
import Carousel from "../components/Carousels";
import foodData from "../data/Restaurants";
import StarRateIcon from "@material-ui/icons/StarRate";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Dialog, DialogContent } from "@material-ui/core";
import SignUp from './../components/Signup';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Oi", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // rating:{
  //   marginTop: '5%',
  //   width: '60px',
  //   backgroundColor: '#48c479',
  //   color: 'white'
  // },
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
    // backgroundImage: `url('https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // justifyContent: "center"
  },
  foodtext: {
    float: "right",
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

  title: {
    color: "white",
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  SignupLogin: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundRepeat: "no-repeat",
    height: "60vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + `images/foodimage.jfif`
    } )`,
  },
  quote: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "200px",
    marginRight: "500px",
  },
  logintext: {
    float: "right",
    marginTop: 0,
    fontSize: "20px",
    padding: "20px",
  },
  spaceText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpText: {
    paddingRight: "20px",
    cursor: "pointer",
  },

  foodsContainer: {
    paddingTop: theme.spacing(3),
  },
  cardtitle: {
    fontWeight: 700,
    fontSize: "4rem",
    textAlign: "center",
    color: "#282c3f",
  },
  card: {
    // border: "2px solid white",
    borderRadius: "16px",
    maxwidth: "100%",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    "&:hover": { transform: "translate3D(0,-7px,0) scale(1.05)" },
  },
  restcontainer: {
    marginTop: "5%",
  },

  media: {
    height: 200,
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

export default function LandingPage() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false); //State to open Dialgoues!

  const restaurants = foodData();

  //Open and CLose Dialgoue Forms
  const handleClickOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid item container xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={classes.SignupLogin}>
              <div className={classes.logintext}>
                {/* <div className={classes.spaceText}>SignUp</div>
                  <div className={classes.spaceText}>Login</div> */}
                <div className={classes.spaceText}>
                  <p className={classes.signUpText} onClick={() => handleClickOpen()}>
                    <PersonIcon /> Signup
                  </p>
                  <p>
                    <ExitToAppIcon /> Login
                  </p>
                </div>
                {/* <div>  Login</div>  */}
              </div>
              <div className={classes.quote}>
                <Typography variant="h1">FOODIZ</Typography>
                <Typography variant="h4">We Bring Joy to the Table</Typography>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Dialouge For Register/ SignUp form */}

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <SignUp  />
          </DialogContent>
        </Dialog>

        {/* <Box className={classes.hero}>
        
          <Box className={classes.image}>
         
          <div className={classes.foodtext}>
              
            </div>
    
          </Box>
        </Box> */}

        <Container maxWidth="lg" className={classes.foodsContainer}>
          <Grid
            item
            container
            spacing={10}
            mt={10}
            className={classes.restcontainer}
          >
            <Grid item container xs={12} sm={12} md={12} lg={12} spacing={6}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Link style={{ textDecoration: "none" }} to="/allrestaurants">
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="https://images.unsplash.com/photo-1583096114844-06ce5a5f2171?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        title="Contemplative Reptile"
                      />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Order Food Online
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Stay at home and order to your doorstep
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Grab some amazing food
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Enjoy limitless dining privileges
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Parallax></Parallax>
        <Carousel></Carousel>
        <FooterGrid></FooterGrid>
        {/* <TopRatedRests></TopRatedRests> */}

        {/* <RecipeReviewCard></RecipeReviewCard> */}
      </div>
    </ThemeProvider>
  );
}
