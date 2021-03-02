import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { decodeToken } from "../../services/authUser";
import { logout } from "../../services/authUser";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { fetchUserDetails } from "../../services/UserService";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Badge from "@material-ui/core/Badge";
import jwt_decode from "jwt-decode";
import { fetchUserCartDetails } from "../../services/CartService";
import { StyledBadge } from "./NavBar.style";
import { useStyles } from "./NavBar.style";

export default function NavAppBar() {
  const classes = useStyles();
  const [userName, setuserName] = useState();
  const [cartLength, setcartLength] = useState(0);

  const token = localStorage.getItem("token");

  const headers = {
    // "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let authenticated = "";

  if (token) {
    authenticated = decodeToken(token);
  } else {
    <Redirect to="/"></Redirect>;
  }

  /* User Name Data!! */
  async function fetchUserData() {
    let userDetail = await fetchUserDetails();
    setuserName(userDetail.firstName);
  }

  if (authenticated) {
    setInterval(fetchUserData, 1000);
  }

  /* Cart Data Detail!! */
  async function fetchCartData() {
    console.log("IN FRTCH");
    let cartDetail = {};
    cartDetail = await fetchUserCartDetails(headers);
    if (cartDetail.cartFoodList) {
      setcartLength(cartDetail.cartFoodList.length);
    } else {
      setcartLength(0);
    }

    /*    { cartDetail === {} ?  setcartLength(0): setcartLength(cartDetail.cartFoodList.length)  } */
  }
  /*  if (authenticated) {
    setInterval(fetchCartData, 1000);
  } */

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <AppBar className={classes.root}>
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <div className={classes.iconSection}>
                <Link to={`/`}>
                  <img
                    width="50"
                    height="50"
                    src={process.env.PUBLIC_URL + "images/foodimage.jfif"}
                  />
                </Link>
              </div>
            </Typography>

            {/* Sign  in & sign out btn */}

            {authenticated ? (
              <Box
                display="flex"
                container
                flexDirection="row"
                className={classes.links}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/profile`}
                >
                  <div className={classes.navbarLinks}>
                    <AccountCircleOutlinedIcon
                      style={{ marginRight: "2px", marginBottom: "3px" }}
                    />{" "}
                    {userName}
                  </div>
                </Link>

                {/* ROLE == NU */}
                {authenticated.role === "NU" ? (
                  /* orders */
                  <>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/allrestaurants`}
                    >
                      <div className={classes.navbarLinks}>
                        <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                        Restaurants
                      </div>
                    </Link>

                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/myorders`}
                    >
                      <div className={classes.navbarLinks}>
                        <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                        Track Orders
                      </div>
                    </Link>

                    {/* cart page */}
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/cart`}
                    >
                      <div className={classes.navbarLinks}>
                        <StyledBadge
                          badgeContent={cartLength > 0 ? cartLength : 0}
                          color="secondary"
                          showZero
                        >
                          <ShoppingCartOutlinedIcon
                            style={{ marginRight: "5px" }}
                          />
                        </StyledBadge>
                        <span className={classes.navbarLinkCard}>Cart</span>
                      </div>
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
                      <div className={classes.navbarLinks}>
                        <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                        Placed Orders
                      </div>
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
                    style={{ marginRight: "-20px" }}
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
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
}
