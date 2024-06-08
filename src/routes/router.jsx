import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AllMembers from "../pages/AllMembers/AllMembers";
import BecomeMember from "../pages/BecomeMember/BecomeMember";
import AddMoney from "../pages/AddMoney/AddMoney";
import SeeTotalMoney from "../pages/SeeTotalMoney/SeeTotalMoney";
import AddCost from "../pages/AddCost/AddCost";
import MyProfile from "../pages/MyProfile/MyProfile";
import OwnMonthlyMoney from "../pages/OwnMonthlyMoney/OwnMonthlyMoney";
import AllUsers from "../pages/AllUsers/AllUsers";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'myProfile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'allMembers',
                element: <PrivateRoute><AllMembers></AllMembers></PrivateRoute>
            },
            {
                path: 'becomeMember',
                element: <PrivateRoute><BecomeMember></BecomeMember></PrivateRoute>
            },
            {
                path: 'addMoney/:uid',
                element: <PrivateRoute><AddMoney></AddMoney></PrivateRoute>
            },
            {
                path: 'see/total/money',
                element: <PrivateRoute><SeeTotalMoney></SeeTotalMoney></PrivateRoute>
            },
            {
                path: 'add/cost',
                element: <PrivateRoute><AddCost></AddCost></PrivateRoute>
            },
            {
                path:'own/monthly/money/:uid',
                element:<PrivateRoute><OwnMonthlyMoney></OwnMonthlyMoney></PrivateRoute>
            },
            {
                path:'all/users',
                element:<PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            }
        ]
    }
])

export default router;
