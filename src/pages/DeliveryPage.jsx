import React,{useState} from 'react';
import NavAppBar from '../components/Navbar';
import FooterGrid from '../components/Footer';
import { makeStyles } from "@material-ui/core/styles";
import foodData from "../data/Restaurants";
import OrderData from '../data/OrdersData';
import { fade, Grid, Card } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container"
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: '2%'
    // backgroundColor: "#2c446e",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // backgroundColor: '#171a29',
    color: '#171a29',

    "&:hover":{
      // backgroundColor: '#171a29',
      color: '#171a29',
    }
  },

  formselect:{
      color: '#171a29'
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'left',
    marginTop: '5%',
    color: 'white',
    backgroundColor: 'white',
    height: 'auto',
    borderRadius: '20px',
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  orderDetails:{
    padding: '3%',
    // marginTop: '%',
    color: '#171a29',
    fontWeight: 600,
    height: '20vh',
    borderRadius: '15px',
    backgroundColor: 'white',
   
  
  },


  orderDetailsDisplay:{
    padding: '10%',
    marginTop: '4%',
    color: '#171a29',
    fontWeight: 600,
    height: '40vh',
    backgroundColor: 'white',
    borderRadius: '25px',
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },


  acceptButton:{
    backgroundColor: '#171a29',
    float: 'right',
    "&:hover":{
      backgroundColor: '#171a29'
    },
    marginTop: '8%'
  },
  statusSelect:{
    marginTop: '10%',
     float: 'left'
  },
  
  deliveryImageDiv:{
    backgroundColor: '#171a29',
    textAlign: 'center',
       width: '100%',
          height: '60vh'
      },
    
      deliveryImg:{
            width: '50%',
            marginTop: '5%',
            borderRadius: '15px',
            height: '40vh'
      },


    
  
}));





export default function DeliveryPage(){
  const classes = useStyles();
  const restaurants = foodData();
  const orders = OrderData();
// console.log(orders);

      //empty array
       const [orderarray,setorderArray] = useState([]);
  
      //setting the text of a button
       const [buttontext, setbuttonText] = useState('Accept');


// const {allorders} = orders;

const  handleOrders = (order) => {
    console.log(orders);
    setorderArray(arr => [...arr, order]);

    const index = orders.indexOf(order);
    console.log(index);
    console.log(orders[index]._id);
    console.log(order._id);
    
  if(orders[index]._id === order._id){
    //setbuttonText('Accepted');
     console.log('matched');

  }
    
    // acceptedOrders.push(order);
}
const [state, setState] = React.useState({
  status: '',
  name: 'hai',
});

const handleChange = (event) => {
  const name = event.target.name;
  setState({
    ...state,
    [name]: event.target.value,
  });
};



  return(
    <React.Fragment>
      <NavAppBar></NavAppBar>

      <div  className={classes.root}>   
      <div className={classes.deliveryImageDiv}>
            <img src='https://image.freepik.com/free-vector/food-delivery-staff-ride-motorcycles-deliver-food-during-confinement-home-from-corona-virus_68708-821.jpg'  className={classes.deliveryImg} />

            </div>
         <Container maxWidth="lg">
            <Grid container spacing={3}>
               <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3}>

                <Grid item xs={12} sm={12} md={12} lg={5}>

{/*                   
                    <Grid container spacing={3}>
                  <Grid item container xs={12} sm={12} md={12} lg={12} spacing={3}>
                    <Paper className={classes.paper}>xs=12</Paper>
                  </Grid>
                   </Grid> */}



            {orders.map((order) => (

              <Grid item xs={12} sm={6} md={6} lg={12}>

                    <Paper className={classes.paper}>
                <div className={classes.orderDetails}>
                <div>Order Id: <b>#2876428712</b> </div>
                <div> Restaurant Name: <b>Sankalp Restaurant</b></div>
                    <div>PickUp Address: <b>{order.restLocation} Chiloda Gujarat</b></div>
                    <div> Drop address: <b>{order.orderLocation}</b></div>

                    <div>
                    <Button onClick={()=>handleOrders(order)} 
                    className={classes.acceptButton} variant="contained" color="secondary">
                      { buttontext}
                  </Button>
                  </div>
                </div>
                </Paper>
              </Grid>
            ))}

                      
                      
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={7}>
                   
            {orderarray.map((Acceptedorder) => (
              <Grid item xs={12} sm={6} md={6} lg={12}>
                <div className={classes.orderDetailsDisplay}>
                    <div>Order Id: <b>#2876428712</b> </div>
                    {/* {Acceptedorder._id} */}
                    <div> Restaurant Name: <b>Sankalp Restaurant</b></div>
                    <div>Restaurant Id: <b>{Acceptedorder.restId}</b></div>
                    <div>Food Item:  <b></b></div>
                    <div>PickUp:<b>{Acceptedorder.restLocation} Chiloda Gujarat</b></div>
                    <div> Drop: <b>{Acceptedorder.orderLocation}</b></div>
                    <div> Total Amount <b> Rs.1200</b></div>

                    <div className={classes.statusSelect}>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                              <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                label="Status"
                                className={classes.formselect}
                                inputProps={{
                                  name: 'Status',
                                  id: 'outlined-age-native-simple',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={10}>Completed</option>
                                {/* <option value={20}>In Process</option> */}
                                <option value={30}>Out for Delivery</option>
                              </Select>
                            </FormControl>
     
                     </div>

                </div>
               
                
              </Grid>


           
            ))}

                   
                </Grid>
        </Grid>
                
            
      </Grid>
      </Container>
      </div>

    <FooterGrid></FooterGrid>
    </React.Fragment>
  )
}

