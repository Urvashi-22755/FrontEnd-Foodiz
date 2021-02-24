import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NavAppBar from "../components/Navbar";
import FooterGrid from "../components/Footer";
import OrderSummary from "../components/OrderSummary";
import CustomizedTimeline from "./../components/CustomizedTimeline";
import axios from "axios";
import OrderData from "./../data/OrdersData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: "2%",
  },
  paper: {
    height: "auto",
    padding: "2vw",
  },
  orderBackground: {
    padding: "20px",
  },
  table: {
    minWidth: "auto",
    padding: "10%",
  },
  sectionGrid: {
    margin: "20px",
  },
  centralBorder: {
    borderBottom: "2px solid #171A29",
  },
}));

const OrderSummaryPage = (props) => {
  const classes = useStyles();
  const [orderData, setOrderData] = useState({});
  //order Id
  const orderId = props.match.params.orderId;

  //header data
  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const FetchOrderByID = async () => {
    const res = await axios.get(
      `http://localhost:5000/order/getOrderDetailByOrderId/${orderId}`,
      { headers: headers }
    );
    return res.data;
  };

  console.log("Id of order", props.match.params.orderId);
  useEffect(() => {
    (async () => {
      const res = await FetchOrderByID();
      setOrderData(res);
      console.log("response order sumary", res);
    })();
  }, []);

  console.log('Order status in order summary',orderData.orderStatus)

  return (
    <>
      <NavAppBar />
      {!orderData ? (
        "No orders Placed "
      ) : (
        <div className={classes.root}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <OrderSummary orderData={orderData} />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {/* Order Timeline */}
                <Typography variant="h4" color="Primary">
                  Track your Order Here!
                </Typography>
                <br />
                  <CustomizedTimeline status={ orderData?.orderStatus}/>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}

      <FooterGrid />
    </>
  );
};
export default OrderSummaryPage;
