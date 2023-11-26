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
import AddNewPat from "../Components/Dashboard/AddNewPat/AddNewPat";
import PetListining from "../Components/Shared/PetListining/PetListining";
import PetByCategory from "../Components/Shared/Home/PetByCategory/PetByCategory";
import PetDetails from "../PetDetails/PetDetails";
import DonationCampaigns from "../Components/DonationCampaigns/DonationCampaigns";
import DonateDetails from "../Components/DonationCampaigns/DonateDetails";


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
      {
        path: "/petlisting",
        element: <PetListining />,
      },
      {
        path: '/payment',
        element: <Payment></Payment>
      },
      {
        path: "/donationCampaigns",
        element: <DonationCampaigns />,
      },
      {
        path: "/petDetails/:id",
        element: <PrivateRoute><PetDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/pet/${params.id}`)
      },
      {
        path: "/donateDetails/:id",
        element: <PrivateRoute><DonateDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/pet/${params.id}`)
      },
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
        path: "/petbycategory/:id",
        element: <PetByCategory />,
        loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
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
        path: 'addnewpet',
        element: <AddNewPat></AddNewPat>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      // {
      //   path: 'payment',
      //   element: <Payment></Payment>
      // },
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
        loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
      }
    ]
  }
]);