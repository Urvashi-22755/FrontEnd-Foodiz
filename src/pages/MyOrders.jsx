import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavAppBar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import FooterGrid from "../components/Footer";
import Button from "@material-ui/core/Button";
import { Grid, Paper } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import axios from "axios";
import NoPlacedOrdersDelivery from '../EmptyPages/NoPlacedOrdersDelivery'
/* styles */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2%",
    //margin: "2%",
    // backgroundColor:'#e4e3ff'
  },
  paper: {
    padding: theme.spacing(4),
    width: "100%",
    margin: "2%",
  },
  acceptButton: {
    backgroundColor: "#171a29",
    float: "right",
    "&:hover": {
      backgroundColor: "#171a29",
    },
  },
  restaurantTitle: {
    marginTop: "2%",
    fontSize: "18px",
  },
  rating: {
    marginTop: "5%",
    width: "60px",
    backgroundColor: "#48c479",
    color: "white",
  },
  imgContainer: {
    width: "100%",
    height: "100%",
  },
  restImage: {
    width: "90%",
    height: "90%",
  },
  noOrderImage:{
    marginTop: '10%'
  }
}));

function MyOrders(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  //headrer data
  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchOrdersData = async () => {
    const res = await axios.get("http://localhost:5000/order/getusertrackorder", {
      headers: headers,
    });
    return res.data;
  };

  useEffect(() => {
    (async () => {
      const result = await fetchOrdersData();
      setOrders(result);
      console.log('ORDER DATA', result)
    })();
  }, []);

  /* redirect to order Summary */
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
    <>
      <div className={classes.root}>
        <NavAppBar />

        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item container lg={12} xs={12} md={12} sm={12} spacing={2}>

              {(orders.length > 0)?(orders?.map((order) => {
                return (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={order._id}>
                    <Paper className={classes.paper} id="1234">
                      <Grid>
                        {/* Title */}
                        <Grid item container direction="row" lg={12}>
                          <Grid item lg={2} md={2} sm={2} xs={2}>
                            <div className={classes.imgContainer}>
                              <img
                                className={classes.restImage}
                                src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60"
                              ></img>
                            </div>
                          </Grid>

                          <Grid item lg={8} md={8} sm={8} xs={8}>
                            <b>
                              <p className={classes.restaurantTitle}>
                                {order.restaurantDetails.restaurantName}
                              </p>
                            </b>
                          </Grid>
                          <Grid item lg={2} md={2} sm={2} xs={2}>
                            <p className={classes.rating}>
                              <StarRateIcon /> 5.0
                            </p>
                          </Grid>
                        </Grid>
                        <hr />

                        {/* Content */}
                        <Grid item lg={12}  md={12} sm={12} xs={12}>
                          <p>
                            <b>Order Id :</b>
                            <strong> #{order._id}</strong>
                          </p>
                          <p>
                            <b>Order Date:</b>
                            <strong>
                           
                              {handleDate(order.orderDateAndTime)}
                            </strong>
                          </p>
                          <p>
                            <b>Order Time:</b>
                            <strong>
                          
                              {handleTime(order.orderDateAndTime)}
                            </strong>
                          </p>
                          <p></p>
                          {/*   <p><b>Order Status:</b> <strong>{order.orderStatus }</strong></p> */}
                          <b>Total Amount:</b>
                          <strong> Rs {order.totalAmount}</strong>
                        </Grid>
                        <hr />

                        {/* Track Order and Order SUmmary */}
                        <Grid item container justify="flex-end" lg={12}>
                          <Button
                            onClick={() => handleOrderSummary(order._id)}
                            className={classes.acceptButton}
                            variant="contained"
                            color="secondary"
                          >
                            Track Order
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              }))
              : 

              <>
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
            </>
              }
              
            </Grid>

            {/* Second Part */}
            {/*  <Grid item lg={6} xs={3} md={3}>
              <Paper className={classes.paper} id="1234">
                <Grid conatiner spacing={2}>
                  <Grid item container direction="row" lg={12}>
                    <Grid item lg={2}>
                      <img
                        width="70"
                        height="40"
                        src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      ></img>
                    </Grid>
                    <Grid item lg={8}>
                      <b>
                        <p className={classes.restaurantTitle}>My restaurant</p>
                      </b>
                    </Grid>
                    <Grid item lg={2}>
                      <p className={classes.rating}>
                        <StarRateIcon /> 5.0
                      </p>
                    </Grid>
                  </Grid>
                  <hr />

                  <Grid item lg={12}>
                    <p>Item name X Quantity | Item name X Quantity</p>
                    <p> Item name X Quantity | Item name X Quantity </p>
                    <p></p>
                    <p></p>
                    <b>Total Amount: Rs 1000</b>
                  </Grid>
                  <hr />

                  <Grid item container justify="flex-end" lg={12}>
                    <Button
                      onClick={() => handleOrderSummary(1234)}
                      className={classes.acceptButton}
                      variant="contained"
                      color="secondary"
                    >
                      Track Order
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid> */}
            {/*  <Grid item lg={3}> */}
            {/* <Paper className={classes.paper}>hello world</Paper> */}
            {/*  </Grid> */}
          </Grid>
        </Container>
        <FooterGrid />
      </div>
    </>
  );
}
export default MyOrders;
