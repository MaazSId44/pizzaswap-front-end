
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import store from './store';
import "../src/components/Reuseable/model.css";
import { showMessage } from './components/Reuseable/Tostify';
import nointernet from "./assets/Images/Nointernet.svg"
function App({ children }: any) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [isOnline, setIsOnline] = useState<any>(navigator.onLine);

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
            <div
                className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass} main-section antialiased relative font-Urbanist text-sm font-normal`}>
                {children}
            </div>
        </>
    );
}

export default App;






