import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavAppBar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import FooterGrid from "../components/Footer";
import Button from "@material-ui/core/Button";
import { Grid, Paper } from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
import SimpleRating from "../components/Rating";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    //margin: "2%",
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
    marginTop: "12%",
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
  deliveryManDetails: {
    marginTop: "5%",
    textAlign: "left",
    },
    editHeading:{
        textAlign:"center",
        
    },
    addRating:{
        fontWeight:'bold',
        fontSize:"20px",
        color:"#171a29"
      },
      ratingDialog:{
        padding:"20px"
      },
}));

function DeliveryExecutiveDetails(props) {
  const classes = useStyles();
  const { page, detail } = props;
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState({});

  //rating modal open
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Grid container>
            <Grid item lg={12} xs={12} md={12} sm={12}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Paper className={classes.paper} id="1234">
                  <Grid>
                    {/* Title */}
                    <Grid item container direction="row" lg={12}>
                      <Grid item lg={2} md={2} sm={4} xs={4}>
                        <div className={classes.imgContainer}>
                          <DirectionsBikeOutlinedIcon
                            style={{ fontSize: "50px", color: "red" }}
                          />
                        </div>
                      </Grid>

                      <Grid item lg={8} md={8} sm={8} xs={8} spacing={8}>
                        <b>
                          <p className={classes.restaurantTitle}>
                            Your Delivery Person Details
                          </p>
                        </b>
                      </Grid>
                      <Grid item lg={2} md={2} sm={12} xs={12}>
                        <p className={classes.rating}>
                          <StarRateIcon /> 5.0
                        </p>
                      </Grid>
                    </Grid>

                    <hr />
                    {/* Content */}
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      className={classes.deliveryManDetails}
                    >
                      <p>
                        <b>Name:</b>
                        <strong>
                          {" "}
                          {detail.firstName} {detail.lastName}
                        </strong>
                      </p>
                      <p>
                        <b>Contact No:</b>
                        <strong>{detail.mobileNumber}</strong>
                      </p>
                      <p>
                        <b>Vehicle Number:</b>
                        <strong>
                          {detail?.deliveryExecutive?.vehicleNumber}
                        </strong>
                      </p>
                      <p></p>
                      <hr />
                    </Grid>

                    {/* Track Order and Order SUmmary */}
                    <Grid
                      item
                      container
                      justify="flex-end"
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      {page === "completedOrder " ? (
                        <Button
                          //onClick={() => handleOrderSummary(order._id)}
                          className={classes.acceptButton}
                          variant="contained"
                          color="secondary"
                        >
                          Rate
                        </Button>
                      ) : null}

                      {/* REMOVE THIS LATERRRR */}

                      <Button
                        onClick={handleClickOpen}
                        className={classes.acceptButton}
                        variant="contained"
                        color="secondary"
                      >
                        Rate
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Rating Dailog */}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle className={classes.editHeading}>
                    <p className={classes.addRating}>Add Rating</p>
                  </DialogTitle>

                  <DialogContent className={classes.ratingDialog}>
                    <SimpleRating
                    //  handleSubmitOfRating={handleSubmitOfRating}
                      onClose={handleClose}
                    />{" "}
                    {console.log("Value of stars", ratings)}
                  </DialogContent>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
export default DeliveryExecutiveDetails;
