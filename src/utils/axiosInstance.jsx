import axios from "axios";
const api=axios.create({
  baseURL:"http://localhost:6969/api",
});

api.interceptors.request.use((config)=>{
  console.log(config)
  config.headers.authorization=`Bearer ${localStorage.getItem('token')}`
  console.log(config)
  return config;
})

export default api;