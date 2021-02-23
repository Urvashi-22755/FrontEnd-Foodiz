import axios from "axios";

export const request = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-restuarants');
     
      console.log(response.data);
      return response.data
    }
    catch (e) {
      console.log('We have the error', e);
    }
}
  
export const getRestaurantById = async (id) => {
 // console.log(props.match.params.restaurantId);
  const res = await axios(
    "http://localhost:5000/restaurant/getrestaurantbyid/" + id)
  console.log(res);
  return res.data;
 /*  setRestaurant(res.data);
  setItems(res.data.menuDetails); */
}