import { useContext, useState } from "react";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { AuthContext } from "../../providers/AuthProvider";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const AllMembers = () => {

    const { user } = useContext(AuthContext);
    const [userData] = useGetSingleUser(user?.uid);     // loggedIn user data
    // console.log(userData);
    // console.log(user);
    const [usersData, isLoading] = useGetAllUsers('member');    //get only member type data
    // console.log(usersData);

    // for search member
    const [searchQuery, setSearchQuery] = useState("");
    const usersArray = Array.isArray(usersData) ? usersData : [];
    const filteredUsers = usersArray.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (isLoading) {
        return <span className="loading loading-spinner text-2xl text-primary"></span>
    }

    return (
        <div className="my-28 w-11/12 mx-auto">
            <h2 className="text-center text-xl md:text-3xl font-bold my-6">Our All Members</h2>

            <div className="mb-4 flex items-center gap-4 relative">
                <p className="text-lg font-bold">Search:</p>
                <input
                    type="text"
                    placeholder="Search by user name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-2 border-gray-500 w-80 md:w-[420px] rounded-md p-2"
                />
                <span className="absolute right-5 md:left-1/3"><IoSearch className="text-gray-400"/></span>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-lg">
                        <tr>
                            <th className="font-bold text-black">Photo</th>
                            <th className="font-bold text-black">Email</th>
                            <th className="font-bold text-black">Address</th>
                            <th className="font-bold text-black">Phone</th>
                            {
                                (userData.type === 'admin' || userData.type === 'superAdmin') &&
                                <th className="font-bold text-black">Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers?.map(user =>
                                <tr key={user?._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user?.photoUrl} alt={user?.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                                <div className="text-sm">Father: {user?.father}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user?.email}</td>
                                    <td>
                                        <div>Divission : {user?.divission}</div>
                                        <div>Village : {user?.village}</div>
                                    </td>
                                    <td>{user?.phone}</td>
                                    {

                                        (userData.type === 'admin' || userData.type === 'superAdmin') &&
                                        <Link to={`/addMoney/${user.uid}`} className="btn mt-4 text-center btn-outline hover:bg-green-800 border-blue-800">Add Money</Link>
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMembers;