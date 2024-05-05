import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetSingleUser = (uid) => {
    const axiosPublic = useAxiosPublic();

    const { data: userData = {}, isLoading: loading, refetch } = useQuery({
        queryKey: [uid],
        queryFn: async () => {
            const res = await axiosPublic.get(`/single/user/${uid}`)
            return res.data;
        }
    })
    console.log(userData);
    return [userData,loading,refetch];
}

export default useGetSingleUser;
