import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import useAxiosPublic from '../Hooks/useAxiosPublic';
import app from '../../../Firebase.init';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUserEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signinUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const createUserWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUserWithGithub = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const userSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (cuser) => {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setUser(cuser)

            if (cuser) {
                // get Token
                const userDAta = { email: cuser.email }
                axiosPublic.post('/jwt', userDAta)
                    .then(res => {
                        if (res.data?.token) {
                            localStorage.setItem('accessToken', res.data.token)
                            setLoading(false)
                        }
                    })
            }
            else {
                // do Somethings remove token (if token store in the clients side )
                localStorage.removeItem('accessToken')
                setLoading(false)
            }
        });
        return () => { return unSubscribe() }
    }, [axiosPublic])


    const authInfo = { createUserEmail, createUserWithGithub, createUserWithGoogle, user, loading, userSignOut, signinUser, updateUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;