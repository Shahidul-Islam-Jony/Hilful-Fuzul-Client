
import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://hilful-fuzul-server.vercel.app'
})

// https://hilful-fuzul-server.vercel.app

// http://localhost:5000

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;
