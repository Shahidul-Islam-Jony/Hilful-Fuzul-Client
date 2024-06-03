import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllMembers = () => {
  const { user } = useContext(AuthContext);
  // console.log(user.uid);
  const [userData] = useGetSingleUser(user?.uid); // loggedIn user data
  // console.log(userData);
  const [users, setUsers] = useState(null);
  // console.log(usersData);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // for search member
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination starts here
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const totalPages = Math.ceil(count / itemsPerPage); //total num of pages
  //   console.log(totalPages);
  const pages = [...Array(totalPages).keys()]; //total separate page number // you can do it for loop also
  // console.log(pages);
  const [currentPage, setCurrentPage] = useState(0);

  // handleItemPerPage
  const handleItemPerPage = (e) => {
    // console.log(e.target.value);
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };
  // Pagination ends here

  const handleOwnMonthlyMoney = (uid) => {
    if (uid === user?.uid || userData?.type === "superAdmin") {
      navigate("/own/monthly/money");
    }
  };

  // Load user for pagination

  // Total count user
  useEffect(() => {
    axiosPublic.get("/total/member/count").then((res) => {
      // console.log(res?.data?.count);
      setCount(res?.data?.count);
    });
  }, [axiosPublic]);

  // load user based on page
  useEffect(() => {
    if(searchQuery){      // load members based on search query
      axiosPublic.get(`/search/member?search=${searchQuery}`)
      .then(res=>{
        // console.log(res?.data);
        setUsers(res?.data);
      })
    }
    else{       //load members based on current page
      axiosPublic.get(`/total/member?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        // console.log(res?.data);
        setUsers(res?.data);
      });
    }
  }, [axiosPublic, currentPage, itemsPerPage,searchQuery]);


  return (
    <div className="my-28 w-11/12 mx-auto">
      <h2 className="text-center text-xl md:text-3xl font-bold my-6">
        Our All Members
      </h2>

      <div className="mb-4 flex items-center gap-4 relative">
        <p className="text-lg font-bold">Search:</p>
        <input
          type="text"
          placeholder="Search by user name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 border-gray-500 w-80 md:w-[420px] rounded-md p-2"
        />
        <span className="absolute right-5 md:left-1/3">
          <IoSearch className="text-gray-400" />
        </span>
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
              {(userData.type === "admin" ||
                userData.type === "superAdmin") && (
                <th className="font-bold text-black">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="cursor-pointer" key={user?._id}>
                <td onClick={() => handleOwnMonthlyMoney(user?.uid)}>
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
                <td onClick={() => handleOwnMonthlyMoney(user?.uid)}>
                  {user?.email}
                </td>
                <td onClick={() => handleOwnMonthlyMoney(user?.uid)}>
                  <div>Divission : {user?.divission}</div>
                  <div>Village : {user?.village}</div>
                </td>
                <td onClick={() => handleOwnMonthlyMoney(user?.uid)}>
                  {user?.phone}
                </td>
                {(userData.type === "admin" ||
                  userData.type === "superAdmin") && (
                  <Link
                    to={`/addMoney/${user.uid}`}
                    className="btn mt-4 text-center btn-outline hover:bg-green-800 border-blue-800"
                  >
                    Add Money
                  </Link>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}

      <div className="text-center mt-10">
        <p>Current Page : {currentPage + 1}</p>
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="btn mr-2"
        >
          &lt;&lt; Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page ? "btn mr-2 bg-green-500" : "btn mr-2"
            }
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)
          }
          className="btn ml-2"
        >
          Next &gt;&gt;
        </button>
        {/* handleItemPerPage */}
        <select value={itemsPerPage} onChange={handleItemPerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default AllMembers;
