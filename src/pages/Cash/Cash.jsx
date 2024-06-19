import { GrMoney } from "react-icons/gr";
import useGetTotalMoney from "../../hooks/useGetTotalMoney";
import { TbCoinTaka } from "react-icons/tb";

const Cash = () => {

    const [Money] = useGetTotalMoney();

    return (
        <div className="mt-28 w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="border-2 border-blue-600 rounded-lg shadow-xl shadow-gray-500 md:w-1/2 min-h-[300px]">
                <h2 className="text-5xl font-bold font-serif text-center my-5">Cash</h2>
                <div className="flex justify-center items-center gap-10">
                    <p className="text-5xl flex items-center gap-2 font-medium text-green-800">{Money?.totalMoney?.toFixed(2)} <TbCoinTaka /></p>
                    <p className="text-7xl lg:text-9xl text-orange-600"><GrMoney /></p>
                </div>
            </div>
            <div className="border-2 border-blue-600 rounded-lg shadow-xl shadow-gray-500 md:w-1/2 min-h-[300px]">
                <h2 className="text-5xl font-bold font-serif text-center my-5">Cost</h2>
                <div className="flex justify-center items-center gap-10">
                    <p className="text-5xl flex items-center gap-2 font-medium text-red-600">{Money?.totalCost?.toFixed(2)} <TbCoinTaka /></p>
                    <p className="text-7xl lg:text-9xl text-orange-600"><GrMoney /></p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Cash;