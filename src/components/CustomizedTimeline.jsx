import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1000px",
    backgroundColor: "red",
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: "green",
  },
  orderAccepted: {
    width: "auto",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + `images/orderAccepted.png`
    } )`,
  },
  timeLineItem: {
    height: "150px",
  },
}));

export default function CustomizedTimeline(props) {
  const classes = useStyles();

  const { status } = props;
  console.log("My sttaus", status);
  /*  const allStatus = ["Placed", "Accepted", "Out For Delivery", "Completed"];

  const cuuStatus = allStatus.indexOf(status);
  console.log("cuurr status", cuuStatus);
 */
  return (
    <div>
      <Timeline align="alternate">
        <TimelineItem className={classes.timeLineItem}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {/*  9:30 am */}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            {status == "Placed" ||
            status == "Accepted" ||
            status == "Out For Delivery" ||
            status == "Completed" ? (
              <TimelineDot style={{ backgroundColor: "green" }}>
                <CheckCircleOutlineIcon style={{ color: "white" }} />
              </TimelineDot>
            ) : (
              <TimelineDot style={{ backgroundColor: "white" }}>
                <CheckCircleOutlineIcon style={{ color: "grey" }} />
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {status == "Placed" ||
            status == "Accepted" ||
            status == "Out For Delivery" ||
            status == "Completed" ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="body2" component="h">
                  Placed
                </Typography>
                <Typography>Wait till your order arrives!</Typography>
              </Paper>
            ) : null}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className={classes.timeLineItem}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {/*  10:00 am */}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            {status == "Accepted" ||
            status == "Out For Delivery" ||
            status == "Completed" ? (
              <TimelineDot style={{ backgroundColor: "green" }}>
                <RestaurantIcon />
              </TimelineDot>
            ) : (
              <TimelineDot style={{ backgroundColor: "grey" }}>
                <RestaurantIcon />
              </TimelineDot>
            )}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {status == "Accepted" ||
            status == "Out For Delivery" ||
            status == "Completed" ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Accepted
                </Typography>
                <Typography>The Pans are on Flame!</Typography>
              </Paper>
            ) : null}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className={classes.timeLineItem}>
          <TimelineSeparator>
            {status == "Out For Delivery" || status == "Completed" ? (
              <TimelineDot style={{ backgroundColor: "green" }}>
                <MotorcycleIcon />
              </TimelineDot>
            ) : (
              <TimelineDot style={{ backgroundColor: "grey" }}>
                <MotorcycleIcon />
              </TimelineDot>
            )}

            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            {status == "Out For Delivery" || status == "Completed" ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Out for Delivery
                </Typography>
                <Typography>Just a little wait!</Typography>
              </Paper>
            ) : null}
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className={classes.timeLineItem}>
          <TimelineSeparator>
            {status == "Completed" ? (
              <TimelineDot style={{ backgroundColor: "green" }}>
                <CheckCircleIcon />
              </TimelineDot>
            ) : (
              <TimelineDot style={{ color: "grey" }}>
                <CheckCircleIcon />
              </TimelineDot>
            )}
          </TimelineSeparator>
          <TimelineContent>
            {status == "Completed" ? (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Handed Over
                </Typography>
                <Typography>
                  Grab & Enjoy your Meal! <br />
                  See you soon{" "}
                </Typography>
              </Paper>
            ) : null}
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
