import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetAllUsers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: usersData = {}, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all/users`)
            return res.data;
        }
    })
    // console.log(usersData);
    return [usersData, isLoading, refetch];
}

export default useGetAllUsers;
