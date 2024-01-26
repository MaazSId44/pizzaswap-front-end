import { useState, Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import '../../assets/css/switch.css';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import { Loader } from '../../components/Reuseable/Loader';
import NavBar from '../../components/Reuseable/NavBar';

const BuyPizza = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contacts'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: '',
    });

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>(initialRecords);
    const [loader, setLoader] = useState(false);
    const [isChecked, setIsChecked] = useState<any>();
    const [selectedTab, setSelectedTab] = useState(0);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    //
    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const token = secureLocalStorage.getItem('token');

    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);

    const GetStudentsData = (showLoader: boolean) => {
        if (showLoader) {
            setLoader(true);
        }

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios
            .post(API_ENDPOINTS.AllStudents, formData, { headers })
            .then((response) => {
                if (response.status == 200) {
                    const newData = response?.data?.data;
                    // console.log(response?.data)
                    setInitialRecords(sortBy(newData, 'email'));
                    setLoader(false);
                    // showMessage(response?.data.message)
                } else {
                    setLoader(false);
                    showMessage(response?.data.message);
                    // showMessage(response?.data.message)
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                setLoader(false);
            });
    };

    const DeleteOrg = (id: any) => {
        setLoader(true);

        const headers = {
            Authorization: 'Bearer ' + token,
        };
        // console.log('id===>', id);

        const formData = new FormData();
        formData.append('isDeleted', 'true');
        formData.append('id', id);

        axios
            .delete(API_ENDPOINTS.STUDELETE, {
                headers: headers,
                data: formData,
            })
            .then((response) => {
                showMessage(response?.data?.message);
                if (response.status == 200) {
                    setLoader(false);
                    showMessage(response?.data?.message);
                    GetStudentsData(true);
                } else {
                    setLoader(false);
                    showMessage(response?.data?.message);
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                setLoader(false);
            });
    };

    useEffect(() => {
        GetStudentsData(true);
    }, []);

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([
        {
            id: 1,
            path: 'profile-35.png',
            name: 'Alan Green',
            role: 'Web Developer',
            email: 'alan@mail.com',
            location: 'Boston, USA',
            phone: '+1 202 555 0197',
            posts: 25,
            followers: '5K',
            following: 500,
        },
        {
            id: 2,
            path: 'profile-35.png',
            name: 'Linda Nelson',
            role: 'Web Designer',
            email: 'linda@mail.com',
            location: 'Sydney, Australia',
            phone: '+1 202 555 0170',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 3,
            path: 'profile-35.png',
            name: 'Lila Perry',
            role: 'UX/UI Designer',
            email: 'lila@mail.com',
            location: 'Miami, USA',
            phone: '+1 202 555 0105',
            posts: 20,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 4,
            path: 'profile-35.png',
            name: 'Andy King',
            role: 'Project Lead',
            email: 'andy@mail.com',
            location: 'Tokyo, Japan',
            phone: '+1 202 555 0194',
            posts: 25,
            followers: '21.5K',
            following: 300,
        },
        {
            id: 5,
            path: 'profile-35.png',
            name: 'Jesse Cory',
            role: 'Web Developer',
            email: 'jesse@mail.com',
            location: 'Edinburgh, UK',
            phone: '+1 202 555 0161',
            posts: 30,
            followers: '20K',
            following: 350,
        },
        {
            id: 6,
            path: 'profile-35.png',
            name: 'Xavier',
            role: 'UX/UI Designer',
            email: 'xavier@mail.com',
            location: 'New York, USA',
            phone: '+1 202 555 0155',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 7,
            path: 'profile-35.png',
            name: 'Susan',
            role: 'Project Manager',
            email: 'susan@mail.com',
            location: 'Miami, USA',
            phone: '+1 202 555 0118',
            posts: 40,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 8,
            path: 'profile-35.png',
            name: 'Raci Lopez',
            role: 'Web Developer',
            email: 'traci@mail.com',
            location: 'Edinburgh, UK',
            phone: '+1 202 555 0135',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 9,
            path: 'profile-35.png',
            name: 'Steven Mendoza',
            role: 'HR',
            email: 'sokol@verizon.net',
            location: 'Monrovia, US',
            phone: '+1 202 555 0100',
            posts: 40,
            followers: '21.8K',
            following: 300,
        },
        {
            id: 10,
            path: 'profile-35.png',
            name: 'James Cantrell',
            role: 'Web Developer',
            email: 'sravani@comcast.net',
            location: 'Michigan, US',
            phone: '+1 202 555 0134',
            posts: 100,
            followers: '28K',
            following: 520,
        },
        {
            id: 11,
            path: 'profile-35.png',
            name: 'Reginald Brown',
            role: 'Web Designer',
            email: 'drhyde@gmail.com',
            location: 'Entrimo, Spain',
            phone: '+1 202 555 0153',
            posts: 35,
            followers: '25K',
            following: 500,
        },
        {
            id: 12,
            path: 'profile-35.png',
            name: 'Stacey Smith',
            role: 'Chief technology officer',
            email: 'maikelnai@optonline.net',
            location: 'Lublin, Poland',
            phone: '+1 202 555 0115',
            posts: 21,
            followers: '5K',
            following: 200,
        },
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filteredData = initialRecords.filter((item) =>
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.registrationType.toLowerCase().includes(search.toLowerCase()));
            setRecordsData(filteredData);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);
    const saveUser = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.role) {
            showMessage('Occupation is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.name = params.name;
            user.registrationType = params.registrationType
            user.email = params.email;
            user.phone = params.adminVerified;
            user.role = params.role;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                name: params.name,
                email: params.email,
                phone: params.adminVerified,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchContacts();
        }

        showMessage('User has been saved successfully.');
        setAddContactModal(false);
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddContactModal(true);
    };

    const deleteUser = (userId: any = null) => {
        setRecordsData(recordsData.filter((d: any) => d.id !== userId));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    const firstBtnRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [activeTab, setActiveTab] = useState("Swap");

    const handleTabClick = (title: string) => {
        setActiveTab(title);
    };
    const navItems = [
        { title: 'Swap', value: 'Swap content goes here' },
        { title: 'Liquidity', value: 'Liquidity content goes here' },
        { title: 'Bridge', value: 'Bridge content goes here' },
    ];
    return (

        <div>
            {loader && <Loader />}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-[28px] dark:text-white text-customblackbg font-[700] text-[Poppins] ">Buy PizzaSwap</h1>
                    <p className="text-[16px] dark:text-customlightgraybg text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">Lorem ipsum dolor sit amet</p>
                </div>

            </div>
            <div className="flex items-center justify-center w-full">
                <div className="flex items-center justify-between w-[45%] rounded-[100px] gap-[30px]  py-[12px] px-[34px] bg-white dark:bg-[#1A1E1F]">
                    {navItems.map((item) => (
                        <div
                            key={item.title}
                            className={`flex-grow p-4 cursor-pointer text-center !w-[228px]  ${activeTab === item.title
                                ? "bg-custombluebg text-white"
                                : "bg-customgraybg dark:bg-custommediumgraybg dark:text-white "
                                } rounded-full`}
                            onClick={() => handleTabClick(item.title)}
                        >
                            {item.title}
                        </div>
                    ))}
                    <div className="flex-grow"></div>

                </div>
            </div>
            <div className='flex justify-center pt-[20px]'>
                <div className="panel h-full w-[45%]">



                    <div>
                        {activeTab === "Swap" &&
                            <div>
                                <div className='flex justify-between'>
                                    <div> <h5 className="text-[22px] dark:text-white text-customblackbg font-[700] text-[Urbanist]">Exchange</h5>
                                        <p className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500] text-[Poppins] mt-[5px]">Trade tokens in an instant</p>
                                    </div>
                                    <div className='flex gap-[12px]'>
                                        <div className='p-[14px] bg-customgraybg rounded-[10px]'
                                            // onClick={() => setAddContactModal(true)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M19.2172 12.2354C18.831 11.9522 18.6003 11.4972 18.6003 11.0178C18.6003 10.5384 18.831 10.0834 19.2167 9.80066L21.0009 8.49253C21.2853 8.28345 21.4029 7.91566 21.2918 7.58037C20.8325 6.2002 20.1061 4.94137 19.1322 3.83799C18.8977 3.57366 18.5196 3.49024 18.1962 3.63216L16.1872 4.51562C15.7495 4.70845 15.2398 4.68083 14.8243 4.44087C14.4094 4.20145 14.131 3.77462 14.0784 3.29849L13.8369 1.09283C13.7984 0.741826 13.5373 0.455825 13.1917 0.384867C11.785 0.0972421 10.3068 0.0923673 8.8752 0.379451C8.52745 0.449326 8.26582 0.735326 8.22736 1.08795L7.98795 3.27953C7.9354 3.7562 7.65699 4.18303 7.24099 4.42245C6.82607 4.66187 6.31799 4.69058 5.8787 4.4972L3.85882 3.60887C3.53815 3.46695 3.15899 3.54928 2.92445 3.81308C1.94728 4.91212 1.21765 6.16932 0.753447 7.54841C0.64078 7.88316 0.75778 8.25312 1.04324 8.46274L2.81611 9.76274C3.20286 10.0466 3.43361 10.5016 3.43361 10.9809C3.43361 11.4603 3.20286 11.9153 2.8172 12.1981L1.03295 13.5062C0.748571 13.7153 0.63103 14.0831 0.742072 14.4184C1.2014 15.7985 1.92778 17.0574 2.9017 18.1607C3.13624 18.4256 3.5154 18.5096 3.8377 18.3666L5.84674 17.4831C6.2844 17.2903 6.79357 17.3179 7.20957 17.5579C7.62449 17.7973 7.9029 18.2241 7.95545 18.7002L8.19703 20.9059C8.23549 21.2569 8.49657 21.5429 8.84215 21.6139C9.5539 21.759 10.2852 21.8327 11.0169 21.8327C11.7309 21.8327 12.4513 21.7607 13.1582 21.6187C13.5059 21.5489 13.7675 21.2629 13.806 20.9102L14.0459 18.7187C14.0985 18.242 14.3769 17.8152 14.7929 17.5757C15.2078 17.3369 15.7164 17.3087 16.1552 17.501L18.1751 18.3893C18.4968 18.5318 18.8749 18.4494 19.1094 18.1851C20.0866 17.0861 20.8162 15.8289 21.2804 14.4498C21.3931 14.115 21.2761 13.7451 20.9907 13.5354L19.2172 12.2354ZM11.0169 14.791C8.92286 14.791 7.22528 13.0934 7.22528 10.9994C7.22528 8.90528 8.92286 7.2077 11.0169 7.2077C13.111 7.2077 14.8086 8.90528 14.8086 10.9994C14.8086 13.0934 13.111 14.791 11.0169 14.791Z" fill="#636E72" />
                                            </svg>
                                        </div>


                                        <div className='p-[14px] bg-customgraybg rounded-[10px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M11.1667 0.166626C8.21825 0.166626 5.5398 1.35142 3.58336 3.26957V2.33329C3.58534 2.18844 3.55826 2.04467 3.5037 1.91047C3.44915 1.77627 3.36824 1.65438 3.26576 1.552C3.16328 1.44961 3.04131 1.36882 2.90705 1.3144C2.7728 1.25998 2.629 1.23303 2.48416 1.23515C2.19703 1.23936 1.92331 1.35738 1.72315 1.56329C1.52299 1.76921 1.41277 2.04616 1.41669 2.33329V6.12496C1.41704 6.40454 1.52546 6.67317 1.71927 6.87467C1.91309 7.07618 2.17729 7.19496 2.45665 7.20618C2.61729 7.2441 2.78446 7.24483 2.94542 7.20829H6.29169C6.43525 7.21032 6.57778 7.1838 6.71099 7.13027C6.84421 7.07674 6.96545 6.99726 7.06769 6.89647C7.16992 6.79567 7.2511 6.67556 7.30651 6.54311C7.36192 6.41067 7.39046 6.26853 7.39046 6.12496C7.39046 5.98139 7.36192 5.83925 7.30651 5.70681C7.2511 5.57436 7.16992 5.45425 7.06769 5.35345C6.96545 5.25265 6.84421 5.17318 6.71099 5.11965C6.57778 5.06612 6.43525 5.0396 6.29169 5.04163H4.87722C6.45484 3.37577 8.68346 2.33329 11.1667 2.33329C15.9659 2.33329 19.8334 6.20074 19.8334 11C19.8334 15.7992 15.9659 19.6666 11.1667 19.6666C6.36748 19.6666 2.50003 15.7992 2.50003 11C2.50206 10.8564 2.47554 10.7139 2.422 10.5807C2.36847 10.4474 2.289 10.3262 2.1882 10.224C2.0874 10.1217 1.96729 10.0406 1.83485 9.98514C1.7024 9.92973 1.56026 9.9012 1.41669 9.9012C1.27312 9.9012 1.13099 9.92973 0.998542 9.98514C0.866097 10.0406 0.745985 10.1217 0.645187 10.224C0.544389 10.3262 0.464915 10.4474 0.411383 10.5807C0.357851 10.7139 0.33133 10.8564 0.33336 11C0.33336 16.9702 5.19649 21.8333 11.1667 21.8333C17.1369 21.8333 22 16.9702 22 11C22 5.02976 17.1369 0.166626 11.1667 0.166626ZM11.1508 5.02681C10.8637 5.03102 10.59 5.14905 10.3898 5.35496C10.1897 5.56087 10.0794 5.83782 10.0834 6.12496V12.0833C10.0834 12.3706 10.1975 12.6461 10.4007 12.8493C10.6039 13.0525 10.8794 13.1666 11.1667 13.1666H14.9584C15.1019 13.1687 15.2444 13.1421 15.3777 13.0886C15.5109 13.0351 15.6321 12.9556 15.7344 12.8548C15.8366 12.754 15.9178 12.6339 15.9732 12.5014C16.0286 12.369 16.0571 12.2269 16.0571 12.0833C16.0571 11.9397 16.0286 11.7976 15.9732 11.6651C15.9178 11.5327 15.8366 11.4126 15.7344 11.3118C15.6321 11.211 15.5109 11.1315 15.3777 11.078C15.2444 11.0245 15.1019 10.9979 14.9584 11H12.25V6.12496C12.252 5.98011 12.2249 5.83634 12.1704 5.70214C12.1158 5.56794 12.0349 5.44605 11.9324 5.34366C11.8299 5.24128 11.708 5.16049 11.5737 5.10606C11.4395 5.05164 11.2957 5.02469 11.1508 5.02681Z" fill="#636E72" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                                <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[43px]"></div>

                            </div>

                        }
                        {activeTab === "Liquidity" && <div className="p-4">Liquidity</div>}
                        {activeTab === "Bridge" && <div className="p-4">Bridge</div>}
                    </div>


                    {/* <div className="flex items-center justify-between">
                            <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                                <div
                                    className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                    style={{ width: '65%' }}
                                ></div>
                            </div>
                            <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">57%</span>
                        </div> */}
                </div>
            </div>



            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Student' : 'Add Student'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Name</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Phone Number</label>
                                                <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Occupation</label>
                                                <input id="role" type="text" placeholder="Enter Occupation" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="address">Address</label>
                                                <textarea
                                                    id="location"
                                                    rows={3}
                                                    placeholder="Enter Address"
                                                    className="resize-none min-h-[130px] w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                                    value={params.location}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div >

    );
};

export default BuyPizza;
