import React, { useContext } from 'react';
import imgGoogle from '../../assets/google.svg'
import useAuth from '../Hooks/useAuth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SocialLogin = () => {
    const { createUserWithGoogle } = useAuth()
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()
    const from = location.state?.from?.pathname || '/'

    const handleGoogleLogin = () => {
        createUserWithGoogle(provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

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
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }
    return (
        <div>
            <div>
                <button onClick={handleGoogleLogin}>
                    <img className=' cursor-pointer h-10 rounded-full' src={imgGoogle} alt="" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;