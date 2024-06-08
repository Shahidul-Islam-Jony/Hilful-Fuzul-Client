import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import swal from "sweetalert";
import Registration from "../Registration/Registration";
import './LoginStyle.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const { login, loginByGoogle, loginByFB } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email,password);
        login(email, password)
            .then(result => {
                console.log(result);
                swal("Login successful", "success");
                navigate(location.state || '/');
            })
            .catch(error => {
                if(error){

                    // console.log('error = ',error?.message);
                    swal("Oops", error?.message,"error");
                    return;
                }
            })
    }

    // Login By Google
    const handleLoginByGoogle = () => {
        loginByGoogle()
            .then(res => {
                console.log(res);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photoUrl: res.user?.photoURL,
                    type: 'user',
                    uid: res.user?.uid,
                    father: ' ',        // when update member it will need
                    phone: 0,
                    village: ' ',
                    divission: ' ',
                }
                // console.log(userInfo);
                // call api to send userInfo to database
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data._id) {
                            swal("Login successful", "success");
                            navigate(location.state || '/');
                        }
                    })
            })
            .catch(error => {
                if(error){

                    // console.log('error = ',error?.message);
                    swal("Oops", error?.message,"error");
                    return;
                }
            })
    }

    // Login By Facebook
    const handleLoginByFacebook = () => {
        loginByFB()
            .then(res => {
                console.log(res);
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photoUrl: res.user?.photoURL,
                    type: 'user',
                    uid: res.user?.uid,
                    father: '',        // when update member it will need
                    phone: 0,
                    village: '',
                    divission: '',
                }
                // console.log(userInfo);
                // call api to send userInfo to database
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data._id) {
                            swal("Login successful", "success");
                            navigate(location.state || '/');
                        }
                    })
            })
            .catch(error => {
                if(error){

                    // console.log('error = ',error?.message);
                    swal("Oops", error?.message,"error");
                    return;
                }
            })
    }

    return (
        <div>
            <div className="flex justify-center mt-28">
                <div className={`wrapper ${isClicked ? 'active' : ''}`}>
                    {/* BG Divider login*/}
                    <span className="bg-animate"></span>
                    {/* BG Divider Registration */}
                    <span className="bg-animate2"></span>

                    {/* Login page */}
                    <div>
                        <div className="form-box login ">
                            <h2 className="animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>    {/* Insert animation class for changing login to reg by animated */}
                            <form onSubmit={handleLogin} action="#">
                                <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
                                    <input type="email" name="email" required />
                                    <label>Email</label>
                                    <MdEmail className="icon" />
                                </div>
                                <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
                                    <input type={`${isVisible ? 'text' : 'password'}`} name="password" required />
                                    <label>Password</label>
                                    {
                                        isVisible ? <FaEye onClick={() => setIsVisible(false)} className="icon" /> : <FaEyeSlash onClick={() => setIsVisible(true)} className="icon" />
                                    }
                                </div>
                                <button type="submit" className="btn1 animation" style={{ '--i': 3, '--j': 24 }}>Login</button>

                                {/* divider */}
                                <div className="animation divider divider-primary" style={{ '--i': 4, '--j': 25 }}>OR Login With</div>

                                <div className="animation flex gap-2 mt-4" style={{ '--i': 5, '--j': 26 }}>
                                    <button onClick={handleLoginByGoogle} className="btn btn-outline w-1/2 btn-sm hover:bg-blue-800"><FcGoogle /> Google</button>
                                    <button onClick={handleLoginByFacebook} className="btn btn-outline w-1/2 btn-sm hover:bg-blue-800"><FaFacebook /> Facebook</button>
                                </div>

                                <div className="logreg-link animation" style={{ '--i': 6, '--j': 27 }}>
                                    <p>Do not have an account? <a href="#" onClick={() => setIsClicked(true)} className="register-link hover:text-blue-800">Sign Up</a></p>
                                </div>
                            </form>
                        </div>
                        {/* Right side Login Text */}
                        <div className="info-text login">
                            <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back !</h2>
                            <p className="animation" style={{ '--i': 1, '--j': 21 }}>Hilful Fuzul is always with your side.</p>
                        </div>
                    </div>
                    {/* Registration part */}
                    <Registration setIsClicked={setIsClicked}></Registration>

                </div>
            </div>
        </div>
    );
};

export default Login;