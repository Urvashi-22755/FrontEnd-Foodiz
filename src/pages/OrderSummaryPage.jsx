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
import NavAppBar from '../components/Navbar/NavAppBar';
import FooterGrid from "../components/Footer/Footer";
import OrderSummary from "../components/OrderSummary";
import CustomizedTimeline from "./../components/CustomizedTimeline";
import axios from "axios";
import OrderData from "./../data/OrdersData";
import DeliveryExecutiveDetails from "./../components/DeliveryExecutiveDetail";
// import Container from '@material-ui/core/Container';
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
  onlyOrderSummaryDisplay: {
    marginTop: "2%",
    width: "60%",
  },
}));

const OrderSummaryPage = (props) => {
  const classes = useStyles();
  const [orderData, setOrderData] = useState({});
  const [deliveryManDetails, setdeliveryManDetails] = useState([]);
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
      `http://localhost:5000/order/getorderdetailbyorderid/${orderId}`,
      { headers: headers }
    );
    console.log("Order Summary Page", res);
    return res.data;
  };

  console.log("Id of order", props.match.params.orderId);
  useEffect(() => {
    (async () => {
      const res = await FetchOrderByID();
      setOrderData(res.orderData);

      if (res.deliveryExecutiveData) {
        setdeliveryManDetails(res.deliveryExecutiveData);
        console.log("DELIVER MANNNNNNNN", res.deliveryExecutiveData);
      } else {
        console.log("in else eee");
      }

      console.log("response order sumary", res.orderData);
    })();
  }, []);

  //console.log('Order status in order summary',orderData.orderStatus)

  return (
    <>
      <NavAppBar />
      {!orderData ? (
        "No orders Placed "
      ) : (
        <div className={classes.root}>
          <Container>
            <Grid container spacing={2}>
              {orderData.orderStatus === "Completed" ||
              orderData.orderStatus === "Cancelled" ? (
                <Container className={classes.onlyOrderSummaryDisplay}>
                  <Grid container>
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                      <OrderSummary orderData={orderData} />
                      {deliveryManDetails != [] ? (
                        <DeliveryExecutiveDetails
                          page="completedOrder"
                          detail={deliveryManDetails}
                          status={orderData.orderStatus}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </Container>
              ) : (
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <OrderSummary orderData={orderData} />

                  {deliveryManDetails != [] &&
                  orderData?.orderStatus != "Placed" ? (
                    <DeliveryExecutiveDetails
                      page="currentOrder"
                      detail={deliveryManDetails}
                      status={orderData.orderStatus}
                    />
                  ) : null}
                </Grid>
              )}

              <br />
              {orderData.orderStatus === "Completed" ||
              orderData.orderStatus === "Cancelled" ? null : (
                <>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="h4" color="Primary">
                      Track your Order Here!
                    </Typography>
                    <CustomizedTimeline status={orderData?.orderStatus} />
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </div>
      )}

      <FooterGrid />
    </>
  );
};
export default OrderSummaryPage;
