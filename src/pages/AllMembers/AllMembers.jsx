import useGetAllUsers from "../../hooks/useGetAllUsers";

const AllMembers = () => {

    const [usersData, isLoading] = useGetAllUsers('member');    //get only member type data
    // console.log(usersData);
    if (isLoading) {
        return <span className="loading loading-spinner text-2xl text-primary"></span>
    }

    return (
        <div className="my-28 w-11/12 mx-auto">
            <h2 className="text-center text-xl md:text-3xl font-bold my-6">Our All Members</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="font-bold text-black">Photo</th>
                            <th className="font-bold text-black">Email</th>
                            <th className="font-bold text-black">Address</th>
                            <th className="font-bold text-black">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersData?.map(user =>
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