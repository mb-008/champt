import { auth, provider } from "../firebase-config.jsx";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <div className="text-center">
            <p className="flex items-center text-2xl font-extrabold dark:text-black" data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"> Sign In With <span className="bg-blue-100 text-black text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-black ml-2" >Google</span> To Continue </p>
            <br />
            <button onClick={signInWithGoogle} type="button" data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                </svg>
                Sign in with Google
            </button>
        </div>
    );
};