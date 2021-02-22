import React from "react";
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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1000px",
    backgroundColor: "red",
  },
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: 'green',
  },
  orderAccepted: {
    width: "auto",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + `images/orderAccepted.png`
    } )`,
  },
  timeLineItem: {
    height: "150px",
  }
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
    <div>
      <Timeline align="alternate" >
        <TimelineItem  className={classes.timeLineItem}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              9:30 am
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <CheckCircleOutlineIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Placed
              </Typography>
              <Typography>Wait till your order arrives!</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem  className={classes.timeLineItem}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              10:00 am
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: "orange" }}>
              <RestaurantIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Accepted
              </Typography>
              <Typography>The Pans are on Flame!</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem  className={classes.timeLineItem}>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <MotorcycleIcon />
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Out for Delivery
              </Typography>
              <Typography>Just a little wait!</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem  className={classes.timeLineItem}>
          <TimelineSeparator>
            <TimelineDot variant="outlined">
              <CheckCircleIcon style={{color:'green'}}/>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Handed Over
              </Typography>
              <Typography>Grab & Enjoy your Meal! <br />See you soon </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
