import axios from "axios";

// Set axios instance to baseURL and send cookies with every request
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
