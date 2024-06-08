import { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import { AuthContext } from "../../providers/AuthProvider";
import swal from "sweetalert";

const image_hosting_key = import.meta.env.VITE_ImageBB_API;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const { user, updateUser, updatePass, reauthenticate } =
    useContext(AuthContext);
  //   console.log(user);
  const [userData] = useGetSingleUser(user?.uid);
  console.log(userData);
  const axiosPublic = useAxiosPublic();
  const [imageUrl, setImageUrl] = useState("");

  const handleUpdateImage = async () => {
    updateUser(user?.displayName, imageUrl)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadImageBB = async (e) => {
    const image = e.target.files[0];
    // console.log(image);
    const imageFile = { image: image };
    // console.log(imageFile);
    const res = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log('Image url', res.data.data.display_url);
    setImageUrl(res.data.data.display_url);
  };
  // console.log(imageUrl);

  // update password
  const handleUpdatePass = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.updatePassword.value;
    // console.log(newPassword,oldPassword);
    updatePass(oldPassword, newPassword);
    document.getElementById("my_modal_3").close();
  };

  // update email
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;

    reauthenticate(password).then(() => {
      const data = {
        uid: user?.uid,
        newEmail: email,
      };

      axiosPublic
        .post("/update/email", data)
        .then((res) => {
          // console.log(res);
          if (res?.status === 200) {
            swal("Email updated successfully", "Please logout and login again", "success");
          }
        })
        .catch((error) => {
          // console.log(error?.response?.status);
          if (error?.response?.status === 400) {
            return swal("Oops",error?.response?.data, "error");
          }
        });
    });

    document.getElementById("my_modal_4").close();
  };

  return (
    <div className="flex mt-44 justify-center">
      <div className="relative">
        <div className="card w-[350px] md:w-[500px] lg:w-[600px] bg-primary text-primary-content">
          <div className="card-body mt-16 text-center">
            <h2 className="text-xl font-bold">Name: {userData?.name}</h2>
            <h2 className="text-xl font-bold">Father: {userData?.father}</h2>
            <h3 className="text-lg font-bold">Village: {userData?.village}</h3>
            <h3 className="text-lg font-bold">
              Divission: {userData?.divission}
            </h3>
            <h2 className="text-lg font-bold">Email: {userData?.email}</h2>
            <p className="font-medium">User ID : {userData?._id}</p>
            <p className="font-medium">Phone Number: {userData?.phone}</p>
            <p className="font-medium">Type : {userData?.type}</p>
            <div className="grid grid-cols-2 justify-between gap-1 mt-10">
              {/* <button
                onClick={() => logout()}
                className="btn btn-sm bg-warning"
              >
                Sign Out
              </button> */}
              <input
                className="lg:ml-20"
                type="file"
                onChange={handleUploadImageBB}
                name="image"
                id=""
              />
              <button
                onClick={handleUpdateImage}
                className="btn btn-sm btn-accent"
              >
                Update Picture
              </button>

              {/* modal for update pass */}

              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-sm"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Update Password
              </button>
              <dialog id="my_modal_3" className="modal text-black">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <form onSubmit={handleUpdatePass}>
                    <input
                      type="text"
                      name="oldPassword"
                      placeholder="Old Password"
                      className="input input-bordered input-primary w-full max-w-xs"
                    />

                    <input
                      type="text"
                      name="updatePassword"
                      placeholder="New Password"
                      className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <br />
                    <input type="submit" className="btn" value="Update" />
                  </form>
                </div>
              </dialog>

              {/* Update Email */}
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-sm"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                Change Email
              </button>
              <dialog id="my_modal_4" className="modal text-black">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <form onSubmit={handleUpdateEmail}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Type new email"
                      className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <input
                      type="text"
                      name="password"
                      placeholder="Type your password"
                      className="input input-bordered input-primary w-full max-w-xs"
                    />

                    <br />
                    <input type="submit" className="btn" value="Update" />
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="avatar -top-16 left-28 md:left-44 lg:left-60 absolute z-40">
          <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={userData?.photoUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
