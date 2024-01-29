
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import store from './store';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "../src/components/Reuseable/model.css";
import API_ENDPOINTS from './Routes/API_routes';
import { showMessage } from './components/Reuseable/Tostify';
import nointernet from "./assets/Images/Nointernet.svg"
function App({ children }: any) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = secureLocalStorage.getItem("token");
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [isOnline, setIsOnline] = useState<any>(navigator.onLine);
    const [inputValue, setInputValue] = useState<string>("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    useEffect(() => {


        if (!token) {

            const headers = { Authorization: 'Bearer ' + token, };
            const formData = new FormData();
            axios
                .post(API_ENDPOINTS.AllStudents, formData, { headers })
                .then((response) => {
                    if (response.status == 401) {
                        openModal()

                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                });
        }

    }, [location]);
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            showMessage("Welcome back! You are now online.", "success");
        };
        const handleOffline = () => {
            showMessage("You are offline! Check your internet connection.", "error")
            setIsOnline(false);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [])



    const handleLogout = () => {
        secureLocalStorage.removeItem("token");
        secureLocalStorage.removeItem('email');
        // navigate("/auth/boxed-signin");

    };
    if (!isOnline) {
        return (


            <div className='container-fluid'>

                <div className='container'>
                    <div className='row '  >
                        <div className='col-12 d-flex justify-content-center'>
                            <img

                                style={{ height: "100%", width: "50%", objectFit: "cover", marginLeft: "29%" }}

                                src={nointernet}
                                alt="No InterNet"
                            />

                        </div>


                    </div>
                    <div className='row align-item-center mb-5'>
                        <div className='col d-flex justify-content-center align-items-center text-center'>

                            <h1 className=" px-6 py-2 rounded-md" style={{ color: "hsl(258, 87%, 28%)", fontWeight: 800 }}>
                                Check your internet connection and try again!
                            </h1>

                        </div>
                    </div>
                </div>
            </div>

        );
    }

    return (
        <>
            {isModalOpen && (
                <div className="custom-modal">
                    <div className="modal-content">
                        <h1 className='py-2 font-semibold text-lg '>Your token has been expired.</h1>
                        <h1 className='pt-0 py-2 font-semibold text-lg ' >Please login again!</h1>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className="py-3" >
                                <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }} onClick={() => { closeModal(); handleLogout(); }}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass} main-section antialiased relative font-Urbanist text-sm font-normal`}
            >                {children}
            </div>
        </>
    );
}

export default App;






