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
import NavAppBar from "./Navbar";
import FooterGrid from "./Footer";
import { grid } from "@material-ui/system";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    height: "auto",
    width:'auto',
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
const OrderSummary = () => {
  const classes = useStyles();
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
                  <Typography variant="h4">
                    Order Id: <b>#2876428712</b>
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
                          <TableCell>
                            <b>Quantity</b>
                          </TableCell>

                          <TableCell align="right">
                            <b>Price / item</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell component="th" align="right"scope="row">
                            Rs. 100
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <div className={classes.centralBorder}></div>
                <Grid
                  container
                  justify="flex-end"
                  style={{ marginTop: "20px" }}
                >
                  <Typography variant="h6">Total Amount : 2500</Typography>
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
