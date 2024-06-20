import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetAllAdmin = () => {
    const axiosPublic = useAxiosPublic();

    const { data: admins = {}, isLoading, refetch } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all/admins')
            return res.data;
        }
    })
    // console.log(admins);
    return [admins, isLoading, refetch];
}

export default useGetAllAdmin;
