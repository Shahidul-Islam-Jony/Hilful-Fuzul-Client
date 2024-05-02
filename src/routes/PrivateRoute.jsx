import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { Audio } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <div className="flex justify-center">
            <Audio
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;