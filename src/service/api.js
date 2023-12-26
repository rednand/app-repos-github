import axios from "axios";


const api = axios.create({
  baseURL: "https://api-finances-cyan.vercel.app/",
});

export default api;
