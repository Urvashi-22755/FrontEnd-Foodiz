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
import FooterGrid from "../components/Footer";
import NavAppBar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:'2%',
    //margin: "2%",
    // backgroundColor:'#e4e3ff'
  },
  paper: {
  
    padding: theme.spacing(4),
     border: "1px solid rgb(23,26,41)",
    // height: "50vh",
    //textAlign: "center",
    // color: theme.palette.text.secondary,
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

  const data = foodData();

  let totalValue = 0;

  useEffect(async () => {
    await setItems(data);
    calculateTotalPrice(items);
  }, []);

  const handleDrawer = () => {
    if (drawer === true) setDrawer(false);
    else setDrawer(true);
  };

  const handleSubmit = (addData) => {
    //  e.preventDefault();
    console.log("On Submit Data from drawee:", typeof addData);
    setAddress(addData);
    setDrawer(false);
  };
  const handlePlaceOrder = (items, address) => {
    console.log("order for items", items);
    console.log("delivery address", address);
    props.history.push('/order-summary');
    //redirection to order Summary Page
  };

  const calculateTotalPrice = (newData) => {
    totalValue = 0;
    newData.map((item) => {
      if (item.quantity > 0) return (totalValue += item.price * item.quantity);
    });
    setTotalPrice(totalValue);
  };

  //increment data
  const handleIncrement = (currentItem) => {
    const newData = [...items];
    const index = newData.indexOf(currentItem);
    console.log("index Of", index);
    newData[index].quantity++;
    calculateTotalPrice(newData);
    setItems(newData);
  };

  const handleDecrement = (currentItem) => {
    const newData = [...items];
    const index = newData.indexOf(currentItem);
    console.log("index Of", index);
    if (newData[index].quantity > 0) newData[index].quantity--;
    if (newData[index].quantity === 0) newData.splice(index, 1);

    calculateTotalPrice(newData);
    setTotalPrice(totalValue);
    setItems(newData);
  };

  const removeItem = (item) => {
    const newData = [...items];
    const index = newData.indexOf(item);
    newData.splice(index, 1);
    calculateTotalPrice(newData);
    setItems(newData);
    console.log(newData);
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
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={8} lg={8}>
            <Paper className={classes.paper}>
              {/* first card */}

              {items.map((item) => (
                <Card className={classes.cardstyle} variant="outlined">
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        noWrap
                      >
                        {item.description}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Rs. {item.price}
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
                    image={item.imageUrl}
                    title="Item order"
                  />
                </Card>
              ))}

              <b>
                <hr />
                <Box display="flex" direction="row-reverse">
                  <Typography variant="h5">
                    <b>Total Price:{totalprice} </b>
                  </Typography>
                </Box>
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
                <Box className={classes.locationIconContainer} component="div">
                  <LocationOnIcon
                    className={classes.locationIcon}
                  ></LocationOnIcon>

                  {address ? (
                    <>
                      <div className={classes.addressDisplay}>
                        <HomeIcon /> {address.FlatNo}, {address.locality},{" "}
                        {address.street} <br /> {address.landmark},{" "}
                        {address.zipCode}.
                      </div>
                      <hr /> <p>Total Amount: {totalprice}</p>
                    </>
                  ) : null}
                </Box>
                <Box
                  className={classes.addAddressButtonContainer}
                  component="div"
                >
                  {/*   <Button
                    className={classes.addAddressButton}
                    variant="outlined"
                    onClick={() => {
                      // nextStep();
                      handleDrawer();
                    }}
                  >
                    Proceed to checkout
                  </Button> */}
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
                      onClick={() => handlePlaceOrder(items, address)}
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
      <FooterGrid />
    </div>
  );
}
