import React, { useState, useEffect } from "react";
import NavAppBar from "../components/Navbar";
import FooterGrid from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import foodData from "../data/Restaurants";
import OrderData from "../data/OrdersData";
import { fade, Grid, Card } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: '2%'
    // backgroundColor: "#2c446e",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // backgroundColor: '#171a29',
    color: "#171a29",

    "&:hover": {
      // backgroundColor: '#171a29',
      color: "#171a29",
    },
  },
  table: {
    minWidth: "auto",
    padding: "10%",
  },
  tablecontainer: {
    marginTop: "10%",
  },
  formselect: {
    color: "#171a29",
  },
  imageText: {
    marginTop:"2%",
    fontSize: "2rem",
    color: "#171a29",
    // float: 'left',
    "&:hover": { transform: "translate3D(0,-7px,0) scale(0.75)",transition:"ease-out 0.7s" },
    cursor: "pointer",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "left",
    marginTop: "5%",
    color: "black",
    backgroundColor: "white",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  orderDetails: {
    padding: "3%",
    // marginTop: '%',
    color: "#171a29",
    fontWeight: 600,
    height: "auto",
    borderRadius: "5px",
    backgroundColor: "white",
  },
  orderdiv: {
    marginTop: "10px",
  },
  orderdivDetail: {
    marginTop: "15px",
  },

  orderDetailsDisplay: {
    padding: "10%",
    marginTop: "4%",
    color: "#171a29",
    fontWeight: 600,
    height: "auto",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },

  acceptButton: {
    backgroundColor: "#171a29",

    "&:hover": {
      backgroundColor: "#171a29",
    },
  },

  acptbtnDiv: {
    marginTop: "8%",
    float: "right",
  },
  statusSelect: {
    marginTop: "10%",
    float: "left",
  },
  confirmBtn: {
    marginTop: "15%",
    width: "150px",
    height: "5vh",
    backgroundColor: "#171a29",
    color: "white",
    "&:hover": {
      backgroundColor: "#171a29",
    },
  },
  deliveryImageDiv: {
    backgroundColor: "white",
    textAlign: "center",
    width: "100%",
    height: "50vh",
  },

  imagesize: {
    marginTop: "15%",
    width: "85%",
    borderRadius: "5px",
    "&:hover": { transform: "translate3D(0,-7px,0) scale(1.05)" ,transition:"0.7s"},
    cursor: "pointer",
  },

  paper1: {
    padding: "2vw",
  },
}));

