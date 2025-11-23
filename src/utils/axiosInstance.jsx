import axios from "axios";
const api=axios.create({
  baseURL:"http://localhost:6969/api",
});

api.interceptors.request.use((config)=>{
  config.headers.authorization=`Bearer ${localStorage.getItem('token')}`
  return config;
})

export default api;