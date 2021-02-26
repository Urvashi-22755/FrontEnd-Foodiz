import LandingPage from './pages/LandingPage';
import {Route,Switch} from 'react-router-dom'
import ProfileSection from './pages/ProfileSection';
import PastOrders from './components/PastOrders';
import NavAppBar from './components/Navbar';
import FooterGrid from './components/Footer';
import  Container  from '@material-ui/core/Container';
import  Typography  from '@material-ui/core/Typography';
import  AllRestaurants  from './pages/AllRestaurants';
import RecipeReviewCard from './card';
import Cart from './pages/Cart';
import OrderSummaryPage from './pages/OrderSummaryPage';
import RestaurantContainer from './pages/RestaurantContainer'
import DeliveryPage from './pages/DeliveryPage';
import DeliveryLandingPage from './pages/DeliveryLandingPage'; 
import SelectDropdown from './components/select';
import MyOrders from './pages/MyOrders';
<<<<<<< HEAD
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
=======
import AcceptedOrders from './pages/AcceptedOrders';
import PositionedSnackbar from './components/snackbar'
import { AuthRoute, DeliveryExecutiveRoute, UserRoute } from './routes/route'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

>>>>>>> b7c0cfb6fa59a723a826a181eac30c3f512f394e
function App() {
  return (
    <div className="App">

      {/* ANKITA */}

      {/*   <LandingPage></LandingPage> */}
       {/*  <AllRestaurants></AllRestaurants>  */}
        {/* <ProfileSection></ProfileSection> */}  
        {/* <NavAppBar></NavAppBar> */}
       {/*  <RecipeReviewCard></RecipeReviewCard> */}
      {/* <FooterGrid fixed></FooterGrid> */}
    
      {/* URVASHI */}
            
{/* <Restaurant />  */}
      {/* <OrderSummary /> */}
       {/*   <Cart></Cart> */}
      {/* <DrawerExample></DrawerExample> */}
      
      {/* ROUTES  */}
<<<<<<< HEAD
      <Route path='/signup' exact component={SignUp}></Route> 
      <Route path='/login' exact component={SignIn}></Route> 
      <Route path='/allrestaurants/:restaurantId' exact component={RestaurantContainer}></Route>
      <Route path='/allrestaurants' exact component={AllRestaurants}></Route> 
      <Route path='/order-summary/:orderId' exact component={OrderSummaryPage}></Route> 
      <Route path='/profile' exact component={ProfileSection}></Route>
      <Route path='/my-orders' exact component={MyOrders}></Route>
  <Route path='/cart' exact component={Cart}></Route>
 <Route path='/' exact component={LandingPage}></Route> 
=======

      <Switch>
           <Route path='/signup' exact component={SignUp}></Route> 
          <Route path='/login' exact component={SignIn}></Route> 
          <Route path='/' exact component={LandingPage}></Route>
          <Route path='/restaurant/:restaurantId' exact component={RestaurantContainer}></Route>
          <Route path='/allrestaurants' exact component={AllRestaurants}></Route>

          <UserRoute path='/ordersummary/:orderId' exact component={OrderSummaryPage}></UserRoute>
          <UserRoute path='/profile' exact component={ProfileSection}></UserRoute>
          <UserRoute path='/myorders' exact component={MyOrders}></UserRoute>
          <UserRoute path='/cart' exact component={Cart}></UserRoute>

          <DeliveryExecutiveRoute path='/deliverypage' exact component={DeliveryPage}></DeliveryExecutiveRoute>
          <DeliveryExecutiveRoute path='/acceptedOrders' exact component={AcceptedOrders}></DeliveryExecutiveRoute>
   
        </Switch>

      {/* <Route path='/restaurant/:restaurantId' exact component={RestaurantContainer}></Route> */}
      {/* <Route path='/allrestaurants' exact component={AllRestaurants}></Route>  */}
      {/* <Route path='/order-summary/:orderId' exact component={OrderSummaryPage}></Route>  */}
      {/* <Route path='/profile' exact component={ProfileSection}></Route> */}
      {/* <Route path='/my-orders' exact component={MyOrders}></Route> */}
  {/* <Route path='/cart' exact component={Cart}></Route> */}
 {/* <Route path='/' exact component={LandingPage}></Route>  */}
>>>>>>> b7c0cfb6fa59a723a826a181eac30c3f512f394e
   {/*   <Checkboxes></Checkboxes> */}

   {/*   <RestaurantContainer>   </RestaurantContainer>   */}
             {/*  <Route path='/deliverylandingpage' exact component={DeliveryLandingPage}></Route>  */}
              {/* <Route path='/deliverypage' exact component={DeliveryPage}></Route> */}
              {/* <Route path='/profile' exact component={ProfileSection}></Route> */}
              {/* <Route path='/order-summary' exact component={OrderSummaryPage}></Route>  */}
      {/* <Route path='/acceptedOrders' exact component={AcceptedOrders}></Route>  */}


      <Route path='/snackbar' exact component={PositionedSnackbar}></Route> 
      

      {/* <SelectDropdown></SelectDropdown> */}
    </div>
  );
}

export default App;
