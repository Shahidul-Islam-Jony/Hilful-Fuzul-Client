import { useState } from "react";
import useGetBenifitedPeople from "../../hooks/useGetBenifitedPeople";

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
        return <div>Loading...</div>; // Placeholder for loading state
    }

    // Get unique months in descending order
    const months = [...new Set(benifitedPeoplesData.map(item => item.date.split("-")[1]))].sort();

    const currentMonth = months[currentMonthIndex]; // Get current month name

    const dataForCurrentMonth = benifitedPeoplesData.filter(
        (item) => item.date.split("-")[1] === currentMonth
    ); // Filter data for current month

    const totalMoneyForCurrentMonth = dataForCurrentMonth.reduce((total, item) => total + item.money, 0);

    return (
        <div className="mt-28 w-11/12 mx-auto">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center">Monthly Money Data</h1>
                <div className="mt-4 border-2 border-blue-500 rounded-lg w-96 mx-auto text-center">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="border-blue-500">
                                    <th className="text-lg font-medium text-black">Name</th>
                                    <th className="text-lg font-medium text-black">Village</th>
                                    <th className="text-lg font-medium text-black">Items</th>
                                    <th className="text-lg font-medium text-black">Money</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataForCurrentMonth.map((item, index) => (
                                    <tr key={index} className="border-blue-500">
                                        <td className="text-base text-black font-medium">{item.name}</td>
                                        <td className="text-base text-black font-medium">{item.village}</td>
                                        <td className="text-base text-black font-medium">{item.items}</td>
                                        <td className="text-base text-black font-medium">{item.money}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" className="text-right font-bold">Total:</td>
                                    <td className="text-base text-black font-bold">{totalMoneyForCurrentMonth}</td>
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
                    <span>{new Date(2000, parseInt(currentMonth) - 1, 1).toLocaleString('default', { month: 'long' })}</span>
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
