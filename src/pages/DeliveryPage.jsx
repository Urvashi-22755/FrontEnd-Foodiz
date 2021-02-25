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
import TextField from '@material-ui/core/TextField';
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
    fontSize: "2rem",
    color: "white",
    // float: 'left',
    "&:hover": { transform: "translate3D(0,-7px,0) scale(0.75)" },
    cursor: "pointer",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "left",
    marginTop: "5%",
    color: "black",
    backgroundColor: "white",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  orderDetails: {
    padding: "3%",
    // marginTop: '%',
    color: "#171a29",
    fontWeight: 600,
    height: "auto",
    borderRadius: "15px",
    backgroundColor: "white",
  },
  orderdiv: {
    marginTop: "10px",
  },

  orderDetailsDisplay: {
    padding: "10%",
    marginTop: "4%",
    color: "#171a29",
    fontWeight: 600,
    height: "auto",
    backgroundColor: "white",
    borderRadius: "25px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
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
    backgroundColor: "#171a29",
    textAlign: "center",
    width: "100%",
    height: "50vh",
  },

  imagesize: {
    marginTop: "15%",
    width: "85%",
    borderRadius: "10px",
    "&:hover": { transform: "translate3D(0,-7px,0) scale(1.05)" },
    cursor: "pointer",
  },

  paper1: {
    padding: "2vw",
  },
}));

