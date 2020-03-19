import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

//const URL = "http://52.76.240.170";
console.log("EMAIL111");
export function signInAction({ email, password }, history) {
  return async dispatch => {
    try {
      //console.log("EMAIL", email + password);
      const res = await axios.post("http://52.76.240.170/login", {
        username: email,
        password: password
      });

      dispatch({ type: AUTHENTICATED });
      //console.log("RES", res);
      //console.log("DATA", res.data);
      localStorage.setItem("token", res.data.access_token);
      // console.log("DATA", res.data.access_token);
      history.push("/homepage");
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  };
}
