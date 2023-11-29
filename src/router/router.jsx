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
import CreateDonation from "../Components/DonationCampaigns/CreateDonation";
import MyDonationCampaigns from "../Components/DonationCampaigns/MyDonationCampaigns";
import UpdateDonation from "../Components/DonationCampaigns/UpdateDonation";
import MyAdoptionRequest from "../Components/Dashboard/MyAdoptionRequest/MyAdoptionRequest";
import AllPets from "../Components/AllPets/AllPets";
import Alldonationcampaigns from "../Components/DonationCampaigns/Alldonationcampaigns/Alldonationcampaigns";


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
        loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/pet/${params.id}`)
      },
      {
        path: "/donateDetails/:id",
        element: <PrivateRoute><DonateDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/campaigns/${params.id}`)
      },
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
        loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/category/${params.id}`)
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
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
        element: <PrivateRoute><AddNewPat></AddNewPat></PrivateRoute>
      },
      {
        path: 'addedpet',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
        path: 'myDonationCampaigns',
        element: <PrivateRoute><MyDonationCampaigns></MyDonationCampaigns></PrivateRoute>
      },
      {
        path: 'createDonation',
        element: <PrivateRoute><CreateDonation></CreateDonation></PrivateRoute>
      },
      {
        path: 'paymenthistroy',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'adoptionrequest',
        element: <MyAdoptionRequest></MyAdoptionRequest>
      },

      // admin routes
      {
        path: 'allPets',
        element: <Adminroute><AllPets></AllPets></Adminroute>
      },
      {
        path: 'allusers',
        element: <Adminroute><AllUser></AllUser></Adminroute>
      },
      {
        path: 'alldonationcampaigns',
        element: <Adminroute><Alldonationcampaigns></Alldonationcampaigns></Adminroute>
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
        element: <PrivateRoute><UpdateItems></UpdateItems></PrivateRoute>,
        loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/pet/${params.id}`)
      },
      {
        path: 'updateCampaigns/:id',
        element: <PrivateRoute><UpdateDonation></UpdateDonation></PrivateRoute>,
        loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/campaigns/${params.id}`)
      }
    ]
  }
]);