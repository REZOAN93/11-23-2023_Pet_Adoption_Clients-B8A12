import { Link, useRouteError } from "react-router-dom";
import error1 from "../../../assets/error.svg";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className=" max-w-7xl my-10 mx-auto lg:px-20">
      <div className=" relative">
        <div className=" absolute w-full h-full border py-4 px-4 lg:py-24 lg:px-32 lg:space-y-5 bg-gradient-to-r from-slate-500 rounded-2xl">
          <h1 className=" text-xl lg:text-5xl font-extrabold text-white">
            Somethings Went Wrong!
          </h1>
          <p className=" hidden lg:block lg:text-2xl text-white">
            We are sorry, the page you requested could not be found, <br />{" "}
            Please go back to the homepage
          </p>
          <p className=" font-bold text-center text-3xl text-red-600">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
        <div className=" flex justify-center items-center">
          <img src={error1} alt="" />
        </div>
        <div className=" absolute bottom-0 w-full">
          <div className="text-center text-lg lg:text-2xl py-3 px-3 flex justify-end items-center">
            <Link
              to={"/"}
              className="btn btn-outline text-red-700 font-bold lg:text-xl hover:bg-red-700 hover:border-none"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
