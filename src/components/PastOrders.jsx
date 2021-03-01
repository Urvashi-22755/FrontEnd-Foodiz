import React, { useState, useEffect } from "react";
import { withRouter} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Route, Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MyProfile from "./MyProfile";
import foodData from "../data/Restaurants";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { shadows } from "@material-ui/system";
import currencyInr from "@iconify-icons/mdi/currency-inr";
import { Icon, InlineIcon } from "@iconify/react";
import _ from "lodash";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {decodeToken} from '../services/authUser';
import jwt_decode from "jwt-decode";
import NoPlacedOrdersDelivery from '../EmptyPages/NoPlacedOrdersDelivery'
const useStyles = makeStyles(theme => ({
  root: {
    //   margin: '2%',
    padding: "3%",
    height: "100%",
    // backgroundColor: '#37718e',
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing(7),
    textAlign: "left",
    // border: '1px solid #171a29',
    color: "black",
    height: "100%",
    // boxShadow: "0 14px 28px rgb(89, 130, 150), 0 10px 10px rgb(89, 130, 150)",
    backgroundColor: "#ffffff"
  },
  paper1: {
    padding: theme.spacing(2),
    backgroundColor: "#ffffff",
    margin: "2%",
    color: "black",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
  },
  pastorders: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 0,
    paddingLeft: theme.spacing(1),
    alignItems: "center"
  },

  image: {
    borderRadius: "15px",
    width: "100%",
    height: "160px"
  },
  cardtitle: {
    fontWeight: 400,
    fontSize: "2rem",
    textAlign: "center",

    // paddingBottom: theme.spacing,
    color: "#282c3f"
  },
  orderdetails: {
    color: "#2c446e",
    fontWeight: "100",
    width: "65%",
    marginTop: '5%'
  },
  media: {
    height: 200
  },
  pastImage: {
    borderRadius: "10px",
    border: "2px solid white",
    width: "40%",
    margin: "2%"
  },
  card: {
    border: "2px solid white",
    maxwidth: "80%"
    /*  "&$selected": {
      backgroundColor: "white !important"
    } */
  },
 
  pastordertext: {
    color: "#2c446e",
    fontSize: "30px",
    fontWeight: "200"
  },
  hrcolor: {
    // backgroundColor: "#2c446e",
    borderTop: "1px dashed #2c446e"
  },
  detailsBtn:{
    float: 'right',
    backgroundColor: '#2c446e',
    width: '150px',
    color: 'white',
    borderRadius: '5px'
  },

  loaditems: {
    height: "100px"
  }
}));

const handleId = rest => {
  console.log(rest);
};

 function PastOrders(props) {
  const classes = useStyles();
  // const restaurants = foodData();
  const [myOrders, setMyOrders] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const fetchAllOrders = async () => {
    const res = await axios.get("http://localhost:5000/order/getuserorder", {
      headers: headers,
    })
    return res.data;
  };
   const fetchPastorders = async () => {
    var token = localStorage.getItem("token");
    const decodedToken =   decodeToken(token); 
     if(decodedToken.role=="DE"){
      const resp = await axios.get("http://localhost:5000/delivery/getdeliveryexecutivepastorders", {
        headers: headers,
       })
       return resp.data;
     }else{
      const resp = await axios.get("http://localhost:5000/order/getUserOrder", {
        headers: headers,
       })
       return resp.data;
     }
     
}

  useEffect(() => {
    (async () => {
      const result = await fetchAllOrders();
      const resp = await fetchPastorders();
      console.log('my orders', result);
      console.log('past orders delivery', resp);
      // if (myOrders.role == "NU") {
      //   setMyOrders(result);
      // } else {
      //   setMyOrders(resp);
      // }
      setMyOrders(resp);
    })();
  }, []);


  const handleOrderSummary = (id) => {
    console.log(id);
    props.history.push("/ordersummary/" + id);
  };

  const handleDate = (date) => {
    const newDate = new Date(date);

    return newDate.toDateString();
  };


  const handleTime = (date) => {
    const newDate = new Date(date);
    return newDate.toTimeString();
  };

  
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12} lg={12} md={12}>
            <Paper className={classes.paper}>
           
            {myOrders.length> 0 ? (myOrders?.map(order => (
              <Paper className={classes.paper1} key={order._id}>
                   <Typography className={classes.pastordertext}>
                Past Orders
              </Typography>
                <div className={classes.pastorders}>
                  <div className={classes.pastImage}>
                    <img className={classes.image} src={order?.restaurantDetails?.restaurantImages} />
                  </div>
                  <div className={classes.orderdetails}>
                    <Typography
                    >
                     <b> Order Id:  </b>  #{order._id}
                    </Typography>

                    <Typography>  <b>{order?.restaurantDetails?.restaurantName}</b></Typography>
                    <Typography>
                      <b>Order Date:</b>
                      <strong>
                            {" "}
                            {handleDate(order.orderDateAndTime)}
                          </strong>
                    </Typography>
                   
                    <Typography>
                    <b>Order Time:</b>
                          <strong>
                            {" "}
                            {handleTime(order.orderDateAndTime)}
                          </strong>
                    </Typography>
                    <div className={classes.price}>
                      <hr className={classes.hrcolor} />
                      <Typography>
                        Total Paid: <Icon icon={currencyInr} />
                        {order.totalAmount}
                      </Typography>
                      <div className={classes.detailsBtn}>

                      
                        <Button
                           onClick={() => handleOrderSummary(order._id)}
                          className={classes.detailsBtn}>Order Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            )) ): 
            <Container spacing={3} className={classes.noOrderImage}>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <NoPlacedOrdersDelivery />
                    <h3>No Orders Placed!</h3>
                  </Grid>
                </Grid>
              </Container>
            
            }

              {/* myOrders?.map(order => (
                <Paper className={classes.paper1} key={order._id}>
                  <div className={classes.pastorders}>
                    <div className={classes.pastImage}>
                      <img className={classes.image} src={order?.restaurantDetails?.restaurantImages} />
                    </div>
                    <div className={classes.orderdetails}>
                      <Typography
                      >
                       <b> Order Id:  </b>  #{order._id}
                      </Typography>

                      <Typography>  <b>{order?.restaurantDetails?.restaurantName}</b></Typography>
                      <Typography>
                        <b>Order Date:</b>
                        <strong>
                              {" "}
                              {handleDate(order.orderDateAndTime)}
                            </strong>
                      </Typography>
                     
                      <Typography>
                      <b>Order Time:</b>
                            <strong>
                              {" "}
                              {handleTime(order.orderDateAndTime)}
                            </strong>
                      </Typography>
                      <div className={classes.price}>
                        <hr className={classes.hrcolor} />
                        <Typography>
                          Total Paid: <Icon icon={currencyInr} />
                          {order.totalAmount}
                        </Typography>
                        <div className={classes.detailsBtn}>

                        
                          <Button
                             onClick={() => handleOrderSummary(order._id)}
                            className={classes.detailsBtn}>Order Details</Button>
                        
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              ))} */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default withRouter(PastOrders);
