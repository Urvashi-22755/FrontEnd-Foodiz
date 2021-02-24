import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavAppBar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import FooterGrid from "../components/Footer";
import Button from "@material-ui/core/Button";
import { Grid, Paper } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";

/* styles */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2%",
    //margin: "2%",
    // backgroundColor:'#e4e3ff'
  },
  container: {
    //  border: "1px solid rgb(23,26,41)",
  },
  paper: {
    padding: theme.spacing(4),
    width: "100%",
    margin: "4%",
  },
  acceptButton: {
    backgroundColor: "#171a29",
    float: "right",
    "&:hover": {
      backgroundColor: "#171a29",
    },
  },
  restaurantTitle: {
    fontSize: "18px",
  },
  rating: {
    marginTop: "5%",
    width: "60px",
    backgroundColor: "#48c479",
    color: "white",
  },
}));

function MyOrders(props) {
  const classes = useStyles();

  /* redirect to order Summary */
  const handleOrderSummary = (id) => {
    console.log(id);
    props.history.push("/order-summary/" + id);
  };

  return (
    <>
      <div className={classes.root}>
        <NavAppBar />

        <Container className={classes.container} maxWidth="lg">
          <Grid
            container
            /*  direction="column"
            alignItems="center"
            justify="center" */
            spacing={2}
          >
            <Grid item lg={6}>
              {/* this paper is to be mapped!! */}
              <Paper className={classes.paper} id="1234">
                <Grid conatiner spacing={2}>
                  {/* Title */}
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

                  {/* Content */}
                  <Grid item lg={12}>
                    <p>Item name X Quantity | Item name X Quantity</p>
                    <p> Item name X Quantity | Item name X Quantity </p>
                    <p></p>
                    <p></p>
                    <b>Total Amount: Rs 1000</b>
                  </Grid>
                  <hr />

                  {/* Track Order and Order SUmmary */}
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
            </Grid>

            {/* Second Part */}
            <Grid item lg={6} xs={3} md={3}>
              <Paper className={classes.paper} id="1234">
                <Grid conatiner spacing={2}>
                  {/* Title */}
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

                  {/* Content */}
                  <Grid item lg={12}>
                    <p>Item name X Quantity | Item name X Quantity</p>
                    <p> Item name X Quantity | Item name X Quantity </p>
                    <p></p>
                    <p></p>
                    <b>Total Amount: Rs 1000</b>
                  </Grid>
                  <hr />

                  {/* Track Order and Order SUmmary */}
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
            </Grid>
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
