import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const Registration = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const axiosPublic = useAxiosPublic()
    const { createUserEmail, updateUser, userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setshowPassword] = useState(false);


    const onSubmit = async (data) => {
        // upload image in the imagebb and then get the url
        // console.log(data.image[0])
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_Api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        if (res?.data?.success) {
            // console.log(res.data?.data.display_url)
            // console.log(data)
            const firstName = data.firstName;
            const lastName = data.lastName;
            const password = data.password

            if (password.length < 6) {
                setError("Password must be six characters long or more");
                return;
            }
            if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
                setError("Password should contain at least one Special character");
                return;
            }
            if (!/(?=.*?[A-Z])/.test(password)) {
                setError("Password should contain at least one Capital character");
                return;
            }

            createUserEmail(data.email, data.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    const userCreationTime = user.metadata.creationTime;
                    const userInfo = {
                        name: firstName + " " + lastName,
                        email: data.email,
                        password: password,
                        gender: data.gender,
                        dateOfBirth: data.dateOfBirth,
                        image: res.data?.data.display_url,
                        role: "user",
                        userCreationTime: userCreationTime
                    }
                    console.log(userInfo)
                    // save user in the dataBase
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data?.insertedId) {
                                handleUpdateUser(data.name, data.image);
                                reset()
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "You have Registered Successfully . Please Login !",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                userSignOut()
                                navigate('/login')
                            }
                        })
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorMessage)
                    // ..
                });

            const handleUpdateUser = (name, photo) => {
                const profile = {
                    displayName: name,
                    photoURL: photo,
                };
                updateUser(profile)
                    .then(() => {
                        // Profile updated!
                        // ...
                    })
                    .catch((error) => {
                        // An error occurred
                        // ...
                    });
            };
        }
    }
    return (
        <div className="hero registerPage" >
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div>
                    <div className=''>
                        <div className="card lg:w-2/3 bg-gradient-to-t from-white to-gray text-black mx-auto shadow-lg ">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <p className=' text-center text-white text-2xl lg:text-3xl font-bold'>Register</p>
                                <div className=' flex gap-10'>
                                    <div className="form-control  w-full">
                                        <label className="label">
                                            <span className="label-text font-bold text-white">First Name</span>
                                        </label>
                                        <input type="text" placeholder="First name" {...register("firstName", { required: true })} className="input input-bordered" />
                                        {errors.firstName && <span className='text-red-700 font-bold'>Please Enter the First Name</span>}
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-bold text-white">Last Name</span>
                                        </label>
                                        <input type="text" placeholder="Last name" {...register("lastName", { required: true })} className="input input-bordered" />
                                        {errors.lastName && <span className='text-red-700 font-bold'>Please Enter the Last Name</span>}
                                    </div>
                                </div>
                                <div className=' flex gap-5'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-bold ">Email Address</span>
                                        </label>
                                        <input type="email" placeholder="Enter Email" {...register("email", { required: true })} className="input input-bordered" />
                                        {errors.email && <span className='text-red-700 font-bold'>Please Enter the Email</span>}
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-bold ">Password</span>
                                        </label>
                                        <div className=' relative w-full'>
                                            <input type={showPassword ? "text" : "password"} placeholder="Enter Password" {...register("password", { required: true })} className="input input-bordered w-full" />
                                            <span onClick={() => setshowPassword(!showPassword)} className=" cursor-pointer absolute right-5 top-3 text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                            {errors.password && <span className='text-red-700 font-bold'>Please Enter the Password</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className=' grid grid-cols-2 gap-4 mb-3'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Gender</span>
                                        </label>
                                        <select className="input input-bordered" {...register("gender")}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text font-bold">Date of Birth</span>
                                        </label>
                                        <input type="date" placeholder="date" {...register("dateOfBirth", { required: true })} className="input input-bordered" />
                                        {errors.dateOfBirth && <span className='text-red-700 font-bold'>Please Enter the Date of Birth</span>}
                                    </div>
                                </div>
                                <input {...register("image", { required: true })} type="file" className="file-input w-full" />
                                {errors.image && <span className='text-red-700 font-bold'>Please Upload the Image</span>}
                                <div className="form-control mt-2">
                                    <p className=' text-gray-500 text-xs text-justify mb-3'>By clicking Register, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                                    <input className="text-white py-2 rounded-lg text-2xl hover:bg-black cursor-pointer font-bold bg-gray-700" type="submit" value="Register" />
                                    {error ? (<><p className=" text-red-600 text-sm text-center mt-2">{error}</p></>) : ("")}
                                </div>
                            </form>
                            <div className=" mb-5">
                                <p className=' text-center lg:text-lg font-bold'>Already have an Account? <span className=' text-teal-900'><Link to={'/login'}>Login now</Link></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;