// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../../store';
// import Dropdown from '../../components/Dropdown';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import { useEffect, useState } from 'react';
// import person from '../../assets/Images/person.png';
// import secureLocalStorage from 'react-secure-storage';
// import API_ENDPOINTS from '../../Routes/API_routes';
// import axios from 'axios';

// const Profile = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(setPageTitle('Profile'));
//         GetUserDetail()

//     });
//     const [data, setData] = useState<any>();

//     const token = secureLocalStorage.getItem('token')
//     const { state } = useLocation();


//     const GetUserDetail = () => {

//         const headers = {
//             Authorization: 'Bearer ' + token,
//         };

//         const formData = new FormData();

//         axios.post(API_ENDPOINTS.stuDetails + state?.id, formData, { headers })
//             .then(response => {
//                 console.log('StuDetails===>', response?.data?.data);
//                 setData(response?.data?.data)


//             })
//             .catch(error => {
//                 console.error('An error occurred:', error);
//             });
//     }




//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
//     return (
//         <div>

//             <ul className="flex space-x-2 rtl:space-x-reverse">
//                 <li>
//                     <Link to="#" className="text-primary hover:underline">
//                         Users
//                     </Link>
//                 </li>
//                 <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
//                     <span>Profile</span>
//                 </li>
//             </ul>
//             <div className="pt-5">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     <div className="panel">
//                         <div className="flex items-center justify-between mb-5">
//                             <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
//                         </div>
//                         <div className="mb-5">
//                             <div className="flex flex-col justify-center items-center">
//                                 <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
//                                 <p className="font-semibold text-primary text-xl">{data?.userDetailId?.firstName && data?.userDetailId?.lastName ? data?.userDetailId?.firstName + data?.userDetailId?.firstName : 'Jimmy Turner'}</p>
//                             </div>
//                             <div className="flex">
//                                 <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
//                                     <li className="flex items-center gap-2">
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
//                                             <path
//                                                 d="M2.3153 12.6978C2.26536 12.2706 2.2404 12.057 2.2509 11.8809C2.30599 10.9577 2.98677 10.1928 3.89725 10.0309C4.07094 10 4.286 10 4.71612 10H15.2838C15.7139 10 15.929 10 16.1027 10.0309C17.0132 10.1928 17.694 10.9577 17.749 11.8809C17.7595 12.057 17.7346 12.2706 17.6846 12.6978L17.284 16.1258C17.1031 17.6729 16.2764 19.0714 15.0081 19.9757C14.0736 20.6419 12.9546 21 11.8069 21H8.19303C7.04537 21 5.9263 20.6419 4.99182 19.9757C3.72352 19.0714 2.89681 17.6729 2.71598 16.1258L2.3153 12.6978Z"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                             />
//                                             <path opacity="0.5" d="M17 17H19C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11H17.5" stroke="currentColor" strokeWidth="1.5" />
//                                             <path
//                                                 opacity="0.5"
//                                                 d="M10.0002 2C9.44787 2.55228 9.44787 3.44772 10.0002 4C10.5524 4.55228 10.5524 5.44772 10.0002 6"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M4.99994 7.5L5.11605 7.38388C5.62322 6.87671 5.68028 6.0738 5.24994 5.5C4.81959 4.9262 4.87665 4.12329 5.38382 3.61612L5.49994 3.5"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                             <path
//                                                 d="M14.4999 7.5L14.6161 7.38388C15.1232 6.87671 15.1803 6.0738 14.7499 5.5C14.3196 4.9262 14.3767 4.12329 14.8838 3.61612L14.9999 3.5"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                             />
//                                         </svg>{' '}
//                                         {data?.userDetailId?.website ? data?.userDetailId?.website : 'Web Developer'}

//                                     </li>
//                                     <li className="flex items-center gap-2">
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
//                                             <path
//                                                 d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                             />
//                                             <path opacity="0.5" d="M7 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                             <path opacity="0.5" d="M17 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                             <path opacity="0.5" d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                                         </svg>
//                                         {data?.userDetailId?.dob ? data?.userDetailId?.dob : ' Jan 20, 1989'}

//                                     </li>
//                                     <li className="flex items-center gap-2 ">
//                                         <img src={person} alt="" width={26} className="shrink-0" style={{ marginLeft: -2 }} />

//                                         {data?.userDetailId?.gender ? data?.userDetailId?.gender : 'Male'}

//                                     </li>
//                                 </ul>
//                                 <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
//                                     <li className="flex items-center gap-2">
//                                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
//                                             <path
//                                                 opacity="0.5"
//                                                 d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464Z"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                             />
//                                             <path
//                                                 d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                             />
//                                             <path
//                                                 d="M20.9605 15.5C21.6259 16.1025 22 16.7816 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 16.7816 2.37412 16.1025 3.03947 15.5"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                                 strokeLinecap="round"
//                                             />
//                                         </svg>

//                                         {data?.userDetailId?.address ? data?.userDetailId?.address : 'New York, USA'}

//                                     </li>
//                                     <li>
//                                         <button className="flex items-center gap-2">
//                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
//                                                 <path
//                                                     opacity="0.5"
//                                                     d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
//                                                     stroke="currentColor"
//                                                     strokeWidth="1.5"
//                                                 />
//                                                 <path
//                                                     d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
//                                                     stroke="currentColor"
//                                                     strokeWidth="1.5"
//                                                     strokeLinecap="round"
//                                                 />
//                                             </svg>
//                                             <span className="text-primary truncate">{data?.email}</span>
//                                         </button>
//                                     </li>
//                                     <li className="flex items-center gap-2">
//                                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path
//                                                 d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                             />
//                                             <path
//                                                 opacity="0.5"
//                                                 d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
//                                                 stroke="currentColor"
//                                                 strokeWidth="1.5"
//                                             />
//                                         </svg>
//                                         <span className="whitespace-nowrap" dir="ltr">

//                                             {data?.userDetailId?.phoneNo ? data?.userDetailId?.phoneNo : '+1 (530) 555-12121'}

//                                         </span>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="panel">
//                         <div className="mb-5">
//                             <h5 className="font-semibold text-lg dark:text-white-light">Detail</h5>
//                         </div>
//                         <div className="mb-5">
//                             <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
//                                 <div className="md:w-5/6">
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             About
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
//                                             {data?.userDetailId?.introduction ? data?.userDetailId?.introduction : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis earum quae, dolor vel consectetur laboriosam minus amet id corporis ipsa hic? Quo suscipit blanditiis voluptate ab totam?'}
//                                         </div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Profession

//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.userDetailId?.profession ? data?.userDetailId?.profession : 'Lorem, ipsum'}</div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Language

//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{data?.userDetailId?.language ? data?.userDetailId?.language : 'Lorem, ipsum'}</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="panel">
//                         <div className="mb-5">
//                             <h5 className="font-semibold text-lg dark:text-white-light">Study goals</h5>
//                         </div>
//                         <div className="mb-5">
//                             <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
//                                 <div className="md:w-5/6">
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             What do you want to study
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">Quran</div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Study goal
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">Revision</div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Riwaya
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">Hafs</div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Memorization level
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">30 juzz</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="panel">
//                         <div className="mb-5">
//                             <h5 className="font-semibold text-lg dark:text-white-light">Availability</h5>
//                         </div>
//                         <div className="mb-5">
//                             <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
//                                 <div className="md:w-5/6">
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Contact preference
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
//                                             Phone Call
//                                         </div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Available days
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">Mon, Tue, Wed </div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
//                                             Available time
//                                         </label>
//                                         <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">Early Morning (6-9)</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import person from '../../assets/Images/person.png';
import secureLocalStorage from 'react-secure-storage';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';

import userProfile from "../../assets/Images/userProfileImg.jpeg"
import { Loader } from '../../components/Reuseable/Loader';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        GetUserDetail()

    }, []);
    const [data, setData] = useState<any>();
    const [dataFromApi, setDataFromAPi] = useState<any>();
    const [loader, setLoader] = useState(false);


    const token = secureLocalStorage.getItem('token')
    const { state } = useLocation();


    const GetUserDetail = () => {
        setLoader(true)

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios.post(API_ENDPOINTS.stuDetails + state?.id, formData, { headers })
            .then(response => {
                // console.log(response)
                const dataApi = response?.data?.data;
                const data: string[] = [dataApi?.userDetailId?.language];
                const languageData: { languageType: string; level: string }[] = JSON.parse(data[0]);
                const formattedData: string[] = languageData.map(item => `${item.level} - ${item.languageType}`);
                const result: string = formattedData.join(' , ')
                const goal: string = dataApi?.goals[0]?.goal
                const goalArray: string[] = JSON.parse(goal)
                const myGoal: string = goalArray?.join()
                const memorizationLevel: string = dataApi?.goals[0]?.memorizationLevel
                const riwaya: string = dataApi?.goals[0]?.riwaya
                const riwayaArray: string[] = JSON.parse(riwaya)
                const myriwaya: string = riwayaArray?.join()
                const study: string = dataApi?.goals[0]?.study
                const studyArray: string[] = JSON.parse(study)
                const mystudy: string = studyArray?.join()
                const contactPreferance: string = dataApi?.availibility[0]?.contactPreferance
                const contactPreferanceArray: string[] = JSON.parse(contactPreferance)
                const mycontactPreferance: string = contactPreferanceArray?.join(" , ")
                const availableTime: string[] = dataApi?.availibility[0]?.availableTime
                let data2: string[] = availableTime;
                let jsonString = data2.join('');
                let arrayOfObjects: { day: string, time: string }[] = JSON.parse(`[${jsonString}]`);
                const uniqueDays = new Set<string>();
                for (const item of arrayOfObjects) {
                    uniqueDays.add(item.day);
                }
                const uniqueDaysArray = Array.from(uniqueDays);
                const singleString = uniqueDaysArray.join(', ');
                const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const arrangedData = arrayOfObjects
                    .filter(item => dayOrder.includes(item.day))
                    .sort((a, b) => {
                        const dayComparison = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
                        if (dayComparison === 0) {
                            const timeA = a.time.split('-').map(Number);
                            const timeB = b.time.split('-').map(Number);
                            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
                        }
                        return dayComparison;
                    });


                const MyAllData = {
                    _id: dataApi?._id,
                    email: dataApi?.email,
                    role: dataApi?.role,
                    registrationType: dataApi?.registrationType,
                    adminVerified: dataApi?.adminVerified,
                    status: dataApi?.status,
                    loginFirst: dataApi?.loginFirst,
                    expireSubscription: dataApi?.expireSubscription,
                    userDetailId_id: dataApi?.userDetailId?._id,
                    gender: dataApi?.userDetailId?.gender,
                    language: result,
                    isEmailPublic: dataApi?.userDetailId?.isEmailPublic,
                    isPhonePublic: dataApi?.userDetailId?.isPhonePublic,
                    website: dataApi?.userDetailId?.website,
                    aboutMe: dataApi?.userDetailId?.aboutMe,
                    city: dataApi?.userDetailId?.city,
                    country: dataApi?.userDetailId?.country,
                    dob: dataApi?.userDetailId?.dob,
                    firstName: dataApi?.userDetailId?.firstName,
                    lastName: dataApi?.userDetailId?.lastName,
                    phoneNo: dataApi?.userDetailId?.phoneNo,
                    profession: dataApi?.userDetailId?.profession,
                    images: dataApi?.userDetailId?.image?.url,
                    goal: myGoal,
                    memorizationLevel: memorizationLevel,
                    riwaya: myriwaya,
                    study: mystudy,
                    contactPreferance: mycontactPreferance,
                    availableDays: singleString,
                    availableTime: arrangedData


                }
                setDataFromAPi(MyAllData)

                // console.log(MyAllData)

                // console.log('StuDetails===>', response?.data?.data);
                setData(response?.data?.data)
                setLoader(false)


            })
            .catch(error => {
                console.error('An error occurred:', error);
                setLoader(false)
            });
    }


    const handleNavigate = () => {
        navigate("/apps/students-list")
    }

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <>
            {loader && <Loader />}
            <div>

                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link onClick={handleNavigate} to="/apps/students-list" className="text-primary hover:underline">
                            Students List
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Student Details</span>
                    </li>
                </ul>
                <div className="pt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="panel">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                            </div>
                            <div className="mb-5">
                                <div className="flex flex-col justify-center items-center">
                                    <img src={dataFromApi?.images ? dataFromApi?.images : userProfile} alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                    <p className="font-semibold text-primary text-xl">{dataFromApi?.firstName && dataFromApi?.lastName ? dataFromApi?.firstName + " " + dataFromApi?.lastName : ' '}</p>
                                </div>
                                <div className="flex">
                                    <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                        <li className="flex items-center gap-2">
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
                                            {dataFromApi?.website ? dataFromApi?.website : ''}


                                        </li>
                                        <li className="flex items-center gap-2">
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
                                            {dataFromApi?.dob ? dataFromApi?.dob : '  '}

                                        </li>
                                        <li className="flex items-center gap-2 ">
                                            <img src={person} alt="" width={26} className="shrink-0" style={{ marginLeft: -2 }} />

                                            {dataFromApi?.gender ? dataFromApi?.gender : ' '}

                                        </li>
                                    </ul>
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

                                            {dataFromApi?.city ? dataFromApi?.city : ''},
                                            {dataFromApi?.country ? dataFromApi?.country : ''}

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
                                                <span className="text-primary truncate">{dataFromApi?.email}</span>
                                            </button>
                                        </li>
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

                                                {dataFromApi?.phoneNo ? dataFromApi?.phoneNo : ' '}

                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Detail</h5>
                            </div>
                            <div className="mb-5">
                                <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                                    <div className="md:w-5/6">
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                About
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                                {dataFromApi?.aboutMe ? dataFromApi?.aboutMe : ' '}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Profession

                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{dataFromApi?.profession ? dataFromApi?.profession : ' '}</div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Language

                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{dataFromApi?.language ? dataFromApi?.language : ' '}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Study goals</h5>
                            </div>
                            <div className="mb-5">
                                <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                                    <div className="md:w-5/6">
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                What do you want to study
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">{dataFromApi?.study ? dataFromApi?.study : ' '}</div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Study goal
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                                {dataFromApi?.goal ? dataFromApi?.goal : ' '}
                                            </div>

                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Riwaya
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                                {dataFromApi?.riwaya ? dataFromApi?.riwaya : ' '}</div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Memorization level
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                                {dataFromApi?.memorizationLevel ? dataFromApi?.memorizationLevel : '0'} juzz
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Availability</h5>
                            </div>
                            <div className="mb-5">
                                <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                                    <div className="md:w-5/6">
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Contact preference
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                                {dataFromApi?.contactPreferance ? dataFromApi?.contactPreferance : ''}

                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Available days
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">

                                                {dataFromApi?.availableDays ? dataFromApi?.availableDays : ''}



                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="About" className="block text-gray-700 font-bold text-md mb-1">
                                                Available time
                                            </label>
                                            <div className="w-full bg-white-100 border border-gray-300 rounded-md  py-4 px-3 focus:ring-0 focus:border-blue-500">
                                                {dataFromApi?.availableTime?.map((item: any, index: any) => {
                                                    return (
                                                        <div key={index}>
                                                            <span >{item?.day} {" "} {" "} {" "} {" - "} {" "}</span>
                                                            <span>{item?.time}</span>
                                                        </div>
                                                    );
                                                })}


                                            </div>
                                        </div>
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

export default Profile;
