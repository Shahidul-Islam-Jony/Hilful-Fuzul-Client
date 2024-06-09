import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetBinifitedPeople = () => {
    const axiosPublic = useAxiosPublic();

    const { data: benifitedPeoplesData = {}, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/benifited/people')
            return res.data;
        }
    })
    // console.log(benifitedPeoplesData);
    return [benifitedPeoplesData, isLoading, refetch];
}

export default useGetBinifitedPeople;
