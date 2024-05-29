import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetTotalMoney = (uid='all') => {
    const axiosPublic = useAxiosPublic();

    const { data: Money = {}, isLoading, refetch } = useQuery({
        queryKey: ['total Money'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/total/money/${uid}`)
            return res.data;
        }
    })
    // console.log(Money);
    return [Money, isLoading, refetch];
}

export default useGetTotalMoney;
