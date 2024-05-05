/* eslint-disable react/no-unescaped-entities */

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useGetSingleUser from "../../hooks/useGetSingleUser";


const BecomeMember = () => {
    const {user} = useContext(AuthContext);
    // console.log(user);

    const [userData] = useGetSingleUser(user?.uid);
    console.log(userData);

    return (
        <div className="mt-32 w-11/12 mx-auto">
            <div className="">
                <div className="flex mx-auto flex-col gap-10 justify-center lg:flex-row md:px-4">
                    <div className="w-full lg:w-1/2">
                        <p className="text-justify md:mt-40 border-2 border-blue-600 p-6 text-xl shadow-lg rounded-md shadow-gray-500">হিলফুল ফুযুল এর সদস্য হলে আপনাকে প্রতিমাসে ১০০ টাকা করে জমা করতে হবে । যা অসহায়, গরিব মানুষকে সাহায্যে ব্যবহার হবে ।এছাড়াও বিভিন্ন সামাজিক উন্নয়নে ও বিপদগ্রস্থ মানুষকে সাহায্যে আপনার টাকা খরচ করা হবে । <br />

                       <span className="font-bold"> আপনি যদি এই শর্তে রাজি থাকেন তাহলে হিলফুল ফুযুল এর সদস্য হতে পারেন ।</span> <br/>

                        দান করলে সম্পদ কখনো কমে না। দানের প্রতিদান মহান আল্লাহ প্রদান করবেন, কেননা আল্লাহ বলেন,
                        তোমরা যারা আল্লাহ্‌র রাস্তায় দান করবে তার প্রতিদান তোমাদেরকে পুরোপুরি দেয়া হবে । আর তোমাদের প্রতি কোন প্রকার জুলুম করা হবে না । (সুরা আনফাল ৬০)</p>
                    </div>
                    <div className='w-full lg:w-1/2'>
                        <h1 className="text-5xl font-bold mb-4 text-center">Become a member</h1>
                        <div className="border-2  border-blue-600 rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                            <form onSubmit='' className="">
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Your Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="name" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Your Father's Name</span>
                                    </label>
                                    <input type="text" name='father' placeholder="Your father's name" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Phone Number</span>
                                    </label>
                                    <input type="number" name='number' placeholder="phone number" className="input rounded-md w-full border-blue-600" required />
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
                                <div className="form-control mt-6">
                                    <input className='btn btn-outline border-blue-600 hover:bg-green-800 capitalize text-xl font-semibold' type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeMember;