import { Link, NavLink } from "react-router-dom";
import { IoMdCloseCircleOutline, IoMdLogIn, IoIosContact } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaPeopleGroup, FaPeopleRoof,FaMoneyBill1Wave, FaPeopleLine } from "react-icons/fa6";
import { TbCoinTakaFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
// import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { BsPeopleFill } from "react-icons/bs";
import './active.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { RiLogoutCircleLine } from "react-icons/ri";
import useGetSingleUser from "../../../hooks/useGetSingleUser";
import logo from "../../../assets/images/Hilfulfuzul.png";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    // console.log(user);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileClick, setIsProfileClicked] = useState(false);

    const [userData] = useGetSingleUser(user?.uid);
    // console.log(userData);

    const handleLogout = () => {
        logout();
        setIsProfileClicked(false);
    }

    return (
        <div>
            <div className="navbar fixed top-0 z-50 md:px-6 text-blue-600 font-bold bg-white shadow-2xl border-2 border-b-blue-700 rounded-b-xl">
                {/* small devices */}
                <div className="navbar-start w-full lg:w-1/2">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost mr-2 lg:hidden">
                            {
                                isOpen ? <IoMdCloseCircleOutline onClick={() => setIsOpen(false)} className="text-xl" /> : <svg onClick={() => setIsOpen(true)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            }
                        </div>
                        {
                            isOpen ? <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                                <NavLink to='/' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><IoHomeOutline /> Home</NavLink>
                                <NavLink to='/contact' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><IoIosContact /> Contact Us</NavLink>
                                <NavLink to='/about' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><BsPeopleFill /> About HilFul Fuzul</NavLink>
                                {
                                    userData && <div>
                                        <NavLink to='/allMembers' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><FaPeopleGroup /> All Members</NavLink>

                                        <NavLink to='/becomeMember' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><FaPeopleRoof /> Become a member</NavLink>

                                    </div>
                                }
                            </ul> : ''
                        }
                    </div>
                    <Link to='/' className="flex items-center justify-center">
                        <img src={logo} className="w-16 h-14" alt="" />
                        <h2 className="text-lg md:text-2xl">Hilful Fuzul</h2>
                    </Link>
                </div>
                {/* large devices */}
                <div className="navbar-center top-4 hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <NavLink to='/' className="text-base hover:bg-green-800 hover:text-white rounded-md py-1 px-2 flex items-center gap-1"><IoHomeOutline /> Home</NavLink>
                        <NavLink to='/contact' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><IoIosContact /> Contact Us</NavLink>
                        <NavLink to='/about' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><BsPeopleFill /> About Hilful Fuzul</NavLink>
                        {
                            userData && <div className="flex">
                                <NavLink to='/allMembers' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><FaPeopleGroup /> All Members</NavLink>
                                <NavLink to='/becomeMember' className="text-base hover:bg-green-800 hover:text-white rounded-md p-2 flex items-center gap-1"><FaPeopleRoof /> Become a member</NavLink>

                            </div>
                        }
                    </ul>
                </div>

                {/* User Icon Routes || Navbar End */}
                <div className="navbar-end">
                    {
                        user ? <div className="flex items-center gap-4">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className=""> <img onClick={() => setIsProfileClicked(!isProfileClick)} src={userData?.photoUrl} title={user?.displayName} className="w-10 h-10 rounded-full border-2 shadow-lg border-blue-800 cursor-pointer" alt={user?.displayName} /></div>
                                {
                                    isProfileClick && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <Link to='/myProfile' className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><CgProfile /> My Profile</Link>
                                        {
                                            (userData.type === 'member' || userData.type === 'admin' || userData.type === 'superAdmin') &&
                                            <Link to='/see/total/money' onClick={() => setIsProfileClicked(false)} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><TbCoinTakaFilled /> See Total Money</Link>
                                        }
                                        {
                                            (userData.type === 'superAdmin' || userData.type === 'admin') && <div>
                                                <Link to="/add/cost" onClick={() => setIsProfileClicked(false)} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><GiReceiveMoney /> Add Cost</Link>
                                            </div>
                                        }
                                        {
                                            (userData.type === 'superAdmin' || userData.type === 'admin') && <div>
                                                <Link to="/cash" onClick={() => setIsProfileClicked(false)} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><FaMoneyBill1Wave /> Cash</Link>
                                            </div>
                                        }
                                        {
                                            userData.type === 'superAdmin' && <div>
                                                <Link to="/benifited/people" onClick={() => setIsProfileClicked(false)} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><LiaPeopleCarrySolid /> Benifited People</Link>
                                            </div>
                                        }
                                        {
                                            userData.type === 'superAdmin' && <div>
                                                <Link to="/all/users" onClick={() => setIsProfileClicked(false)} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><FaPeopleGroup />All Users </Link>
                                            </div>
                                        }
                                        
                                        {
                                            userData.type === 'superAdmin' && <div>
                                                <Link to="/admins" onClick={() => setIsProfileClicked(false)} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><FaPeopleLine /> All Admins</Link>
                                            </div>
                                        }
                                         <Link onClick={handleLogout} className="flex items-center gap-2 hover:bg-green-800 hover:text-white rounded-lg p-2"><RiLogoutCircleLine /> Logout</Link>
                                    </ul>
                                }
                            </div>
                        </div> :
                            <Link to='/login' className="btn btn-sm btn-outline text-base font-bold text-blue-600 hover:bg-green-800"><IoMdLogIn /> Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;