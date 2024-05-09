/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddMoney = () => {
    const { uid } = useParams();
    const [userData] = useGetSingleUser(uid);
    const axiosPublic = useAxiosPublic();

    // Function to automatically update user data if the next month has arrived and user hasn't updated their money
    const autoUpdateUserData = async () => {
        try {
            const currentDate = new Date();
            // console.log(currentDate);
            const nextMonth = new Date(currentDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(1);
            nextMonth.setHours(0, 0, 0, 0);

            // Check if the next month has arrived
            if (currentDate.getTime() >= nextMonth.getTime()) {
                // Check if user hasn't updated their money for the current month
                const lastUpdatedDate = new Date(userData?.lastUpdatedDate);
                if (lastUpdatedDate.getMonth() !== currentDate.getMonth()) {
                    // If the user hasn't updated their money for the current month, update it
                    await updateUserData();
                }
            }
        } catch (error) {
            console.error('Error auto-updating user data:', error);
        }
    };

    // Function to update user data by calling the backend API
    const updateUserData = async () => {
        try {
            await sendUserData(); // Call the function to send user data
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // Function to fetch user data from the backend API
    const sendUserData = async () => {
        try {
            // Construct the user data object to be sent to the backend
            const userInfo = {
                uid: userData?.uid,
                name: userData?.name,
                father: userData?.father,
                email: userData?.email,
                divission: userData?.divission,
                phone: userData?.phone,
                village: userData?.village,
                photoUrl: userData?.photoUrl,
                type: userData?.type,
                money: 0, // Set money to 0 as the user hasn't updated for the current month
                date: new Date().toISOString(), // Set the current date
                lastUpdatedDate: new Date().toISOString(), // Set the last updated date to the current date
            };

            // Send the user data to the backend
            await axiosPublic.post('/add/money', userInfo);
            console.log('User data updated successfully.');
        } catch (error) {
            console.error('Error sending user data:', error);
        }
    };

    // Call autoUpdateUserData when the component mounts
    useState(() => {
        autoUpdateUserData();
    }, []);

    const handleSubmitMoney = async (e) => {
        e.preventDefault();
        const form = e.target;
        const money = form.money.value;
        const date = form.date.value;
        const dateIso = `${date}T00:00:00.000Z`;  //convert date into isoString format; 
        // console.log(dateIso);
        // console.log(new Date().toISOString());

        // Construct the user data object to be sent to the backend
        const userInfo = {
            uid: userData?.uid,
            name: userData?.name,
            father: userData?.father,
            email: userData?.email,
            divission: userData?.divission,
            phone: userData?.phone,
            village: userData?.village,
            photoUrl: userData?.photoUrl,
            type: userData?.type,
            money: money,
            date: dateIso,
            lastUpdatedDate: dateIso, // Set the last updated date to the current date
        };

        // Send the user data to the backend
        try {
            await axiosPublic.post('/add/money', userInfo);
            console.log('User data sent successfully.');
        } catch (error) {
            console.error('Error sending user data:', error);
        }
    };

    return (
        <div className='w-11/12 md:w-1/2 mx-auto mt-28'>
            <h1 className="text-5xl font-bold mb-4 text-center">To Add Money Be Careful</h1>
            <div className="border-2  border-blue-600 rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                <form onSubmit={handleSubmitMoney} className="">
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
