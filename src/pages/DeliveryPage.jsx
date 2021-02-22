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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: '2%'
    // backgroundColor: "#2c446e",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'left',
    marginTop: '5%',
    color: 'white',
    backgroundColor: '#171a29',
    height: 'auto'
  },
  orderDetails:{
    padding: '3%',
    marginTop: '2%',
    color: '#171a29',
    fontWeight: 600,
    height: '20vh',
    backgroundColor: 'white'
  },
  acceptButton:{
    backgroundColor: '#171a29',
    float: 'right',
    "&:hover":{
      backgroundColor: '#3e4a87'
    }
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
                        <Paper className={classes.paper}>

            {orders.map((order) => (
              <Grid item xs={12} sm={6} md={6} lg={12}>
                <div className={classes.orderDetails}>
                    <div>Order Id: {order._id}</div>
                    <div>Restaurant Id: {order.restId}</div>
                    <div>From:{order.restLocation}</div>
                    <div>  To: {order.orderLocation}</div>
                    <div>
                    <Button onClick={()=>handleOrders(order)} 
                    className={classes.acceptButton} variant="contained" color="secondary">
                      { buttontext}
                  </Button>
                  </div>
                </div>
                
              </Grid>
            ))}

                        </Paper>
                      
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={7}>
                    <Paper className={classes.paper}>
            {orderarray.map((Acceptedorder) => (
              <Grid item xs={12} sm={6} md={6} lg={12}>
                <div className={classes.orderDetails}>
                    <div>Order Id: {Acceptedorder._id}</div>
                    <div>Restaurant Id: {Acceptedorder.restId}</div>
                    <div>From:{Acceptedorder.restLocation}</div>
                    <div>  To: {Acceptedorder.orderLocation}</div>
                </div>
                
              </Grid>
            ))}

                    </Paper>
                </Grid>
        </Grid>
                
            
      </Grid>
      </Container>
      </div>

    <FooterGrid></FooterGrid>
    </React.Fragment>
  )
}

