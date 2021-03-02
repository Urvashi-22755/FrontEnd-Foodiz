import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Box from "@material-ui/core/Box";

import foodData from "../data/Restaurants";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { Link } from "react-router-dom";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 900, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Carousels() {
  // const restaurants = foodData();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    (async function () {
      console.log("sdfsdf");
      const res = await axios.get(
        "http://localhost:5000/restaurant/gettoprestaurants"
      );
      console.log(res);
      setRestaurants(res.data);
    })();
  }, []);
  const cardstyle = {
    border: "2px solid white",
    width: "345px",
    marginTop: "10%",

    marginBottom: "5%",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    borderRadius: "25px",
    "&:hover": { transform: "translate3D(0,-7px,0) scale(1.05)" },
  };
  const mediastyle = {
    height: 250,
    width: "100%",
  };
  const carddiv = {
    maxWidth: "100%",
  };
  const rating = {
    marginTop: "5%",
    width: "60px",
    backgroundColor: "#48c479",
    color: "white",
  };
  const heading = {
    marginTop: "8%",
    fontWeight: 700,
    fontSize: "4rem",
    textAlign: "center",
    color: "#282c3f",
  };
  const rate = {
    color: "yellow",
  };
  return (
    <>
      <div>
        <Typography style={heading}>
          Foodizz's Five Star
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            style={rate}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          Rated Restaurants
        </Typography>
      </div>
      <div>
        <Carousel breakPoints={breakPoints}>
          {restaurants.map((rest) => (
            <Box key={rest._id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/restaurant/${rest._id}`}
              >
                <Card style={cardstyle}>
                  <CardActionArea>
                    <CardMedia
                      style={mediastyle}
                      image={rest.restaurantImages[0]}
                      title=""
                    />

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {rest.restaurantName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {rest?.restaurantCategory.join(" ,")}
                        <span>Rs.{rest.price} for Two</span>
                      </Typography>

                      <Typography>
                        <p style={rating}>
                          <StarRateIcon /> {parseFloat(rest.rating_avg).toFixed(1)}
                        </p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Box>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default Carousels;
