// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import github from '../../../assets/github.png'
// import google from '../../../assets/google.svg'
// import { useState } from 'react';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// // import { AuthContext } from '../../Context/AuthProvider';
// import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// import Swal from 'sweetalert2';
// import { useContext } from 'react';
// import { AuthContext } from '../../Context/AuthProvider';
// import Header from '../../Shared/Header/Header';

// const LoginUser = () => {
//   const { signInWithEmail, signInWithGoogle, SignInWithGit } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [showPassword, setshowPassword] = useState(false);
//   const provider = new GoogleAuthProvider();
//   const gitProvider = new GithubAuthProvider();

//   const handleLogInUser = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     signInWithEmail(email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         const userLastSign = user?.metadata?.lastSignInTime;
//         const emailInfo = user?.email;
//         const userInfoForDB = { emailInfo, userLastSign };
//         fetch(`https://assignment11-zeta.vercel.app/users`,
//           {
//             method: "PUT",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify(userInfoForDB),
//           }
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             Swal.fire({
//               position: "top-center",
//               icon: "success",
//               title: "You have successfully LogIn",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           });
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         setError(errorMessage);
//       });
//   };

//   const handleGoogleLogin = (event) => {
//     event.preventDefault();
//     signInWithGoogle(provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };

//   const handleGithubLogin = (event) => {
//     event.preventDefault();
//     SignInWithGit(gitProvider)
//       .then((result) => {
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         const credential = GithubAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;

//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GithubAuthProvider.credentialFromError(error);
//         // ...
//       });
//   };
//   return (
//     <div className=' pb-20 space-y-3 px-3 lg:px-0'>
//       <div className=' max-w-7xl mx-auto'>
//         <Header></Header>
//       </div>
//       <div className="card  lg:w-[451px] bg-[#96B8FA] mx-auto ">
//         <form onSubmit={handleLogInUser} className="card-body">
//           <p className=' text-center text-white text-4xl mb-10 mt-5 font-bold'>Login</p>
//           <div className="form-control mb-5">
//             <input type="email" name='email' placeholder="Email or Username" className="input text-lg py-6 input-bordered bg-[#DCE8FF]" required />
//           </div>
//           <div className="form-control relative">
//             <input name='password' type={showPassword ? "text" : "password"} placeholder="Password" className="input text-lg py-6 input-bordered bg-[#DCE8FF]" required />
//             <span onClick={() => setshowPassword(!showPassword)} className=" cursor-pointer absolute right-5 top-3 text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//           </div>
//           <div className="form-control mt-6">
//             {error ? (
//               <>
//                 <p className=" text-red-600 text-sm text-center mb-2">{error}</p>
//               </>
//             ) : (
//               ""
//             )}
//             <button className="text-white py-2 rounded-lg text-2xl hover:bg-blue-700 font-bold bg-[#0D43AA]">Login</button>
//           </div>
//         </form>
//         <div className=" mb-10">
//           <p className=' text-center text-lg font-bold'>Or login with</p>
//           <div className=' px-3 grid lg:px-16 mx-auto py-2 grid-cols-2 gap-10 items-center justify-center'>
//             <button onClick={handleGithubLogin} className='btn border-none hover:bg-[#1976D2] hover:text-white bg-[#DCE8FF] text-[#1976D2]'><img className='w-8 h-8' src={github} alt="" />Github</button>
//             <button onClick={handleGoogleLogin} className='btn border-none hover:bg-[#1976D2] hover:text-white bg-[#DCE8FF] text-[#1976D2]'><img className='w-8 h-8' src={google} alt="" />Google</button>
//             <div></div>
//           </div>

//           <p className=' text-center text-xl font-bold'>Not a member? <span className=' text-orange-500'><Link to={'/register'}>Register now</Link></span></p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LoginUser;