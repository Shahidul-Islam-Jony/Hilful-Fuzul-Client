import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGetSingleUser from "../../hooks/useGetSingleUser";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const { user, updateUser, logout, setLoading } = useContext(AuthContext);
    // console.log(user);
    const [userData] = useGetSingleUser(user?.uid);
    console.log(userData);
    const axiosPublic = useAxiosPublic();
    const [imageUrl, setImageUrl] = useState('');

    const handleUpdateImage = async () => {

        updateUser(user?.displayName, imageUrl)
            .then(res => {
                setLoading(false)
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleUploadImageBB = async (e) => {
        const image = e.target.files[0]
        // console.log(image);
        const imageFile = { image: image }
        // console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_url, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log('Image url', res.data.data.display_url);
        setImageUrl(res.data.data.display_url);
    }
    // console.log(imageUrl);

    return (
        <div className="flex mt-44 justify-center">
            <div className="relative">
                <div className="card w-[350px] md:w-[500px] lg:w-[600px] bg-primary text-primary-content">
                    <div className="card-body mt-16 text-center">
                        <h2 className="text-xl font-bold">Name: {userData?.name}</h2>
                        <h2 className="text-xl font-bold">Father: {userData?.father}</h2>
                        <h3 className="text-lg font-bold">Village: {userData?.village}</h3>
                        <h3 className="text-lg font-bold">Divission: {userData?.divission}</h3>
                        <h2 className="text-lg font-bold">Email: {userData?.email}</h2>
                        <p className="font-medium">User ID : {userData?._id}</p>
                        <p className="font-medium">Phone Number: {userData?.phone}</p>
                        <p className="font-medium">Type : {userData?.type}</p>
                        <div className="flex justify-between gap-1 mt-10">
                            <button onClick={() => logout()} className="btn btn-sm bg-warning">Sign Out</button>
                            <input className="lg:ml-20" type="file" onChange={handleUploadImageBB} name="image" id="" />
                            <button onClick={handleUpdateImage} className="btn btn-sm btn-accent">Update Profile</button>
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