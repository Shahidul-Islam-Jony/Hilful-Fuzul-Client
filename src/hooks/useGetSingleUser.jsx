import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetSingleUser = (uid) => {
    const axiosPublic = useAxiosPublic();

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: [uid],
        queryFn: async () => {
            const res = await axiosPublic.get(`/single/user/${uid}`)
            return res.data;
        }
    })
    console.log(userData);
    return [userData,isLoading,refetch];
}

export default useGetSingleUser;
