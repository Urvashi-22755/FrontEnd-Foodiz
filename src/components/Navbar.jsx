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
import { decodeToken } from "../services/authUser";
import { logout } from "./../services/authUser";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { fetchUserDeatails } from "./../services/UserService";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Badge from "@material-ui/core/Badge";
import jwt_decode from "jwt-decode";
import { fetchUserCartDeatails } from "../services/CartService";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 15,
    border: `2px solid #171a29`,
    padding: "0 4px",
  },
}))(Badge);

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
  links: {
    marginLeft: "100px",
  },
  navbarLinks: {
    marginRight: "2vw",
    fontSize: "16px",
    padding: "10px",
    "&:hover": {
      color: "#f5d6a4",
    },
    iconSection: {
      //padding: "20px",
     // width: "60px",
    //  height: "60px",
      marginBottom: "20%",
    },
  },
  navbarLinkCard: {
    marginLeft: "10px",
  },
}));

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
    let userDetail = await fetchUserDeatails(headers);
    setuserName(userDetail.firstName);
  }
  fetchUserData();

  /* Cart Data Detail!! */
  async function fetchCartData() {
    let cartDetail = {};
    cartDetail = await fetchUserCartDeatails(headers);
    if (cartDetail.cartFoodList) {
      setcartLength(cartDetail.cartFoodList.length);
    } else {
      setcartLength(0);
    }

    /*    { cartDetail === {} ?  setcartLength(0): setcartLength(cartDetail.cartFoodList.length)  } */
  }
  // if (authenticated) { setInterval(fetchCartData, 500); }

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
                    src={process.env.PUBLIC_URL + 'images/LOGO_PROJECT.png'}
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
                      to={`/myorders`}
                    >
                      <div className={classes.navbarLinks}>
                        <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                        Orders
                      </div>
                    </Link>

                    {/* cart page */}
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/cart`}
                    >
                      <div className={classes.navbarLinks}>
                        <StyledBadge badgeContent={(cartLength > 0) ? cartLength : 0} color="secondary" showZero>
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
