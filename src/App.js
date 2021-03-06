import LandingPage from "./pages/LandingPage";
import { Route, Switch } from "react-router-dom";
import ProfileSection from "./pages/ProfileSection";
import PastOrders from "./components/PastOrders";
import FooterGrid from "./components/Footer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AllRestaurants from "./pages/AllRestaurants";
import RecipeReviewCard from "./card";
import Cart from "./pages/Cart";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import RestaurantContainer from "./pages/RestaurantContainer";
import DeliveryPage from "./pages/DeliveryPage";
import DeliveryLandingPage from "./pages/DeliveryLandingPage";
import SelectDropdown from "./components/select";
import MyOrders from "./pages/MyOrders";
import AcceptedOrders from "./pages/AcceptedOrders";
import PositionedSnackbar from "./components/snackbar";
import { AuthRoute, DeliveryExecutiveRoute, UserRoute } from "./routes/route";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword';
import SimpleRating  from './components/Rating';
import DeliveryExecutiveDetails from './components/DeliveryExecutiveDetail';
import HomeComponent from './HomeComponent';
require('dotenv').config();

function App() {

  return (
    <div className="App">

      {/* <HomeComponent /> */}

      <Switch>
        
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/restaurant/:restaurantId"
          exact
          component={RestaurantContainer}
        ></Route>
        <Route path="/allrestaurants" exact component={AllRestaurants}></Route>

        <AuthRoute
          path="/ordersummary/:orderId"
          exact
          component={OrderSummaryPage}
        ></AuthRoute>
        <AuthRoute path="/profile" exact component={ProfileSection}></AuthRoute>
        <UserRoute path="/myorders" exact component={MyOrders}></UserRoute>
        <UserRoute path="/cart" exact component={Cart}></UserRoute>

        <DeliveryExecutiveRoute
          path="/deliverypage"
          exact
          component={DeliveryPage}
        ></DeliveryExecutiveRoute>
        <DeliveryExecutiveRoute
          path="/acceptedOrders"
          exact
          component={AcceptedOrders}
        ></DeliveryExecutiveRoute>

     </Switch> 

     {/*  <Route path="/snackbar" exact component={PositionedSnackbar}></Route>
      <Route path="/simplerating" exact component={SimpleRating}></Route> */}
    </div>
  );
}

export default App;