export default function DeliveryPage() {
  const classes = useStyles();
  //const restaurants = foodData();
  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [snackstate, setsnackState] = useState({
    open: false,
    message: "order accepted",
  });

  const { open, message } = snackstate;

  const handleClick = (message) => {
    console.log("in handle click");
    console.log(message);
    setsnackState({ open: true, message: message });
  };

  const handleClose = () => {
    setsnackState({ ...snackstate, open: false });
  };

  const [orders, setOrders] = useState([]);

  const [acceptedOrder, setAcceptedOrder] = useState({});

  const getPlacedOrderForDeliveryExecutive = async () => {
    const res = await axios.get(
      "http://localhost:5000/order/getplacedorderfordeliveryexecutive"
    );
    console.log("get placed order for delivery executive :", res);
    return res.data;
  };

  /*  const getOrderDetailAcceptedByDeliveryExecutive = async () => {
    console.log("In order deatils by delivery;")

    const res = await axios.get(
      "http://localhost:5000/delivery/getorderdetailacceptedbydeliveryexecutive"
    );
    console.log("order detail accepted by delivery executive :", res);
    return res.data;
  }; */

  useEffect(() => {
    (async function () {
      const res = await getPlacedOrderForDeliveryExecutive();
      console.log("use effect res1", res);
      setOrders(res);
    })();

    /*  (async function () {
      const res = await getOrderDetailAcceptedByDeliveryExecutive();
      console.log("use effect res2", res);
      setAcceptedOrder(res);
    })(); */
  }, []);

  //empty array
  const [orderarray, setorderArray] = useState([]);

  //setting the text of a button
  // const [buttontext, setbuttonText] = useState("Accept");

  // const {allorders} = orders;
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const handleOrders = async (orderId) => {
    console.log("orderId in handle order" + orderId);
    const res = await axios.post(
      "http://localhost:5000/delivery/addDeliveryExecutive",
      { orderId: orderId },
      {
        headers: headers,
      }
    );
    console.log("add delivery Executive", res.data);
    handleClick(res.data.message);
    // console.log(  res.data.message)
  };
  // const [state, setState] = useState("None");
  // const [optstate, setOtp] = useState();

  // const handleotp = (event) => {
  //   const otp = event.target.value;
  //   setOtp(otp);
  //   console.log(otp);
  // }
  // const handleChange = (event) => {
  //   const name = event.target.value;
  //   setState(name);
  // };

  // const handleStatus =async () => {
  //   console.log("In confirm", state);
  //   if (state == "Completed") {
  //     const res = await axios.post(
  //       "http://localhost:5000/delivery/changeorderstatus",
  //       { "orderId": acceptedOrder._id,"orderStatus":state,"orderOtp":parseInt(optstate)}
  //       // , {
  //       // headers: headers,
  //       // }
  //       );
  //       console.log("handle status", res);
  //   } else {
  //     const res = await axios.post(
  //       "http://localhost:5000/delivery/changeorderstatus",
  //       { "orderId": acceptedOrder._id,"orderStatus":state}
  //       // , {
  //       // headers: headers,
  //       // }
  //       );
  //       console.log("handle status", res);
  //   }

  // };

  return (
    <React.Fragment>
      <NavAppBar></NavAppBar>

      <div className={classes.root}>
        <div className={classes.deliveryImageDiv}>
          <Grid container spacing={1}>
            <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Link to={`/acceptedOrders`}>
                  <img
                    src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/cef389b486cb4827e6ba007f26ebddab.svg"
                    className={classes.imagesize}
                  />
                </Link>
                <div className={classes.imageText}>
                  <b>Accepted Orders</b>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <img
                  src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7f56b34e6c253cb54a35bacf5150dde9.svg"
                  className={classes.imagesize}
                />
                <div className={classes.imageText}>
                  <b>Your restaurants Delivered</b>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <img
                  src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/84d6770ca439c4b1ba2d6f53adc1d039.svg"
                  className={classes.imagesize}
                />
                <div className={classes.imageText}>
                  <b>Deliver with Foodiz</b>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item container xs={12} sm={12} md={12} lg={6} spacing={3}>
              
                {orders.map((order) => (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.orderDetails}>
                      <Grid item container xs={6} sm={6} md={6} lg={6}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={6}
                          className={classes.orderdiv}
                        >
                          <div className={classes.orderdiv}> Order Id: </div>
                          <div className={classes.orderdiv}>
                            {" "}
                            Restaurant Name:
                          </div>
                          <div className={classes.orderdiv}>
                            {" "}
                            PickUp Address:{" "}
                          </div>
                          <div className={classes.orderdiv}>
                            {" "}
                            Drop address:{" "}
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <div className={classes.orderdivDetail}>
                            {" "}
                            <b>#{order._id}</b>{" "}
                          </div>
                          <div className={classes.orderdivDetail}>
                            {" "}
                            <b>{order.restaurantDetails.restaurantName}</b>
                          </div>
                          <div className={classes.orderdivDetail}>
                            {" "}
                            <b>
                              {order.orderLocation.streetAddress},
                              {order.orderLocation.landmark
                                ? order.orderLocation.landmark + ","
                                : ""}
                              {order.orderLocation.area}, 
                              {order.orderLocation.city},
                              {order.orderLocation.state}
                            </b>
                          </div>
                          <div className={classes.orderdivDetail}>
                            {" "}
                            <b>{order.restaurantDetails.restaurantLocation.streetAddress}</b>
                          </div>
                        </Grid>
                       
                         {/*  <div className={classes.acptbtnDiv}> */}
                          <Grid item container justify="flex-end" lg={12}>
                          <Button
                            onClick={() => handleOrders(order._id)}
                            className={classes.acceptButton}
                            variant="contained"
                            color="secondary"
                          >
                                Accept
                          </Button>
                          </Grid>
                       {/*  </div> */}

                        <Snackbar
                          open={snackstate.open}
                          onClose={handleClose}
                          message={snackstate.message}
                        >
                          <Alert
                            severity="error"
                            onClose={handleClose}
                            style={{
                              backgroundColor: "#bd0404",
                              color: "white",
                              width: "350px",
                            }}
                          >
                            {snackstate.message}
                          </Alert>
                        </Snackbar>
                      </Grid>
                    </div>
                    </Paper>
                    </Grid>
                ))}
             
            </Grid>
          </Grid>
        </Container>
      </div>

      <FooterGrid></FooterGrid>
    </React.Fragment>
  );
}

// <div className={classes.statusSelect}>
// <FormControl variant="outlined" className={classes.formControl}>
//   <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
//   <Select
//     native
//     value={state.age}
//     onChange={handleChange}
//     label="Status"
//     className={classes.formselect}
//     inputProps={{
//       name: 'Status',
//       id: 'outlined-age-native-simple',
//     }}
//   >
//     <option aria-label="None" value="" />
//     <option value={10}>Completed</option>
//     {/* <option value={20}>In Process</option> */}
//     <option value={30}>Out for Delivery</option>
//   </Select>
// </FormControl>

// </div>
{
  /* <div>
Order Id:
</div> */
}
{
  /* {Acceptedorder._id} */
}
{
  /* <div>
{" "}
Restaurant Name: <b>Sankalp Restaurant</b>
</div>
<div>
Restaurant Id: <b>{Acceptedorder.restId}</b>
</div>
<div>
Food Item: <b></b>
</div>
<div>
PickUp:
<b>{Acceptedorder.restLocation} Chiloda Gujarat</b>
</div>
<div>
{" "}
Drop: <b>{Acceptedorder.orderLocation}</b>
</div>
<div>
{" "}
Total Amount <b> Rs.1200</b>
</div> */
}
