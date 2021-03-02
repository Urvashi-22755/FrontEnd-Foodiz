import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import foodData from "../data/FoodData";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";
import { Box } from "@material-ui/core";
import DrawerExample from "../components/DrawerForm";
import FooterGrid from "../components/Footer/Footer";
import NavAppBar from '../components/Navbar/NavAppBar';
import axios from "axios";
import NoPlacedOrdersDelivery from "./EmptyPages/NoPlacedOrdersDelivery";
import {
  fetchUserCartDeatails,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
  handleCartPlaceOrder,
} from "../services/CartService";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2%",
  },
  paper: {
    padding: theme.spacing(4),
    border: "1px solid rgb(23,26,41)",
  },
  paperAddress: {
    padding: theme.spacing(4),
    border: "1px solid rgb(23,26,41)",
    // background:'#f5f5ff'
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
  },
  content: {
    textAlign: "center",
    flex: "1 0 auto",
  },
  cover: {
    height: "100",
    width: "30%",
  },
  addTocart: {
    color: "white",
    backgroundColor: "rgb(23,26,41)",
    width: "30%",
    marginLeft: "20%",
    marginBottom: "3%",
    float: "left",
    "&:hover": {
      backgroundColor: "rgb(23,26,41)",
    },
  },
  counter: {
    color: "rgb(23,26,41)",
    textAlign: "center",
    width: "30%",
    // border: "1px solid rgb(23,26,41)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },
  quantity: {
    width: "40%",
    textAlign: "center",
    // borderRight: "1px solid rgb(23,26,41)",
  },
  displayCounters: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "5%",
    display: "flex",
    width: "6vw",
    flexDirection: "row",
    //  border: "1px solid rgb(23,26,41)",
  },
  cardstyle: {
    //  height: "30vh",
    display: "flex",
    direction: "row",
    marginBottom: "20px",
  },
  addressContainer: {
    border: "1px dashed grey",
    height: "auto",
    backgroundColor: "",
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    },
  },
  locationIconContainer: {
    backgroundColor: "white",
    marginTop: "5vh",
    //  marginBottom: "auto",
    // padding: '20px',
    textAlign: "center",
  },
  locationIcon: {
    width: "40%",
    height: "40%",
    color: "",
  },
  addAddressButtonContainer: {
    // backgroundColor: 'red',
    padding: "2vh",
    textAlign: "center",
  },
  addAddressButton: {
    color: "rgb(23,26,41)",
    fontWeight: "bold",
    border: "1px solid rgb(23,26,41)",
  },
  address: {
    textAlign: "center",
    fontColor: "grey",
  },
  addressDisplay: {
    marginTop: "20px",
    fontColor: "rgb(23,26,41)",
    fontWeight: "bold",
    display: "block",
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  const [totalprice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [address, setAddress] = useState(null);
  const [restaurant, setRestaurant] = useState({});

  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let totalValue = 0;

  const FetchCartData = async () => {
    const res = await axios.get("http://localhost:5000/cart/getcart", {
      headers: headers,
    });
    setTotalPrice(res.data.totalAmount);
    setItems(res.data.cartFoodList);
    setRestaurant(res.data.restaurantDetails);
    return res;
    /* const res =  fetchUserCartDeatails();
    return res; */
  };

  useEffect(() => {
    (async function () {
      const result = await FetchCartData();
      setItems(result?.data.cartFoodList);
      setRestaurant(result?.data.restaurantDetails);
      setTotalPrice(result?.data.totalAmount);
    })();
  }, []);

  const handleDrawer = () => {
    if (drawer === true) setDrawer(false);
    else setDrawer(true);
  };

  const handleSubmit = (addData, e) => {
    e.preventDefault();
    setAddress(addData);
    setDrawer(false);
  };

  //Place order method
  const handlePlaceOrder = async (address) => {
    const res = await handleCartPlaceOrder(address);
    props.history.push("/myorders");
  };

  //increment data
  const handleIncrement = async (currentItem) => {
    const data = {
      foodId: currentItem.foodItem._id,
      restaurantId: restaurant.restaurantId,
    };

    await incrementCartItem(data);
    FetchCartData();
  };

  const handleDecrement = async (currentItem) => {
    const data = {
      foodId: currentItem.foodItem._id,
    };

    await decrementCartItem(data);
    FetchCartData();
    /*  await fetchUserCartDeatails(); */
  };

  const removeItem = async (currentItem) => {
    const data = {
      foodId: currentItem.foodItem._id,
    };

    const res = await removeCartItem(data);

    const response = await FetchCartData();
  };
  //Drawer Calling Const
  const drawerTag = (
    <DrawerExample
      open={drawer}
      close={handleDrawer}
      css={classes.drawerTransition}
      onSubmitData={handleSubmit}
      address={address}
      setAddress={setAddress}
    />
  );

  return (
    <div className={classes.root}>
      <NavAppBar />
      {items?.length > 0 ? (
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={8} lg={8}>
              <Paper className={classes.paper}>
                {/* first card */}
                {items?.map((item) => {
                  return (
                    <>
                      <Card
                        className={classes.cardstyle}
                        variant="outlined"
                        key={item._id}
                      >
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                              {item.foodItem.foodName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                              noWrap
                            >
                              {item.foodItem.foodDescription}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Rs. {item.foodItem.foodPrice}
                            </Typography>
                          </CardContent>

                          <Box display="flex" flexDirection="row">
                            <Button
                              className={classes.addTocart}
                              variant="contained"
                              onClick={() => {
                                removeItem(item);
                              }}
                            >
                              Remove Item
                            </Button>

                            <div className={classes.displayCounters}>
                              <div
                                className={classes.counter}
                                onClick={() => handleDecrement(item)}
                              >
                                -
                              </div>

                              <div className={classes.quantity}>
                                <b>{item.quantity}</b>
                              </div>
                              <div
                                className={classes.counter}
                                onClick={() => handleIncrement(item)}
                              >
                                +
                              </div>
                            </div>
                          </Box>
                        </div>

                        <CardMedia
                          justify="flex-end"
                          className={classes.cover}
                          image={item.foodItem.foodImage}
                          title="Item order"
                        />
                      </Card>
                    </>
                  );
                })}

                <b>
                  <hr />
                  <Grid item container justify="flex-end">
                    <Typography variant="h5">
                      <b>Total Price:{totalprice} </b>
                    </Typography>
                  </Grid>
                </b>
              </Paper>
            </Grid>
            {/* Add Address section */}
            <Grid item xs={4}>
              <Paper className={classes.paperAddress}>
                <Box
                  className={classes.addressContainer}
                  component="div"
                  display="flex"
                  flexDirection="column"
                >
                  <Box
                    className={classes.locationIconContainer}
                    component="div"
                  >
                    <LocationOnIcon
                      className={classes.locationIcon}
                    ></LocationOnIcon>

                    {address ? (
                      <>
                        <div className={classes.addressDisplay}>
                          <HomeIcon /> {address.streetAddress},
                          {address.landmark},{address.area} , {address.city},{" "}
                          {address.zip},{address.state}, {address.country}.
                        </div>
                        <hr /> <p>Total Amount: {totalprice}</p>
                      </>
                    ) : null}
                  </Box>
                  <Box
                    className={classes.addAddressButtonContainer}
                    component="div"
                  >
                    {!address ? (
                      <Button
                        className={classes.addAddressButton}
                        variant="outlined"
                        onClick={() => {
                          // nextStep();
                          handleDrawer();
                        }}
                      >
                        Proceed to checkout
                      </Button>
                    ) : (
                      <Button
                        className={classes.addAddressButton}
                        variant="outlined"
                        onClick={() => handlePlaceOrder(address)}
                      >
                        Place Order
                      </Button>
                    )}
                    {drawer === true ? drawerTag : null}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
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
                <h3>Empty Cart!!</h3>
              </Grid>
            </Grid>
          </Container>
        </>
      )}

      <FooterGrid />
    </div>
  );
}
