import { makeStyles} from "@material-ui/core/styles";




export let useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "3%",
      //  padding: "2%",
      height: "auto",
      backgroundColor: "#d8dee8",
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
  
      color: "#dae2f0",
      height: "auto",
      // height: "auto",
      width: "auto",
      backgroundColor: "#ffffff",
    },
    tabs: {
      marginTop: "6%",
      paddingTop: "30%",
      width: "auto",
      backgroundColor: "#2c446e",
      height: "90vh",
    },
    tabtext: {
      fontSize: "20px",
      color: "#d8dee8",
      textAlign: "left",
    },
    labelContainer: {
      width: "auto",
      padding: 2,
    },
    iconLabelWrapper: {
      flexDirection: "row",
      // padding: '20px'
    },
  
    tabposition: {
      padding: "20%",
    },
  }));