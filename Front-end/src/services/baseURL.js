import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "http://localhost:64377/api",
  headers: { "Access-Control-Allow-Origin": "*" },
});
