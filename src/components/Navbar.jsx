import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { decodeToken } from "../services/authUser";
import { logout } from "./../services/authUser";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#171a29",
    height: "70px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    flexGrow: 1,
  },
  navLink: {
    textDecoration: "none",
    color: "white",
  },
  navbarLinks: {
    marginRight: "2vw",
    fontSize:"16px",
    padding:"10px",
    "&:hover": {
      color: "#f5d6a4",
    },
  },
}));

export default function NavAppBar() {
  const classes = useStyles();

  const token = localStorage.getItem("token");
  let authenticated = "";
  if (token) {
    authenticated = decodeToken(token);
    console.log("NAVBAR JSX", authenticated.role);
  } else {
    <Redirect to="/"></Redirect>;
  }
  const handleLogout = () => {
    logout();
  };

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

            {/* Sign  in & sign out btn */}

            {authenticated ? (
              <Box display="flex" flexDirection="flex-end">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/profile`}
                >
                  <div className={classes.navbarLinks}>User Name </div>
                </Link>

                {/* ROLE == NU */}
                {authenticated.role === "NU" ? (
                  /* orders */
                  <>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/myorders`}
                    >
                      <div className={classes.navbarLinks}><ListAltOutlinedIcon style={{marginRight:"5px"}}/>Orders</div>
                    </Link>

                    {/* cart page */}
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/cart`}
                    >
                      <div className={classes.navbarLinks}><ShoppingCartOutlinedIcon style={{marginRight:"5px"}}/>Cart</div>
                    </Link>
                  </>
                ) : null}

                {/* ROLE == DE */}

                 {authenticated.role === "DE" ? (
                  /* orders */
                  <>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/deliverypage`}
                    >
                      <div className={classes.navbarLinks}><ListAltOutlinedIcon style={{marginRight:"5px"}}/>Your Orders</div>
                    </Link>

                   
                  </>
                ) : null}

                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/`}
                >
                  <div
                    className={classes.navbarLinks}
                    color="inherit"
                    onClick={handleLogout}
                  >
                    <ExitToAppIcon style={{ marginRight: "5px" }} />
                    Sign Out
                  </div>
                </Link>
              </Box>
            ) : (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/login/`}
              >
                <div className={classes.navbarLinks}>
                  <PersonOutlineOutlinedIcon /> Sign In
                </div>
              </Link>
            )}

            {/* <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/deliverypage/`}
            >
              <Button color="inherit">Delivery</Button>
            </Link> */}

            {/* <Link style={{ textDecoration: "none", color: "rgb(23, 26, 41)" }} to={`/profile`}>
              <Button color="inherit">Profile</Button>
            </Link> */}

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
            {/*  <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/cart/`}
            >
              <Button color="inherit">
                <ShoppingCartOutlinedIcon />
                Cart
              </Button>
            </Link> */}
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
}
