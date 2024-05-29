import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useGetTotalMoney from "../../hooks/useGetTotalMoney";

const OwnMonthlyMoney = () => {
  const { user } = useContext(AuthContext);
  const [Money, isLoading] = useGetTotalMoney(user?.uid);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner text-5xl text-primary mt-36 text-center"></span>
      </div>
    );
  }

  const dates = Money[0]?.date || [];
  const money = Money[0]?.money || [];

  // Combine dates and money into a single array of objects
  const data = dates.map((date, index) => ({ date, money: money[index] }));

  // Sort data by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="mt-28 md:w-11/12 mx-auto">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">Your Monthly Money</h1>
        <div className="mt-4 border-2 border-blue-500 rounded-lg mx-auto text-center">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-blue-500">
                  <th className="px-4 py-2 text-lg font-medium text-black">Month</th>
                  <th className="px-4 py-2 text-lg font-medium text-black">Date</th>
                  <th className="px-4 py-2 text-lg font-medium text-black">Money</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const date = new Date(item.date);
                  const month = date.toLocaleString("default", { month: "long", year: "numeric" });
                  return (
                    <tr key={index} className="border-blue-500">
                      <td className="px-4 py-2 text-base text-black font-medium">{month}</td>
                      <td className="px-4 py-2 text-base text-black font-medium">{date.toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-base text-black font-medium">{item.money}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnMonthlyMoney;





// Pagination with Month


// import { useContext, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import useGetTotalMoney from "../../hooks/useGetTotalMoney";

// const OwnMonthlyMoney = () => {
//   const { user } = useContext(AuthContext);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [Money,isLoading] = useGetTotalMoney(user?.uid);
//   console.log(Money[0]);

//   if (isLoading) {
//     return <div className="flex justify-center"><span className="loading loading-spinner text-5xl text-primary mt-36 text-center"></span></div>
// }

//   const dates = Money[0]?.date;
//   const money = Money[0]?.money;

//   // Combine dates and money into a single array of objects
//   const data = dates.map((date, index) => ({ date, money: money[index] }));

//   // Sort data by date
//   data.sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Group data by month
//   const groupedData = data.reduce((acc, { date, money }) => {
//     const month = new Date(date).toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });
//     if (!acc[month]) {
//       acc[month] = [];
//     }
//     acc[month].push({ date, money });
//     return acc;
//   }, {});


//   console.log(groupedData);

//   // Convert grouped data to an array for pagination
//   const months = Object.keys(groupedData);


//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const currentMonth = months[currentPage];
//   const dataForCurrentMonth = groupedData[currentMonth];

//   return (
//     <div className="mt-28 w-11/12 mx-auto">
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold text-center">Monthly Money Data</h1>
//         <div className="mt-4 border-2 border-blue-500 rounded-lg w-96 mx-auto text-center">
//           {/* <h2 className="text-xl font-bold">{currentMonth}</h2> */}
//             <div className="overflow-x-auto">
//               <table className="table">
//                 {/* head */}
//                 <thead>
//                   <tr className="border-blue-500">
//                     <th className="text-lg font-medium text-black">Month</th>
//                     <th className="text-lg font-medium text-black">Date</th>
//                     <th className="text-lg font-medium text-black">Money</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* row 1 */}

//                   {dataForCurrentMonth.map((item, index) => (
//                     <tr key={index} className="border-blue-500">
//                       <td className="text-base text-black font-medium">{currentMonth}</td>
//                       <td className="text-base text-black font-medium">{new Date(item?.date).toLocaleDateString()}</td>
//                       <td className="text-base text-black font-medium">{item?.money}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//         </div>
//         <div className="flex justify-center text-lg font-medium space-x-2 mt-4">
//           <button
//             className={`px-3 py-1 border-2 border-black rounded-lg ${
//               currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 0}
//           >
//             Previous
//           </button>
//           <span>
//             {currentPage + 1} of {months.length}
//           </span>
//           <button
//             className={`px-3 py-1  border-2 border-black rounded-lg ${
//               currentPage === months.length - 1
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === months.length - 1}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnMonthlyMoney;

