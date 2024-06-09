import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import swal from "sweetalert";

const AllUsers = () => {

  const [users, setUsers] = useState(null);
  const axiosPublic = useAxiosPublic();

  // for search member
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination starts here
  const [count, setCount] = useState(0);
  // console.log(count);
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

  // Load user for pagination

  // Total count user
  useEffect(() => {
    axiosPublic.get("/total/users/count").then((res) => {
      // console.log(res?.data?.count);
      setCount(res?.data?.count);
    });
  }, [axiosPublic]);

  // load user based on page
  useEffect(() => {
    if (searchQuery) {
      // load users based on search query
      axiosPublic.get(`/search/users?search=${searchQuery}`).then((res) => {
        // console.log(res?.data);
        setUsers(res?.data);
      });
    } else {
      //load users based on current page
      axiosPublic
        .get(`/all/users?page=${currentPage}&size=${itemsPerPage}`)
        .then((res) => {
        //   console.log(res?.data);
          setUsers(res?.data);
        });
    }
  }, [axiosPublic, currentPage, itemsPerPage, searchQuery]);

  //   pagination ends

  //   handle make admin
  const handleMakeAdmin = (uid) => {
    swal({
      title: "Are you sure?",
      text: "You want to change Member as Admin",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((admin) => {
      if (admin) {
        // console.log(uid);
        const updateType = {
          type: "admin",
          uid,
        };

        axiosPublic.patch("/update/user/type", updateType).then((res) => {
          // console.log(res);
          if (res?.status === 200) {
            swal("Member is now an Admin", {
              icon: "success",
            }).then(() => {});
          }
        });
      } else {
        swal("Operation cancel !");
      }
    });
  };

  //  handle make user
  const handleMakeMember = (uid) => {
    swal({
      title: "Are you sure?",
      text: "You want to change Admin as Member",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((admin) => {
      if (admin) {
        // console.log(uid);
        const updateType = {
          type: "member",
          uid,
        };
        axiosPublic.patch("/update/user/type", updateType).then((res) => {
          // console.log(res);
          if (res?.status === 200) {
            swal("Admin is now a Member", {
              icon: "success",
            });
          }
        });
      } else {
        swal("Operation cancel !");
      }
    });
  };

  // handle delete user
  const handleDeleteUser = (uid) => {
    // console.log(uid);
    swal({
        title: "Are you sure?",
        text: "You want to delete this User",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((admin) => {
        if (admin) {
          axiosPublic.delete(`delete/user/${uid}`).then((res) => {
            // console.log(res);
            if (res?.status === 200) {
              swal("User deleted successful", {
                icon: "success",
              });
            }
          });
        } else {
          swal("Operation cancel !");
        }
      });
  };

  return (
    <div className="my-28 w-11/12 mx-auto">
      <h2 className="text-center text-xl md:text-3xl font-bold my-6">
        All Users : {count}
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
              <th className="font-bold text-black">Email / Type</th>
              <th className="font-bold text-black">Address</th>
              <th className="font-bold text-black">Phone</th>
              <th className="font-bold text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="" key={user?._id}>
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
                <td>
                  {user?.email} <br />
                  <span className="font-bold">Type :</span> {user?.type}
                </td>
                <td>
                  <div>Divission : {user?.divission}</div>
                  <div>Village : {user?.village}</div>
                </td>
                <td>{user?.phone}</td>
                <td>
                  {user?.type === "admin" ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleMakeMember(user?.uid)}
                        className="btn btn-sm btn-outline hover:bg-green-800 mb-1"
                      >
                        Make Member
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user?.uid)}
                        className="btn btn-sm btn-outline hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <button
                        onClick={() => handleMakeAdmin(user?.uid)}
                        className="btn btn-sm btn-outline hover:bg-green-800 mb-1"
                      >
                        Make Admin
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user?.uid)}
                        className="btn btn-sm btn-outline hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
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

export default AllUsers;
