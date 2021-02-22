import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    height:'70px'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: "rgb(23, 26, 41)",
    flexGrow: 1
  }
}));

export default function NavAppBar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar className={classes.root}>
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to={`/`}>
                <img
                  width="60"
                  height="60"
                  src="https://img.pngio.com/sandwich-bread-food-free-vector-graphic-on-pixabay-food-animated-png-781_720.png"
                />
              </Link>
            </Typography>
            <Link
              style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }}
              to={`/login/`}
            >
              <Button color="inherit">
                <PersonOutlineOutlinedIcon /> Sign In
              </Button>
            </Link>

            <Link style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }} to={`/deliverypage/`}>
              <Button color="inherit">Delivery</Button>
            </Link>
            {/*  <Link
              style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }}
              to={`/login/`}
            >
              <Button color="inherit"><PersonOutlineOutlinedIcon />SignUp</Button>
            </Link> */}
            {/*  <Link
              style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }}
              to={`/profile/`}
            >
              {" "}
              <Button color="inherit">Profile</Button>
            </Link> */}
            <Link
              style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }}
              to={`/cart/`}
            >
              <Button color="inherit">
                <ShoppingCartOutlinedIcon />
                Cart
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
}
