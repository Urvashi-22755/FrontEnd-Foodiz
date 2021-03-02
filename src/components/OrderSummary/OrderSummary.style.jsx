import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      textAlign: "center",
      marginTop:"2%"
    },
    paper: {
      height: "auto",
      width: "auto",
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
  