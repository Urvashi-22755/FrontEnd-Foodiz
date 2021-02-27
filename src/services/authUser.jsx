import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export function authUser(userData, props) {
  let decodedToken;

  axios
    .post("http://localhost:5000/user/authenticate", userData) //User Id and User ROle in TOken
    .then((res) => {
      //  console.log("Login res", res);
      localStorage.setItem("token", res.data.token);

      //Decoding the token and fetching the roles of the loggedIn user.

      var token = localStorage.getItem("token", res.data.token);

    const decodedToken =   decodeToken(token);      //fetch the token
    
      // Rendering condition for User and Delivery Executive.
      if ("DE" == decodedToken.role) {
        props.history.push("/deliverypage");
      } else {
        props.history.replace("/");
      }
    });

  return decodedToken;
}

export function decodeToken(token) {
    var token = localStorage.getItem("token",token);
    let decodedToken = jwt_decode(token);
    console.log(decodedToken);
    console.log("User decode d role", decodedToken.role);
    localStorage.setItem("role", decodedToken.role);
    localStorage.setItem("userId", decodedToken.userId);

    return decodedToken;
}

export function logout() {
    localStorage.clear();
}
