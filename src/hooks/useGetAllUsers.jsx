import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetAllUsers = (type) => {
    const axiosPublic = useAxiosPublic();

    const { data: usersData = {}, isLoading, refetch } = useQuery({
        queryKey: [type],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all/users/${type}`)
            return res.data;
        }
    })
    // console.log(usersData);
    return [usersData, isLoading, refetch];
}

export default useGetAllUsers;
