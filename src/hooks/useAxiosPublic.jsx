
import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000'
})

// https://hilful-fuzul-server.vercel.app

// http://localhost:5000

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;
