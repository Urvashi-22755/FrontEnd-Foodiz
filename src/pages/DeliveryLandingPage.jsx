import React,{useState} from 'react';
import NavAppBar from '../components/Navbar';
import FooterGrid from '../components/Footer';
import { makeStyles } from "@material-ui/core/styles";
import foodData from "../data/Restaurants";
import OrderData from '../data/OrdersData';
import { fade, Grid, Card } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container"
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '2%'
    // backgroundColor: "#2c446e",
  },
  deliveryImageDiv:{
backgroundColor: '#171a29',
textAlign: 'center',
   width: '100%',
      height: '60vh'
  },

  deliveryImg:{
        width: '50%',
        marginTop: '5%',
        borderRadius: '15px',
        height: '40vh'
  },

  paper: {
    padding: theme.spacing(4),
    textAlign: 'left',
    color: 'white',
    backgroundColor: '#0c752b',
    height: 'auto'
  },
  seeorderbtn:{
      backgroundColor: '#0c752b',
    width: '20vh'
  }
  
}));





export default function DeliveryLandingPage(){
  const classes = useStyles();
  const restaurants = foodData();
  const orders = OrderData();







  return(
    <React.Fragment>
      <NavAppBar></NavAppBar>
            <div className={classes.deliveryImageDiv}>
            <img src='https://image.freepik.com/free-vector/food-delivery-staff-ride-motorcycles-deliver-food-during-confinement-home-from-corona-virus_68708-821.jpg'  className={classes.deliveryImg} />

            </div>
      <div  className={classes.root}>   
      <Container>
      <Grid container spacing={3}>
        <Grid item container xs={12} sm={12} md={12} lg={6} spacing={3}>
          <img src='https://image.freepik.com/free-vector/delivery-man-scooter-drives-city-street_107791-2895.jpg'  className={classes.deliveryImage} />
      </Grid>

      <Grid item container xs={12} sm={12} md={12} lg={6} spacing={3}>
      <Paper className={classes.paper}>
            <Link style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }} to={`/deliverypage/`}>
              <Button className={classes.seeorderbtn}>See My Orders</Button>
            </Link>
            </Paper>
      </Grid>
    </Grid>

      </Container>
      </div>

    <FooterGrid></FooterGrid>
    </React.Fragment>
  )
}

