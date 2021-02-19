import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#171A29",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavAppBar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/login/`}
          >
            {" "}
            <Button color="inherit">Login</Button>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/login/`}
          >
            <Button color="inherit">SignUp</Button>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/profile/`}
          >
            {" "}
            <Button color="inherit">Profile</Button>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/cart/`}
          >
            {" "}
            <Button color="inherit">Cart</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
}
