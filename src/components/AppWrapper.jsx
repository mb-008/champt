import { auth } from "../firebase-config.jsx";
import { signOut } from "firebase/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
        setIsInChat(false);
    };
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className="App">
            <div className="app-header bg-gradient-to-br from-green-400 to-blue-600">
                <h1 className="mb-4 inline-block text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" data-aos="fade-up" data-aos-duration="1000"><center><img src="public/doge coin.png" alt="logo" className="h-10 inline-block" /></center> Champt </h1>
            </div>
            <div className="app-container">{children}</div>
            {isAuth && (
                <div className="sign-out">
                    <button onClick={signUserOut} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Sign Out
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};
