import axios from "axios";
import React from "react";

export const api = axios.create({
  baseURL: "https://kinolaruz.pythonanywhere.com/",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
  },
});

export const ContextApi = React.createContext(api);
