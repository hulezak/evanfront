import axios from "axios"

const axiosBase = axios.create({
    baseURL:'https://evan-backend.onrender.com/api'
}) 

const a =8
export default axiosBase