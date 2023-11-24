import './Login.css'
import img1 from '../../../assets/hockessin-adoption.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgfacebook from '../../../assets/facebook.svg'
import imggithub from '../../../assets/github.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import SocialLogin from '../SocialLogin';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import GithubLogin from '../GithubLogin';


const Login = () => {
    const { signinUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()
    const from = location.state?.from?.pathname || '/'
    const [disabled, setDisable] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signinUser(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const userLastSign = user?.metadata?.lastSignInTime;

                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    userLastSign: userLastSign
                }
                axiosPublic.put('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(from, { replace: true });
                    })
                // ...
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }
    const handlecaptachcheck = (e) => {
        const captaValue = e.target.value;
        if (validateCaptcha(captaValue) == true) {
            setDisable(false)
        }
        else {
            // alert('capcha does not match Please type correctly')
            Swal.fire({
                title: "Wrong Captcha!",
                text: "Please Enter the Captcha Again !",
            });
            setDisable(true)
        }
    }

    return (
        <div className="loginContainer px-32 pt-5 pb-5">
            <div className=" grid grid-cols-2 items-center bg-gradient-to-l from-white to-gray text-black rounded-lg">
                <div className="text-center lg:text-left p-5">
                    <img src={img1} alt="" />
                </div>
                <div className="w-9/12 mx-auto">
                    <p className=' font-bold text-5xl text-center'>Login</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" />
                        </div>
                        <div className="form-control mt-5 grid grid-cols-2 gap-6">
                            <div className=' rounded-2xl bg-white text-center items-center flex justify-center'>
                                <LoadCanvasTemplate />
                            </div>
                            <input onBlur={handlecaptachcheck} type="text" placeholder="Type Here" name='captcha' className="input input-bordered" />
                        </div>
                        <div className="form-control mt-2">
                        </div>
                        <div className="form-control  mt-5">
                            <p>{error}</p>
                            {/* disabled={disabled} need to do it */}
                            <button disabled={disabled} className="btn capitalize hover:bg-green-900  text-white text-2xl font-bold bg-green-700 border-none">Sign In</button>
                        </div>
                    </form>
                    <div className="form-control  mt-2 text-center">
                        <p className=' text-black'>New here? <Link to={'/register'} className=' font-bold text-red-800'>Create a New Account</Link></p>
                        <p className='mt-1'>Or sign in with</p>
                        <div className=' flex pt-3 items-center justify-center gap-3'>
                            {/* <img className=' cursor-pointer h-10 rounded-full' src={imgfacebook} alt="" /> */}
                            <GithubLogin></GithubLogin>
                            {/* <img className=' cursor-pointer h-10 rounded-full ' src={imggithub} alt="" /> */}
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;