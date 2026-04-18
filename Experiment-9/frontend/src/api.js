import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

API.interceptors.request.use((req) => {
  const auth = sessionStorage.getItem("auth");

  if (auth) {
    req.headers.Authorization = auth;
  }

  return req;
});

export default API;