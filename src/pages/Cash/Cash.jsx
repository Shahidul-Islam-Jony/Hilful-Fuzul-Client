import { useContext } from "react";
import { GrMoney } from "react-icons/gr";
import { TbCoinTaka } from "react-icons/tb";
import { AuthContext } from "../../providers/AuthProvider";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import swal from "sweetalert";

const Cash = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [userData] = useGetSingleUser(user?.uid);
  console.log(userData?.cash);
  const axiosPublic = useAxiosPublic();

  const handleTransferMoney = async (e) => {
    e.preventDefault();
    const money = parseFloat(e.target.amount.value);
    // console.log(money);
    if (money > userData?.cash) {
      swal("Oops", "Not enough money", "error");
      document.getElementById("my_modal_3").close();
      return;
    }
    const cash = {
      uid: user?.uid,
      amount: money,
    };
    await axiosPublic.patch("/transfer/cash", cash).then((res) => {
        console.log(res);
      if (res.status === 200) {
        swal("Successful!", "Cash Transfer is pending...", "success");
        document.getElementById("my_modal_3").close();
      }
    });
  };

  return (
    <div className="mt-28 w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="border-2 border-blue-600 rounded-lg shadow-xl shadow-gray-500 md:w-1/2 min-h-[300px]">
          <h2 className="text-5xl font-bold font-serif text-center my-5">
            Cash
          </h2>
          <div className="flex justify-center items-center gap-10">
            <p className="text-5xl flex items-center gap-2 font-medium text-green-800">
              {userData?.cash?.toFixed(2)} <TbCoinTaka />
            </p>
            <p className="text-7xl lg:text-9xl text-orange-600">
              <GrMoney />
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className={userData?.transfer > 0 ? 'text-lg font-medium btn btn-sm btn-outline mr-4 btn-disabled':'text-lg font-medium btn btn-sm btn-outline mr-4'}
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Transfer Money
            </button>
            <dialog id="my_modal_3" className="modal text-black">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <form onSubmit={handleTransferMoney}>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Amount of money"
                    className="input input-bordered input-primary w-full max-w-xs"
                  />
                  <br />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Transfer"
                  />
                </form>
              </div>
            </dialog>

            <div className="flex items-center">
              {userData?.transfer > 0 ? (
                <p className="text-blue-700 font-bold">Cash ({userData?.transfer} tk) Transfer pending...</p>
              ) : (
                <p className="text-green-800 font-bold">Cash transfered successful</p>
              )}
            </div>
          </div>
        </div>
        <div className="border-2 border-blue-600 rounded-lg shadow-xl shadow-gray-500 md:w-1/2 min-h-[300px]">
          <h2 className="text-5xl font-bold font-serif text-center my-5">
            Cost
          </h2>
          <div className="flex justify-center items-center gap-10">
            <p className="text-5xl flex items-center gap-2 font-medium text-red-600">
              {userData?.cost?.toFixed(2)} <TbCoinTaka />
            </p>
            <p className="text-7xl lg:text-9xl text-orange-600">
              <GrMoney />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cash;
