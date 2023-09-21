import axios from "axios";
import React from "react";

export const api = axios.create({
  baseURL: "http://localhost:3004/",
  timeout: 30 * 1000,
  headers: { "Content-Type": "application/json" },
});

export const ContextApi = React.createContext(api);
