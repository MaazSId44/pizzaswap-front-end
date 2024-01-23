import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import person from '../../assets/Images/person.png';
import secureLocalStorage from 'react-secure-storage';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';
import ReactModal from '../../components/Reuseable/ReactModal';

const RevenueDetails = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        GetUserDetail()

    });
    const [data, setData] = useState<any>();


    const token = secureLocalStorage.getItem('token')
    const { state } = useLocation();
  
    const GetUserDetail = () => {

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios.post(API_ENDPOINTS.stuDetails + state?.id, formData, { headers })
            .then(response => {
                // console.log('StuDetails===>', response?.data?.data);
                setData(response?.data?.data)


            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }




    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>

            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>User Detail</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">User Details</h5>
                        </div>
                        <div className="mb-5 mt-10">
                            <div className="flex flex-col justify-center items-center">
                                {/* <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" /> */}
                                <p style={{ fontSize: '1.5rem' }} className="font-semibold text-primary">{data?.userDetailId?.firstName && data?.userDetailId?.lastName ? data?.userDetailId?.firstName + data?.userDetailId?.firstName : 'Jimmy Turner'}</p>
                            </div>
                            <div className="flex">
                                <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                    {/* <li className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                            <path
                                                d="M2.3153 12.6978C2.26536 12.2706 2.2404 12.057 2.2509 11.8809C2.30599 10.9577 2.98677 10.1928 3.89725 10.0309C4.07094 10 4.286 10 4.71612 10H15.2838C15.7139 10 15.929 10 16.1027 10.0309C17.0132 10.1928 17.694 10.9577 17.749 11.8809C17.7595 12.057 17.7346 12.2706 17.6846 12.6978L17.284 16.1258C17.1031 17.6729 16.2764 19.0714 15.0081 19.9757C14.0736 20.6419 12.9546 21 11.8069 21H8.19303C7.04537 21 5.9263 20.6419 4.99182 19.9757C3.72352 19.0714 2.89681 17.6729 2.71598 16.1258L2.3153 12.6978Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path opacity="0.5" d="M17 17H19C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11H17.5" stroke="currentColor" strokeWidth="1.5" />
                                            <path
                                                opacity="0.5"
                                                d="M10.0002 2C9.44787 2.55228 9.44787 3.44772 10.0002 4C10.5524 4.55228 10.5524 5.44772 10.0002 6"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4.99994 7.5L5.11605 7.38388C5.62322 6.87671 5.68028 6.0738 5.24994 5.5C4.81959 4.9262 4.87665 4.12329 5.38382 3.61612L5.49994 3.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.4999 7.5L14.6161 7.38388C15.1232 6.87671 15.1803 6.0738 14.7499 5.5C14.3196 4.9262 14.3767 4.12329 14.8838 3.61612L14.9999 3.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>{' '}
                                        {data?.userDetailId?.website ? data?.userDetailId?.website : 'Web Developer'}

                                    </li>  */}
                                    {/* <li className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                            <path
                                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path opacity="0.5" d="M7 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M17 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        {data?.userDetailId?.dob ? data?.userDetailId?.dob : ' Jan 20, 1989'}

                                    </li> */}


                                    <li>
                                        <button className="flex items-center gap-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                                <path
                                                    opacity="0.5"
                                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="text-primary truncate">jimmy@gmail.com</span>
                                        </button>
                                    </li>

                                    <li className="flex items-center gap-2" style={{ marginTop: 20 }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                            <path
                                                opacity="0.5"
                                                d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M20.9605 15.5C21.6259 16.1025 22 16.7816 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 16.7816 2.37412 16.1025 3.03947 15.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>

                                        {data?.userDetailId?.address ? data?.userDetailId?.address : 'New York, USA'}

                                    </li>
                                </ul>
                                <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">

                                    <li className="flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                opacity="0.5"
                                                d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        <span className="whitespace-nowrap" dir="ltr">

                                            {data?.userDetailId?.phoneNo ? data?.userDetailId?.phoneNo : '+1 (530) 555-12121'}

                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 ">
                                        <img src={person} alt="" width={26} className="shrink-0" style={{ marginLeft: -2 }} />

                                        {data?.userDetailId?.gender ? data?.userDetailId?.gender : 'Male'}

                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Payment Details</h5>
                        </div>
                        <div className="mb-5 mt-10">
                            <div className="flex flex-col justify-center items-center">
                                {/* <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" /> */}
                                <p style={{ fontSize: '1.5rem' }} className="font-semibold text-primary">{data?.userDetailId?.firstName && data?.userDetailId?.lastName ? data?.userDetailId?.firstName + data?.userDetailId?.firstName : 'Jimmy Turner'}</p>
                            </div>
                            <div className="flex">
                                <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                    {/* <li className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                            <path
                                                d="M2.3153 12.6978C2.26536 12.2706 2.2404 12.057 2.2509 11.8809C2.30599 10.9577 2.98677 10.1928 3.89725 10.0309C4.07094 10 4.286 10 4.71612 10H15.2838C15.7139 10 15.929 10 16.1027 10.0309C17.0132 10.1928 17.694 10.9577 17.749 11.8809C17.7595 12.057 17.7346 12.2706 17.6846 12.6978L17.284 16.1258C17.1031 17.6729 16.2764 19.0714 15.0081 19.9757C14.0736 20.6419 12.9546 21 11.8069 21H8.19303C7.04537 21 5.9263 20.6419 4.99182 19.9757C3.72352 19.0714 2.89681 17.6729 2.71598 16.1258L2.3153 12.6978Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path opacity="0.5" d="M17 17H19C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11H17.5" stroke="currentColor" strokeWidth="1.5" />
                                            <path
                                                opacity="0.5"
                                                d="M10.0002 2C9.44787 2.55228 9.44787 3.44772 10.0002 4C10.5524 4.55228 10.5524 5.44772 10.0002 6"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4.99994 7.5L5.11605 7.38388C5.62322 6.87671 5.68028 6.0738 5.24994 5.5C4.81959 4.9262 4.87665 4.12329 5.38382 3.61612L5.49994 3.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.4999 7.5L14.6161 7.38388C15.1232 6.87671 15.1803 6.0738 14.7499 5.5C14.3196 4.9262 14.3767 4.12329 14.8838 3.61612L14.9999 3.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>{' '}
                                        {data?.userDetailId?.website ? data?.userDetailId?.website : 'Web Developer'}

                                    </li>  */}
                                    {/* <li className="flex items-center gap-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                            <path
                                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path opacity="0.5" d="M7 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M17 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        {data?.userDetailId?.dob ? data?.userDetailId?.dob : ' Jan 20, 1989'}

                                    </li> */}


                                    <li>
                                        <button className="flex items-center gap-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                                <path
                                                    opacity="0.5"
                                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="text-primary truncate">Paypal</span>
                                        </button>
                                    </li>

                                    <li className="flex items-center gap-2" style={{ marginTop: 20 }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                            <path
                                                opacity="0.5"
                                                d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M20.9605 15.5C21.6259 16.1025 22 16.7816 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 16.7816 2.37412 16.1025 3.03947 15.5"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>

                                        {data?.userDetailId?.address ? data?.userDetailId?.address : 'Basic'}

                                    </li>
                                </ul>
                                <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">

                                    <li className="flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 45 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5886 12.6218H30.4126L33.0719 5.53078C33.2772 4.98349 33.2001 4.37091 32.8677 3.89128C32.5353 3.41048 31.988 3.12436 31.4039 3.12436H26.9377C25.9784 1.69381 24.3484 0.75 22.5 0.75C20.6516 0.75 19.0216 1.69381 18.0623 3.12436H13.5961C13.012 3.12436 12.4647 3.41048 12.1335 3.89128C11.8011 4.37091 11.7239 4.98349 11.9293 5.53078L14.5886 12.6218ZM32.9591 16.1834H12.0409C7.11412 20.5759 -0.377003 29.0643 0.0147673 39.7846C0.240332 45.8511 5.19088 50.6117 11.293 50.6117H33.707C39.8091 50.6117 44.7597 45.8511 44.9852 39.7846C45.377 29.0643 37.8859 20.5759 32.9591 16.1834ZM21.9064 28.0552C22.8918 28.0552 23.6872 28.8506 23.6872 29.836C23.6872 30.8213 22.8918 31.6167 21.9064 31.6167H17.8462C17.7869 31.9966 17.7513 32.4003 17.7513 32.8039C17.7513 33.0057 17.7869 33.1957 17.7988 33.3975H21.9064C22.8918 33.3975 23.6872 34.1929 23.6872 35.1783C23.6872 36.1636 22.8918 36.9591 21.9064 36.9591H19.0334C19.9594 38.2531 21.2772 39.0841 22.7731 39.0841C24.8862 39.0841 25.5629 38.4193 26.5958 37.3983C27.2962 36.7098 28.424 36.7098 29.1126 37.4102C29.8012 38.1106 29.7893 39.2384 29.0889 39.9389C27.8661 41.1379 26.3465 42.6457 22.7731 42.6457C19.3302 42.6457 16.3741 40.3069 15.0089 36.9591H14.7833C13.798 36.9591 13.0025 36.1636 13.0025 35.1783C13.0025 34.3947 13.513 33.7299 14.2253 33.4925C14.2016 33.2669 14.1897 33.0414 14.1897 32.8039C14.1897 32.3765 14.2253 31.9492 14.2728 31.5336C13.5368 31.3081 13.0025 30.6433 13.0025 29.836C13.0025 28.8506 13.798 28.0552 14.7833 28.0552H15.2582C16.7184 25.0279 19.5439 22.9622 22.7731 22.9622C26.3465 22.9622 27.8661 24.4699 29.0889 25.669C29.7893 26.3694 29.8012 27.4972 29.1126 28.1977C28.4122 28.8981 27.2962 28.8981 26.5958 28.2095C25.5629 27.1885 24.8862 26.5237 22.7731 26.5237C21.5265 26.5237 20.3987 27.1173 19.5202 28.0552H21.9064Z" fill="#737373" />
                                        </svg>

                                        <span className="whitespace-nowrap" dir="ltr">

                                            {data?.userDetailId?.phoneNo ? data?.userDetailId?.phoneNo : '100'}

                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 ">
                                        <img src={person} alt="" width={26} className="shrink-0" style={{ marginLeft: -2 }} />

                                        {data?.userDetailId?.gender ? data?.userDetailId?.gender : 'Male'}

                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RevenueDetails;
