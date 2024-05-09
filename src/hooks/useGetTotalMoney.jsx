import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useGetTotalMoney = () => {
    const axiosPublic = useAxiosPublic();

    const { data: Money = {}, isLoading, refetch } = useQuery({
        queryKey: ['total Money'],
        queryFn: async () => {
            const res = await axiosPublic.get('/total/money')
            return res.data;
        }
    })
    // console.log(totalMoney);
    return [Money, isLoading, refetch];
}

export default useGetTotalMoney;
