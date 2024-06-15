import swal from "sweetalert";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_ImageBB_API;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCost = () => {
    const axiosPublic = useAxiosPublic();
    const [imageUrl, setImageUrl] = useState("");   // store image URL

    // Upload Image into imageBB
    const handleUploadImageBB = async (e) => {
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);
        const res = await axios.post(image_hosting_url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Image url", res.data.data.display_url);
        setImageUrl(res.data.data.display_url);
    };

    const handleDonation = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const village = form.village.value;
        const divission = form.divission.value;
        const items = form.items.value;
        const date = form.date.value;
        const money = parseFloat(form.money.value);

        const donation = {
            name,
            village,
            divission,
            items,
            itemsPicture: imageUrl,
            date,
            money,
        };

        axiosPublic.post("/add/cost", donation)
            .then(res => {
                if (res.status === 200) {
                    swal("Successful!", "Donation added", "success");
                    form.reset();
                }
            })
            .catch(error => {
                console.log(error);
                swal("Oops", "Error adding donation", "error");
            });
    };

    // Prevent changing amount on mouse wheel
    const handleWheel = (e) => {
        e.preventDefault();
    };

    return (
        <div className="mt-28">
            <div className='w-11/12 lg:w-1/2 mx-auto'>
                <h1 className="text-5xl font-bold mb-4 text-center">Add Total Donation</h1>
                <div className="border-2 border-blue-600 rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                    <form onSubmit={handleDonation} className="">
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Benifited People Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Add Benifited People Name" className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Village / Town</span>
                            </label>
                            <input type="text" name='village' placeholder="village / town" className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Divission</span>
                            </label>
                            <input type="text" name='divission' placeholder="divission" className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Given Item</span>
                            </label>
                            <textarea name="items" className="textarea textarea-bordered h-24 rounded-md w-full border-blue-600" placeholder="List of Item" required></textarea>
                        </div>
                        {/* Given Item image */}
                        <div className="">
                            <label className="label">
                                <span className="text-xl font-medium">Given Item Picture</span>
                            </label>
                            <div className="relative">
                                <div className="flex justify-between items-center px-4 border-2 border-blue-400 rounded-md hover:text-blue-500">
                                    <input type="file" name="image" placeholder="image" onChange={handleUploadImageBB} className="relative w-full z-10 h-10 opacity-0" />
                                    <FaImage className="text-xl" />
                                </div>
                                <p className="absolute top-2 left-5 opacity-50">{imageUrl ? imageUrl : "Upload Given Item's Photo"}</p>
                            </div>
                        </div>

                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Date</span>
                            </label>
                            <input type="date" name='date' className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Amount of donation</span>
                            </label>
                            <input type="number" name='money' min="1" step="0.01" onWheel={handleWheel} placeholder="Amount of Money" className="input rounded-md w-full border-blue-600 focus:outline-none focus:ring" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn btn-outline border-blue-600 hover:bg-green-800 capitalize text-xl font-semibold' type="submit" value="Donate" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCost;
