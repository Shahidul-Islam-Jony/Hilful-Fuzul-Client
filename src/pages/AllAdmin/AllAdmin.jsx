import { Audio } from "react-loader-spinner";
import useGetAllAdmin from "../../hooks/useGetAllAdmin";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import swal from "sweetalert";

const AllAdmin = () => {
  const [admins, isLoading,refetch] = useGetAllAdmin();
  //   console.log(admins);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
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
    );
  }

  // handle  Recieved Money
  const handleRecieved = async(uid) => {
    console.log(uid);
    console.log(user?.uid);
    const recievedMoney={
        senderUid:uid,
        recieverUid: user?.uid,
    }
    await axiosPublic.patch('/recieved/money',recievedMoney).then(res=>{
        // console.log(res);
        if (res.status === 200) {
            swal("Successful!", "Cash recieved successful", "success");
            refetch();
          }
    }).catch(error=>{
        console.log(error);
        swal("Oops", "Cash recieve problem occured", "error");
    })
  };

//   clear admin cost
const handleClearCost = async(uid)=>{
    // console.log(uid);
    const clearCost = {uid:uid};
    axiosPublic.patch('/clear/cost',clearCost).then(res=>{
        if (res.status === 200) {
            swal("Successful!", "Admin cost cleared successfully", "success");
            refetch();
          }
    })
}

  return (
    <div className="mt-28 w-[97%] mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th className="font-bold text-black">Photo</th>
              <th className="font-bold text-black">Email / Type</th>
              <th className="font-bold text-black">Address</th>
              <th className="font-bold text-black">Total Amount</th>
              <th className="font-bold text-black">Transferable Money</th>
              <th className="font-bold text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin) => (
              <tr className="" key={admin?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={admin?.photoUrl} alt={admin?.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{admin?.name}</div>
                      <div className="text-sm">Father: {admin?.father}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {admin?.email} <br />
                  <span className="font-bold">Type :</span> {admin?.type}
                  <br />
                  <span className="font-bold">Phone :</span> {admin?.phone}
                </td>
                <td>
                  <div>Divission : {admin?.divission}</div>
                  <div>Village : {admin?.village}</div>
                </td>
                <td>
                  <span className="font-bold">Cash : </span>
                  {admin?.cash} tk
                  <br />
                  <span className="font-bold">Cost : </span>
                  {admin?.cost} tk
                </td>
                <td>{admin?.transfer} tk</td>
                <td>
                  {admin?.transfer > 0 && (
                    <button
                      onClick={() => handleRecieved(admin?.uid)}
                      className="btn btn-sm btn-outline"
                    >
                      Recieved
                    </button>
                  )}
                  <br />
                  {admin?.cost > 0 && (
                    <button onClick={()=>handleClearCost(admin?.uid)} className="btn btn-sm btn-outline mt-2">
                      Clear Cost
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdmin;
