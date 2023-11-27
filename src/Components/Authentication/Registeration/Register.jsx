// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useContext } from 'react';
// import { AuthContext } from '../../Context/AuthProvider';
// import Header from '../../Shared/Header/Header';
// import Swal from 'sweetalert2';

// const Register = () => {
//     const { createUserWithEmail, updateUser, signOutUser } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [error, setError] = useState("");
//     const [showPassword, setshowPassword] = useState(false);

//     const handleCreateUser = (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const firstName = form.firstName.value;
//         const lastName = form.lastName.value;
//         const name = firstName + ' ' + lastName;
//         const email = form.email.value;
//         const gender = form.Gender.value;
//         const age = form.age.value;
//         const role = 'user'
//         const password = form.password.value;
//         const photoURl = form.photoURL.value;
//         console.log(name, email, password, photoURl, gender, age, role)

//         if (password.length < 6) {
//             setError("Password must be six characters long or more");
//             return;
//         }
//         if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
//             setError("Password should contain at least one Special character");
//             return;
//         }
//         if (!/(?=.*?[A-Z])/.test(password)) {
//             setError("Password should contain at least one Capital character");
//             return;
//         }

//         createUserWithEmail(email, password)
//             .then((userCredential) => {
//                 // Signed up
//                 const user = userCredential.user;
//                 const userCreationTime = user.metadata.creationTime;
//                 // ...
//                 const newUser = { email, name, photoURl, userCreationTime, password, gender, age, role };
//                 fetch(
//                     "https://assignment11-zeta.vercel.app/user",
//                     {
//                         method: "POST",
//                         headers: { "content-type": "application/json" },
//                         body: JSON.stringify(newUser),
//                     }
//                 )
//                     .then((res) => res.json())
//                     .then((data) => {
//                         Swal.fire({
//                             position: "top-center",
//                             icon: "success",
//                             title: "Account is Created & Please Log In",
//                             showConfirmButton: false,
//                             timer: 1500,
//                         });
//                     });
//                 if (user) {
//                     handleUpdateUser(name, photoURl);
//                     navigate("/login");
//                     form.reset();
//                     signOutUser();
//                 }
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 setError(errorMessage);
//                 // ..
//             });

//         const handleUpdateUser = (name, photo) => {
//             const profile = {
//                 displayName: name,
//                 photoURL: photo,
//             };
//             updateUser(profile)
//                 .then(() => {
//                     // Profile updated!
//                     // ...
//                 })
//                 .catch((error) => {
//                     // An error occurred
//                     // ...
//                 });
//         };
//     };
//     return (
//         <div className=' pb-10 px-3 lg:px-0'>
//             <div className=' max-w-7xl mx-auto '>
//                 <Header></Header>
//             </div>
//             <div className="card lg:w-2/3 bg-green-200 mx-auto ">
//                 <form onSubmit={handleCreateUser} className="card-body">
//                     <p className=' text-center text-black text-2xl lg:text-4xl font-bold'>Register</p>
//                     {/* <p className=' text-center text-white'>It's quick and easy.</p> */}
//                     {/* <div className="form-control mt-4 grid lg:grid-cols-2 gap-5">
//                         <input type="text" name='firstName' placeholder="First Name" className="input text-lg py-6 input-bordered bg-[#DCE8FF]" required />
//                         <input type="text" name='lastName' placeholder="Surname" className="input text-lg py-6 input-bordered bg-[#DCE8FF]" required />
//                     </div> */}
//                     <div className="form-control mt-2">
//                         <input type="email" name='email' placeholder="Email Address" className="input text-lg py-6 input-bordered bg-[#DCE8FF]" required />
//                     </div>
//                     <div className="form-control mt-2 relative">
//                         <input name='password' type={showPassword ? "text" : "password"} placeholder="New password" className="input text-lg py-6 input-bordered bg-[#DCE8FF]" required />
//                         <span onClick={() => setshowPassword(!showPassword)} className=" cursor-pointer absolute right-5 top-3 text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//                     </div>

//                     <div className="form-control grid lg:grid-cols-2 mt-2 gap-5">
//                         <div className=''>
//                             <label className="">
//                                 <span className="label-text">Date of birth</span>
//                             </label>
//                             <input type="date" name="age" id="" placeholder='Date of Birth' className='input w-full text-lg py-6 input-bordered bg-[#DCE8FF]' />
//                         </div>
//                         <div>
//                             <label className="">
//                                 <span className="label-text ">Gender</span>
//                             </label>
//                             <div>
//                                 <select className=' w-full text-lg py-3 rounded-lg px-3 input-bordered bg-[#DCE8FF]' name="Gender" id="">
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Photo URL</span>
//                         </label>
//                         <input
//                             type="url"
//                             name="photoURL"
//                             placeholder="Enter the Photo URL"
//                             className="input input-bordered bg-[#DCE8FF]"
//                         />
//                     </div> */}
//                     <div className="form-control mt-2">
//                         <p className=' text-gray-500 text-xs text-justify mb-3'>By clicking Register, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
//                         <button className="text-white py-2 rounded-lg text-2xl hover:bg-blue-700 font-bold bg-[#0D43AA]">Register</button>
//                         {error ? (
//                             <>
//                                 <p className=" text-red-600 text-sm text-center mt-2">{error}</p>
//                             </>
//                         ) : (
//                             ""
//                         )}
//                     </div>
//                 </form>
//                 <div className=" mb-5">

//                     <p className=' text-center lg:text-lg font-bold'>Already have an Account? <span className=' text-orange-500'><Link to={'/login'}>Login now</Link></span></p>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Register;