export default function DeliveryPage() {
  const classes = useStyles();
  //const restaurants = foodData();
  const [orders, setOrders] = useState([]);
  const [acceptedOrder, setAcceptedOrder] = useState({});
  const getPlacedOrderForDeliveryExecutive = async () => {
    const res = await axios.get(
      "http://localhost:5000/order/getplacedorderfordeliveryexecutive"
    );
    console.log("get placed order for delivery executive :", res);
    return res.data;
  };

  const getOrderDetailAcceptedByDeliveryExecutive = async () => {
    const res = await axios.get(
      "http://localhost:5000/delivery/getorderdetailacceptedbydeliveryexecutive"
    );
    console.log("order detail accepted by delivery executive :", res);
    return res.data;
  };

  useEffect(() => {
    (async function () {
      const res = await getPlacedOrderForDeliveryExecutive();
      console.log("use effect res1", res);
      setOrders(res);
    })();
    (async function () {
      const res = await getOrderDetailAcceptedByDeliveryExecutive();
      console.log("use effect res2", res);
      setAcceptedOrder(res);
    })();
  }, []);
  // const orders = OrderData();
  console.log(orders);

  //empty array
  const [orderarray, setorderArray] = useState([]);

  //setting the text of a button
  // const [buttontext, setbuttonText] = useState("Accept");

  // const {allorders} = orders;
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const handleOrders = async (orderId) => {
    console.log(orderId);
    const res = await axios.post(
      "http://localhost:5000/delivery/addDeliveryExecutive",
      { orderId: orderId }
      // , {
      // headers: headers,
      // }
    );
    console.log("add delivery Executive",res.data);
    // console.log(orders);
    // setorderArray((arr) => [...arr, order]);

    // const index = orders.indexOf(order);
    // console.log(index);
    // console.log(orders[index]._id);
    // console.log(order._id);

    // if (orders[index]._id === order._id) {
    //   //setbuttonText('Accepted');
    //   console.log("matched");
    // }

    // acceptedOrders.push(order);
  };
  const [state, setState] = useState("None");
  const [optstate, setOtp] = useState();

  const handleotp = (event) => {
    const otp = event.target.value;
    setOtp(otp);
    console.log(otp);
  }
  const handleChange = (event) => {
    const name = event.target.value;
    setState(name);
  };

  const handleStatus =async () => {
    console.log("In confirm", state);
    if (state == "Completed") {
      const res = await axios.post(
        "http://localhost:5000/delivery/changeorderstatus",
        { "orderId": acceptedOrder._id,"orderStatus":state,"orderOtp":parseInt(optstate)}
        // , {
        // headers: headers,
        // }
        );
        console.log("handle status", res);
    } else {
      const res = await axios.post(
        "http://localhost:5000/delivery/changeorderstatus",
        { "orderId": acceptedOrder._id,"orderStatus":state}
        // , {
        // headers: headers,
        // }
        );
        console.log("handle status", res);
    }
    
  };

  return (
    <React.Fragment>
      <NavAppBar></NavAppBar>

      <div className={classes.root}>
        <div className={classes.deliveryImageDiv}>
          <Grid container spacing={1}>
            <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <img
                  src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/cef389b486cb4827e6ba007f26ebddab.svg"
                  className={classes.imagesize}
                />
                <div className={classes.imageText}>
                  <b>Order Received</b>
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
            <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={5}>
                {orders.map((order) => (
                  <Paper className={classes.paper}>
                    <div className={classes.orderDetails}>
                      <Grid item container xs={6} sm={6} md={6} lg={12}>
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
                          <div className={classes.orderdiv}>
                            {" "}
                            <b>#{order._id}</b>{" "}
                          </div>
                          <div className={classes.orderdiv}>
                            {" "}
                            <b>{order.restaurantDetails.restaurantName}</b>
                          </div>
                          <div className={classes.orderdiv}>
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
                          <div className={classes.orderdiv}>
                            {" "}
                            {/* <b>{order.restaurantDetails.restaurantLocation.streetAddress}</b> */}
                          </div>
                        </Grid>

                        <div className={classes.acptbtnDiv}>
                          <Button
                            onClick={() => handleOrders(order._id)}
                            className={classes.acceptButton}
                            variant="contained"
                            color="secondary"
                          >
                            Accept
                          </Button>
                        </div>
                      </Grid>
                    </div>
                  </Paper>
                ))}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={7}>
                <Grid item xs={12} sm={6} md={6} lg={12}>
                  <div className={classes.orderDetailsDisplay}>
                    <Typography
                      variant="h4"
                      style={{ textAlign: "center", marginBottom: "5%" }}
                    >
                      Order Details
                    </Typography>
                    <Grid item container xs={12} sm={6} md={6} lg={12}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div> Order Id: </div>
                        <div> Restaurant Name:</div>
                        <div> PickUp Address: </div>
                        <div> Drop address: </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <div>
                          {" "}
                          <b>#{acceptedOrder._id}</b>{" "}
                        </div>
                        <div>
                          {" "}
                          <b>{ acceptedOrder?.restaurantDetails?.restaurantName}</b>
                        </div>
                        <div>
                          {" "}
                          <b>{
                            acceptedOrder?.restaurantDetails?.restaurantLocation?.streetAddress + ','+
                            acceptedOrder?.restaurantDetails?.restaurantLocation?.landmark + ','+
                            acceptedOrder?.restaurantDetails?.restaurantLocation?.area + ','+
                            acceptedOrder?.restaurantDetails?.restaurantLocation?.city + ','+
                            acceptedOrder?.restaurantDetails?.restaurantLocation?.state + ','+
                            acceptedOrder?.restaurantDetails?.restaurantLocation?.country
                          }</b>
                        </div>
                        <div>
                          
                          <b>{
                            acceptedOrder?.orderLocation?.streetAddress + ','+
                            acceptedOrder?.orderLocation?.landmark + ','+
                            acceptedOrder?.orderLocation?.area + ','+
                            acceptedOrder?.orderLocation?.city + ','+
                            acceptedOrder?.orderLocation?.state + ','+
                            acceptedOrder?.orderLocation?.country
                          }</b>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                      <TableContainer className={classes.tablecontainer}>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <b>Food Item</b>
                              </TableCell>
                              <TableCell align="right">
                                <b>Quantity</b>
                              </TableCell>

                              <TableCell align="right">
                                <b>Price / item</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {acceptedOrder?.foodList?.map((food) => (
                                <TableRow key={food._id}>
                                  <TableCell component="th" scope="row">
                                    {food?.foodItem?.foodName}
                                  </TableCell>
                                  <TableCell align="right">
                                  {food?.quantity}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    align="right"
                                    scope="row"
                                  >
                                    {food?.foodItem?.foodPrice*food?.quantity}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Grid
                        container
                        justify="flex-end"
                        style={{ marginTop: "20px" }}
                      >
                        <Typography variant="h6">
                          Total Amount : { acceptedOrder.totalAmount}
                        </Typography>
                      </Grid>

                      <Grid item container xs={12} sm={6} md={6} lg={12}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                          <div className={classes.statusSelect}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel htmlFor="age-native-simple">
                                Status
                              </InputLabel>
                              <Select
                                native
                                value={state}
                                onChange={handleChange}
                                label="Status"
                                className={classes.formselect}
                              >
                                <option aria-label="None" value="" />
                                <option value="Completed">Completed</option>
                                {/* <option value={20}>In Process</option> */}
                                <option value="Out For Delivery">
                                  Out for Delivery
                                </option>
                              </Select>
                            
                            </FormControl>
                          
                          </div>
                         
                        </Grid>
                        {state == "Completed" ?  <Grid item xs={12} sm={6} md={6} lg={4}>
                         <TextField  onChange={handleotp} style={{marginTop: '12%'}} id="standard-basic" name="otp" label="Standard" /> 
                          </Grid> : null}
                       
                        <Grid item container xs={12} sm={6} md={6} lg={4} justify="flex-end">
                      
                          <div>
                         
                            <Button
                              className={classes.confirmBtn}
                              onClick={handleStatus}
                            >
                              Confirm
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
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
