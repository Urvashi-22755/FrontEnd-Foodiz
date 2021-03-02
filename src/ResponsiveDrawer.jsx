import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

/* MYYYYYYY */
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link, Redirect } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { decodeToken } from "./services/authUser";
import { logout } from "./services/authUser";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { fetchUserDetails } from "./services/UserService";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { fetchUserCartDetails } from "./services/CartService";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Badge from "@material-ui/core/Badge";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 15,
    border: `2px solid #171a29`,
    padding: "0 4px",
  },
}))(Badge);
const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
   // backgroundColor: "#171a29",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#171a29",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },

  /* MYYYY */
  menuButton: {
    marginLeft: theme.spacing(2),
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
    marginLeft: "50px",
  },
  navbarLinks: {
    marginRight: "2vw",
    fontSize: "16px",
    padding: "10px",
    "&:hover": {
      color: "#f5d6a4",
    },
    iconSection: {
      marginBottom: "20%",
    },
  },
  navbarLinkCard: {
    marginLeft: "10px",
  },

  navbarstyle: {
    display: "flex",
  },
  hideNavbar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navbarDrawerLinks: {
    padding: "20px",
    fontSize: "16px",
    "&:hover": {
      color: "#171a29",
    },
  },
  imagesize: {
    objectFit: "cover",
  },
  title: {
    color: "white",
    marginTop: "2%",
    /*  flexGrow: 1, */
  },
}));
function ResponsiveDrawer() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  /* MYYYYY */

  /* MYYYYY */
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
    let cartDetail = {};
    cartDetail = await fetchUserCartDetails(headers);
    if (cartDetail.cartFoodList) {
      setcartLength(cartDetail.cartFoodList.length);
    } else {
      setcartLength(0);
    }

    /*    { cartDetail === {} ?  setcartLength(0): setcartLength(cartDetail.cartFoodList.length)  } */
  }
  if (authenticated) {
    setInterval(fetchCartData, 1000);
  }

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <div>
      {authenticated ? (
        <Box
          display="flex"
          container
          flexDirection="column"
          className={classes.links}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/profile`}
            onClick={handleDrawerToggle}
          >
            <div className={classes.navbarDrawerLinks}>
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
                style={{ textDecoration: "none", color: "black" }}
                to={`/allrestaurants`}
                onClick={handleDrawerToggle}
              >
                <div className={classes.navbarDrawerLinks}>
                  <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                  Restaurants
                </div>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/myorders`}
                onClick={handleDrawerToggle}
              >
                <div className={classes.navbarDrawerLinks}>
                  <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                  Track Orders
                </div>
              </Link>

              {/* cart page */}
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/cart`}
                onClick={handleDrawerToggle}
              >
                <div className={classes.navbarDrawerLinks}>
                  <StyledBadge
                    badgeContent={cartLength > 0 ? cartLength : 0}
                    color="secondary"
                    showZero
                  >
                    <ShoppingCartOutlinedIcon style={{ marginRight: "5px" }} />
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
                style={{ textDecoration: "none", color: "black" }}
                to={`/deliverypage`}
                onClick={handleDrawerToggle}
              >
                <div className={classes.navbarDrawerLinks}>
                  <ListAltOutlinedIcon style={{ marginRight: "5px" }} />
                  Placed Orders
                </div>
              </Link>
            </>
          ) : null}

          <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
            <div
              className={classes.navbarDrawerLinks}
              color="inherit"
              onClick={handleLogout}
              onClick={handleDrawerToggle}
            >
              <ExitToAppIcon />
              Sign Out
            </div>
          </Link>
        </Box>
      ) : (
        <Link style={{ textDecoration: "none", color: "" }} to={`/login/`}>
          <div className={classes.navbarDrawerLinks}>
            <PersonOutlineOutlinedIcon /> Sign In
          </div>
        </Link>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Box display="flex">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Box flexGrow={1} >
              <Link to={`/`} style={{marginTop:"2%"}}>
                <img
                  width="200px"
                  height="80px"
                  className={classes.imagesize}
                  src={process.env.PUBLIC_URL + "images/Comida_Logo.png"}
                />
              </Link>
            </Box>
            <Box
              flexGrow={1}
              display={{ md: "none" }}
              style={{ marginLeft: "50%", fontSize: "20px" }}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box className={classes.hideNavbar}>
              {/* SIGN IN & SIGN OUTT */}
              {/* Sign  in & sign out btn */}

              {authenticated ? (
                <Box
                  display="flex"
                  container
                  // justifyContent="flex-end"
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
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default ResponsiveDrawer;
