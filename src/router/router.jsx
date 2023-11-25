import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Components/Shared/ErrorPage/ErrorPage";
import Home from "../Components/Shared/Home/Home";
import Profile from "../Components/Authentication/Profile/Profile";
import Registration from "../Components/Authentication/Registeration/Registration";
import Login from "../Components/Authentication/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Components/Dashboard/Dashboard";
import Userhome from "../Components/Dashboard/UserHome/Userhome";
import Cart from "../Components/Dashboard/Cart/Cart";
import Payment from "../Components/Dashboard/Payment/Payment";
import PaymentHistory from "../Components/Dashboard/PaymentHistory/PaymentHistory";
import Adminroute from "./Adminroute";
import AdminHome from "../Components/Dashboard/AdminHome/AdminHome";
import AllUser from "../Components/Authentication/AllUser";
import ManageItems from "../Components/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../Components/Dashboard/UpdateItems/UpdateItems";
import Additems from "../Components/Dashboard/AddItems/Additems";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/ourmenue",
      //   element: <PrivateRoute><MenuPage /></PrivateRoute>,
      // },
      // {
      //   path: "/order/:category",
      //   element: <Order />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'userhome',
        element: <Userhome></Userhome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymenthistroy',
        element: <PaymentHistory></PaymentHistory>
      },
      // admin routes
      {
        path: 'adminHome',
        element: <Adminroute><AdminHome></AdminHome></Adminroute>
      },
      {
        path: 'allusers',
        element: <Adminroute><AllUser></AllUser></Adminroute>
      },
      {
        path: 'additems',
        element: <Adminroute><Additems></Additems></Adminroute>
      },
      {
        path: 'manageItems',
        element: <Adminroute><ManageItems></ManageItems></Adminroute>
      },
      {
        path: 'updateItems/:id',
        element: <Adminroute><UpdateItems></UpdateItems></Adminroute>,
        loader: ({ params }) => fetch(`https://11-11-2023-bistro-boss-server.vercel.app/menu/${params.id}`)
      }
    ]
  }
]);