import LandingPage from './pages/LandingPage';
import { Route, Router,Switch } from 'react-router-dom'
import ProfileSection from './pages/ProfileSection';
import PastOrders from './components/PastOrders';
import NavAppBar from './components/Navbar';
import FooterGrid from './components/Footer';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AllRestaurants from './pages/AllRestaurants';
import RecipeReviewCard from './card';
import Cart from './pages/Cart';
import OrderSummaryPage from './pages/OrderSummaryPage';
import RestaurantContainer from './pages/RestaurantContainer'
import DeliveryPage from './pages/DeliveryPage';
import DeliveryLandingPage from './pages/DeliveryLandingPage'

import SelectDropdown from './components/select';
import MyOrders from './pages/MyOrders';

import { AuthRoute, DeliveryExecutiveRoute, UserRoute } from './components/PrivateRoute'


function App() {
  return (
    <div className="App">

      {/* ANKITA */}

        {/* <LandingPage></LandingPage> */}
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
      
        <Switch>

          <Route path='/' exact component={LandingPage}></Route>
          <Route path='/allrestaurants/:restaurantId' exact component={RestaurantContainer}></Route>
          <Route path='/allrestaurants' exact component={AllRestaurants}></Route>

          <UserRoute path='/order-summary/:orderId' exact component={OrderSummaryPage}></UserRoute>
          <UserRoute path='/profile' exact component={ProfileSection}></UserRoute>
          <UserRoute path='/my-orders' exact component={MyOrders}></UserRoute>
          <UserRoute path='/cart' exact component={Cart}></UserRoute>

          <DeliveryExecutiveRoute path='/deliverypage' exact component={DeliveryPage}></DeliveryExecutiveRoute>

        </Switch>
     


      {/*   <Checkboxes></Checkboxes> */}

      {/*   <RestaurantContainer>   </RestaurantContainer>   */}
      {/*  <Route path='/deliverylandingpage' exact component={DeliveryLandingPage}></Route>  */}

      {/* <SelectDropdown></SelectDropdown> */}
    </div>
  );
}

export default App;
