import React from "react";
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
const OrderSummaryPage = () => {
  const classes = useStyles();
  return (
    <>
      <NavAppBar />
      <div className={classes.root}>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <OrderSummary />
            </Grid>
            <Grid item lg={6}  md={6} sm={12} xs={12}>
              {/* Order Timeline */}
              <Typography variant='h4' color='Primary'>Track your Order Here!</Typography><br />
              <CustomizedTimeline />
            </Grid>
          </Grid>
        </Container>
        <FooterGrid />
      </div>
    </>
  );
};
export default OrderSummaryPage;
