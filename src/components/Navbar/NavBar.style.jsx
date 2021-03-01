import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

export let StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 15,
    border: `2px solid #171a29`,
    padding: "0 4px",
  },
}))(Badge);

export let useStyles = makeStyles((theme) => ({
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
