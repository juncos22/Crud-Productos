import axios from "axios";

const api = axios.create({
  baseURL: "https://crud-productos-production.up.railway.app/api",
});

export default api;
