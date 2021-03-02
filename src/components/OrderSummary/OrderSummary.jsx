import React from "react";
import Container from "@material-ui/core/Container";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from './OrderSummary.style';

const OrderSummary = (props) => {
  const classes = useStyles();

  const { orderData } = props;
  const foodList = orderData.foodList;

  console.log("Order Data in Order Summary", orderData);

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Grid spacing={2}>
            {/*     <Grid item lg={8}>
              Product Details section
            </Grid> */}
            {/* <Grid item lg={4} md={4} sm={4} xs={4}> */}

            <Paper className={classes.paper}>
              <Grid item conatiner lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5">
                  <b>{orderData?.restaurantDetails?.restaurantName}</b>
                </Typography>
                <Typography variant="h5">
                  Order Id: <b>#{orderData._id}</b>
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                className={classes.sectionGrid}
              />
              <Grid item lg={12}>
                Your order has been placed successfully!
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                className={classes.sectionGrid}
              />
              <div className={classes.centralBorder}></div>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                className={classes.sectionGrid}
              />
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                className={classes.sectionGrid}
              />
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                className={classes.sectionGrid}
              />
              <Grid item container lg={12} md={12} sm={12} xs={12}>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
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
                      {foodList?.map((row) => (
                        <TableRow key={row.foodItem._id}>
                          <TableCell component="th" scope="row">
                            {row.foodItem.foodName}
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell component="th" align="right" scope="row">
                            Rs. {row.foodItem.foodPrice}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <div className={classes.centralBorder}></div>
              <Grid container justify="flex-end" style={{ marginTop: "20px" }}>
                <Typography variant="h6">
                  Total Amount : {orderData.totalAmount}
                </Typography>
              </Grid>
            </Paper>
            {/*  </Grid> */}
          </Grid>
        </Container>
        {/*  <FooterGrid /> */}
      </div>
    </>
  );
};
export default OrderSummary;
