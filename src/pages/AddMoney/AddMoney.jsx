/* eslint-disable react/no-unescaped-entities */

import { useParams } from "react-router-dom";
import useGetSingleUser from "../../hooks/useGetSingleUser";

const AddMoney = () => {
    const { uid } = useParams();
    console.log(uid);

    const [userData] = useGetSingleUser(uid);
    console.log(userData);


    return (
        <div className='w-11/12 md:w-1/2 mx-auto mt-28'>
            <h1 className="text-5xl font-bold mb-4 text-center">To Add Money Be Careful</h1>
            <div className="border-2  border-blue-600 rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                <form onSubmit='' className="">
                    <div>
                        <label className="label">
                            <span className="text-xl font-medium">Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={userData?.name} readOnly placeholder="name" className="input rounded-md w-full border-blue-600" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-xl font-medium">Father's Name</span>
                        </label>
                        <input type="text" name='father' defaultValue={userData?.father} readOnly placeholder="Your father's name" className="input rounded-md w-full border-blue-600" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-xl font-medium">Date</span>
                        </label>
                        <input type="date" name='date' placeholder="Your father's name" className="input rounded-md w-full border-blue-600" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-xl font-medium">Amount of money</span>
                        </label>
                        <input type="number" name='money' placeholder="Amount of Money" className="input rounded-md w-full border-blue-600" required />
                    </div>
                    <div className="form-control mt-6">
                        <input className='btn btn-outline border-blue-600 hover:bg-green-800 capitalize text-xl font-semibold' type="submit" value="Add Money" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMoney;