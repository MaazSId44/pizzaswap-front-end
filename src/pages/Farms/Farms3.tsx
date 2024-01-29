import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';
import { Loader } from '../../components/Reuseable/Loader';

const Farms = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Event Detail'));
        GetUserDetail()
        window.scrollTo(0, 0)
    }, []);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState<any>();
    const [ myLocation , setMyLocation ] = useState<any>({})
    const token = secureLocalStorage.getItem('token')
    const { state } = useLocation();

    const GetUserDetail = () => {
        setLoader(true)
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formData = new FormData();
        axios.post(API_ENDPOINTS.EventsDetails + state?.id, formData, { headers })
            .then(response => {
                setLoader(false)
                const item = response?.data?.data
                const locationString = item.location?.replace(/^"(.*)"$/, "$1");
                const myLocation =  JSON.parse(locationString);
                setMyLocation(myLocation)
                setData(response?.data?.data)
            })
            .catch(error => {
                console.error('An error occurred:', error);
                setLoader(false)

            });
    }


    return (
        <div>
            {loader && (
                <Loader />
            )}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/farms" className="text-primary hover:underline">
                    Events list
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Event Details</span>
                </li>
            </ul>
            <div className="pt-5 select-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">About Event</h5>
                        </div>
                        <div className="mb-5">
                            <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                                <div className="md:w-5/6">
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Event name
                                        </label>
                                        <div className="w-full bg-white-100 border font-bold border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                            {data?.eventName}
                                        </div>
                                    </div>
                                   
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Event detail
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                            <div className='detailsEvent'> {data?.eventDetail}</div>
                                        </div>
                                        
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                           Organization name
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                            <div className='detailsEvent'> {data?.userId?.userDetailId?.orgName}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light"> Information</h5>
                        </div>
                        <div className="mb-5">
                            <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                                <div className="md:w-5/6">
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Entrance fee
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.entranceFee}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Participants gender
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.gender}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Contact information
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.contactInfo}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Media</h5>
                        </div>
                        <div className="mb-5">
                            <div className="text-[#515365] dark:text-white-light font-semibold  ">
                                <div className="">
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            In total {data?.images.length} files
                                        </label>
                                        <div
                                            className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500"
                                            style={{ overflow: 'auto' }}
                                        >
                                            {data?.images.map((item: any) => (
                                                <div className="">
                                                    <img src={item?.url} className="w-full" style={{ height: 160 }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Date & Location</h5>
                        </div>
                        <div className="mb-5">
                            <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                                <div className="md:w-5/6">
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Starting date
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.startingTime}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            End date
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.endTime}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Time
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.eventTime}</div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                            Location
                                        </label>
                                        <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{myLocation?.location}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Farms;
