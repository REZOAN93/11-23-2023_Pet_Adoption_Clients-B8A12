import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import imggithub from '../../../assets/github.png'
import { GithubAuthProvider } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const GithubLogin = () => {
    const { createUserWithGithub } = useAuth()
    const navigate = useNavigate()
    const provider = new GithubAuthProvider();
    const axiosPublic = useAxiosPublic()
    const from = location.state?.from?.pathname || '/'
    const handleLogin = () => {
        createUserWithGithub(provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                const userInfo = {
                    email: user?.email,
                    name: user?.displayName
                }
                axiosPublic.post('/users', userInfo)
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
                const credential = GithubAuthProvider.credentialFromError(error);
            });

    }
    return (
        <div>
            <div>
                <button onClick={handleLogin}>
                    <img className=' cursor-pointer h-10 rounded-full' src={imggithub} alt="" />
                </button>
            </div>
        </div>
    );
};

export default GithubLogin;