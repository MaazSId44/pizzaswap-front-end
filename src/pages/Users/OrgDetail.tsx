import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import web from '../../assets/Images/web.png';
import axios from 'axios';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import { Loader } from '../../components/Reuseable/Loader';
import userProfile from "../../assets/Images/userProfileImg.jpeg"
const OrgDetail = () => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        GetUserDetail()
    },[]);

    const [data, setData] = useState<any>();

    // useEffect(() => {
    //     alert(JSON.stringify(state?.id))

    // }, [])
    const token = secureLocalStorage.getItem('token')
    const { state } = useLocation();

    const GetUserDetail = () => {
        setLoader(true);

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios.post(API_ENDPOINTS.orgDetails + state?.id, formData, { headers })
            .then(response => {
                // console.log('orgDetails===>', response?.data?.data);
                setData(response?.data?.data)
                setLoader(false);


            })
            .catch(error => {
                console.error('An error occurred:', error);
                setLoader(false);
            });
    }
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const handleNavigate =()=>{
        navigate("/organizations-list")
    }
    
    return (
        <>
           {loader && <Loader />}
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-md-10">
                <li>
                    <Link onClick={handleNavigate} to="/organizations-list" className="text-primary hover:underline">
                    Organizations List
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Organization Details</span>
                </li>
            </ul >
            <div className="pt-5 flex justify-center items-center ">
                <div className="lg:w-1/2">
                    <div className="panel ">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                        </div>
                        <div className="mb-5 flex  justify-evenly">
                            <div className="flex flex-col justify-center items-center">
                                <img src={data?.userDetailId?.image?.url ?data?.userDetailId?.image?.url :userProfile} alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">{data?.userDetailId?.orgName ? data?.userDetailId?.orgName : 'Jimmy Turner'} </p>
                            </div>
                            <div className="flex">
                                <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                    <li className="flex items-center gap-2">
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

                                        {data?.userDetailId?.address ? data?.userDetailId?.address : ''}
                                    </li>
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
                                            <span className="text-primary truncate">{data?.email}</span>
                                        </button>
                                    </li>
                                    <li className="flex items-center gap-2 ">
                                        <img src={web} alt="" width={20} className="shrink-0" />
                                        {data?.userDetailId?.website ? data?.userDetailId?.website : 'Website'}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-center select-none">
                            <div className="mb-4 md:w-5/6">
                                <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                    About
                                </label>
                                <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                    {data?.userDetailId?.introduction ? data?.userDetailId?.introduction : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis earum quae, dolor vel consectetur laboriosam minus amet id corporis ipsa hic? Quo suscipit blanditiis voluptate ab totam?'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default OrgDetail;
