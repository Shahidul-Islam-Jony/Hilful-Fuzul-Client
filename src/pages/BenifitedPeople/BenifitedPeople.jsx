import { useState } from "react";
import useGetBenifitedPeople from "../../hooks/useGetBenifitedPeople";
import { Audio } from "react-loader-spinner";

const BenifitedPeople = () => {
    const [benifitedPeoplesData, isLoading] = useGetBenifitedPeople();
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Track current month index

    const handlePageChange = (change) => {
        const newIndex = currentMonthIndex + change;
        if (newIndex >= 0 && newIndex < benifitedPeoplesData.length) {
            setCurrentMonthIndex(newIndex);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center mt-32">
            <Audio
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    }

    // Get unique months in descending order
    const months = [...new Set(benifitedPeoplesData.map(item => `${item.date.split("-")[0]}-${item.date.split("-")[1]}`))].sort();

    const currentMonth = months[currentMonthIndex]; // Get current month and year

    const dataForCurrentMonth = benifitedPeoplesData.filter(
        (item) => `${item.date.split("-")[0]}-${item.date.split("-")[1]}` === currentMonth
    ); // Filter data for current month

    const totalMoneyForCurrentMonth = dataForCurrentMonth.reduce((total, item) => total + item.money, 0);

    const [year, month] = currentMonth.split("-");

    return (
        <div className="mt-28 w-11/12 mx-auto">
            <div className="container mx-auto md:p-4">
                <h1 className="text-2xl font-bold text-center">Monthly Money Data</h1>
                <div className="mt-4 border-2 border-blue-500 rounded-lg mx-auto text-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="border-blue-500">
                                    <th className="text-lg font-medium text-black">Name</th>
                                    <th className="text-lg font-medium text-black">Village</th>
                                    <th className="text-lg font-medium text-black">Items</th>
                                    <th className="text-lg font-medium text-black">Added By</th>
                                    <th className="text-lg font-medium text-black">Money</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataForCurrentMonth.map((item, index) => (
                                    <tr key={index} className="border-blue-500">
                                        <td className="text-base text-black font-medium">{item.name}</td>
                                        <td className="text-base text-black font-medium">{item.village}</td>
                                        <td className="text-base text-black font-medium">{item.items}</td>
                                        <td className="text-base text-black font-medium">{item?.addedBy}</td>
                                        <td className="text-base text-black font-medium">{item.money} tk</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" className="text-right font-bold">Total:</td>
                                    <td className="text-base text-black font-bold">{totalMoneyForCurrentMonth} tk</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center text-lg font-medium space-x-2 mt-4">
                    <button
                        className={`px-3 py-1 border-2 border-black rounded-lg ${
                            currentMonthIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={() => handlePageChange(-1)}
                        disabled={currentMonthIndex === 0}
                    >
                        Previous Month
                    </button>
                    <span>{`${new Date(year, parseInt(month) - 1, 1).toLocaleString('default', { month: 'long' })} ${year}`}</span>
                    <button
                        className={`px-3 py-1  border-2 border-black rounded-lg ${
                            currentMonthIndex === months.length - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                        onClick={() => handlePageChange(1)}
                        disabled={currentMonthIndex === months.length - 1}
                    >
                        Next Month
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BenifitedPeople;
