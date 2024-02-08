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
import secureLocalStorage from 'react-secure-storage';
import { Loader } from '../../components/Reuseable/Loader';
import exchangeIcon from '../../../public/assets/images/exchangeIcon.png';
import connect1 from '../../../public/assets/images/connect1.png';
import connect2 from '../../../public/assets/images/connect2.png';
import connect3 from '../../../public/assets/images/connect3.png';
import connect4 from '../../../public/assets/images/connect4.png';
import connect5 from '../../../public/assets/images/connect5.png';
import connect6 from '../../../public/assets/images/connect6.png';
import connect7 from '../../../public/assets/images/connect7.png';

import takenIcon from '../../../public/assets/images/takenIcon.png';
import takenIcon1 from '../../../public/assets/images/takenIcon1.png';
import takenIcon2 from '../../../public/assets/images/takenIcon2.png';
import takenIcon4 from '../../../public/assets/images/takenIcon4.png';
import takenIcon5 from '../../../public/assets/images/takenIcon5.png';
import takenIcon6 from '../../../public/assets/images/takenIcon6.png';
import takenIcon7 from '../../../public/assets/images/takenIcon7.png';
import CustomDialog from '../../components/Reuseable/ConnectToWalletModal';
import WalletButton from '../../components/Reuseable/WalletButton';

const Trade = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Trade'));
    });
    const [tokenModal, setTokenModal] = useState<any>(false);
    const [settingModal, setSettingModal] = useState<any>(false);
    const [recentTransactions, setRecentTransactions] = useState<any>(false);
    const [connectWallet, setConnectWallet] = useState<any>(false);
    const [tokenImported, setTokenImported] = useState<any>(false);

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

    const [isUnderstand, setIsUnderstand] = useState(false);

    const token = secureLocalStorage.getItem('token');

    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
        setTokenImported(true);
    }, []);
    const theme = localStorage.getItem('theme');

    const itemsConnect = [
        { id: 1, name: 'Metamask', icon: connect1 },
        { id: 2, name: 'TrustWallet', icon: connect2 },
        { id: 3, name: 'MathWallet', icon: connect3 },
        { id: 4, name: 'TokenPocket', icon: connect4 },
        { id: 5, name: 'WalletConnect', icon: connect5 },
        { id: 6, name: 'Binance Chain Wallet', icon: connect6 },
        { id: 7, name: 'Safepal Wallet', icon: connect7 },
    ];

    const items = [
        { id: 1, name: 'Anchor', icon: takenIcon },
        { id: 2, name: 'Bitcoin Cash', icon: takenIcon1 },
        { id: 3, name: 'Cardano', icon: takenIcon2 },
        { id: 4, name: 'Cosmos', icon: takenIcon4 },
        { id: 5, name: 'Dash', icon: takenIcon5 },
        { id: 6, name: 'Ethereum Classic', icon: takenIcon6 },
        { id: 7, name: 'The Graph', icon: takenIcon7 },
        { id: 1, name: 'Anchor', icon: takenIcon },
        { id: 2, name: 'Bitcoin Cash', icon: takenIcon1 },
        { id: 3, name: 'Cardano', icon: takenIcon2 },
        { id: 4, name: 'Cosmos', icon: takenIcon4 },
        { id: 5, name: 'Dash', icon: takenIcon5 },
        { id: 6, name: 'Ethereum Classic', icon: takenIcon6 },
        { id: 7, name: 'The Graph', icon: takenIcon7 },
    ];

    const [activeTab, setActiveTab] = useState('Swap');
    const [mainTitle, setMainTitle] = useState('Exchange');

    const handleTabClick = (title: string) => {
        setActiveTab(title);
        if (title == 'Swap') {
            setMainTitle('Exchange');
        } else if (title == 'Liquidity') {
            setMainTitle('Liquidity');
        } else if (title == 'Bridge') {
            setMainTitle('Bridge');
        }
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
                    <h1 className="text-[28px] dark:text-white text-customblackbg font-[700] text-[Poppins] ">{mainTitle}</h1>
                    <p className="text-[16px] dark:text-customlightgraybg text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">Lorem ipsum dolor sit amet</p>
                </div>
            </div>
            <div className='lg:max-2xl:w-[80%] lg:max-2xl:mx-auto sm:w-auto sm:mx-0'>
                <div className="flex items-center justify-center w-full px-10">
                    <div className="flex flex-1 min-[425px]:flex-col  items-center justify-center  max-sm:flex-col md:flex-row  gap-y-3   lg:max-2xl:w-[100%] w-[100%] 2xl:max-w-[45%] rounded-[50px]  py-[17px] px-[8px]  bg-white dark:bg-[#1A1E1F] mt-[10px]">
                        {navItems.map((item) => (
                            <div
                                key={item.title}
                                className={`py-[12px] px-[34px] cursor-pointer text-center sm:w-[100%] md:w-[100%] max-lg:w-[100%] xl:w-[100%] mx-[10px] 2xl:w-[100%] w-[228px]  ${activeTab === item.title ? 'bg-custombluebg text-white' : 'bg-customgraybg dark:bg-custommediumgraybg dark:text-white '
                                    } rounded-full`}
                                onClick={() => handleTabClick(item.title)}
                            >
                                {item.title}
                            </div>
                        ))}
                        <div className="flex-grow"></div>
                    </div>
                </div>
                <div className="flex justify-center pt-[20px]">
                    <div className="panel h-full w-[45%] max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:max-w-[45%] ">
                        <div>
                            {activeTab === 'Swap' && (
                                <div>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div>
                                            {' '}
                                            <h5 className="text-[22px] dark:text-white text-customblackbg font-[700]">Exchange</h5>
                                            <p className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500] text-[Poppins] mt-[5px]">Trade tokens in an instant</p>
                                        </div>
                                        <div className="flex gap-[12px]">
                                            <div className="p-[14px] bg-customgraybg dark:bg-custommediumgraybg rounded-[10px]" onClick={() => setSettingModal(true)}>
                                                <svg className="fill-custommediumgraybg dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M19.2172 12.2354C18.831 11.9522 18.6003 11.4972 18.6003 11.0178C18.6003 10.5384 18.831 10.0834 19.2167 9.80066L21.0009 8.49253C21.2853 8.28345 21.4029 7.91566 21.2918 7.58037C20.8325 6.2002 20.1061 4.94137 19.1322 3.83799C18.8977 3.57366 18.5196 3.49024 18.1962 3.63216L16.1872 4.51562C15.7495 4.70845 15.2398 4.68083 14.8243 4.44087C14.4094 4.20145 14.131 3.77462 14.0784 3.29849L13.8369 1.09283C13.7984 0.741826 13.5373 0.455825 13.1917 0.384867C11.785 0.0972421 10.3068 0.0923673 8.8752 0.379451C8.52745 0.449326 8.26582 0.735326 8.22736 1.08795L7.98795 3.27953C7.9354 3.7562 7.65699 4.18303 7.24099 4.42245C6.82607 4.66187 6.31799 4.69058 5.8787 4.4972L3.85882 3.60887C3.53815 3.46695 3.15899 3.54928 2.92445 3.81308C1.94728 4.91212 1.21765 6.16932 0.753447 7.54841C0.64078 7.88316 0.75778 8.25312 1.04324 8.46274L2.81611 9.76274C3.20286 10.0466 3.43361 10.5016 3.43361 10.9809C3.43361 11.4603 3.20286 11.9153 2.8172 12.1981L1.03295 13.5062C0.748571 13.7153 0.63103 14.0831 0.742072 14.4184C1.2014 15.7985 1.92778 17.0574 2.9017 18.1607C3.13624 18.4256 3.5154 18.5096 3.8377 18.3666L5.84674 17.4831C6.2844 17.2903 6.79357 17.3179 7.20957 17.5579C7.62449 17.7973 7.9029 18.2241 7.95545 18.7002L8.19703 20.9059C8.23549 21.2569 8.49657 21.5429 8.84215 21.6139C9.5539 21.759 10.2852 21.8327 11.0169 21.8327C11.7309 21.8327 12.4513 21.7607 13.1582 21.6187C13.5059 21.5489 13.7675 21.2629 13.806 20.9102L14.0459 18.7187C14.0985 18.242 14.3769 17.8152 14.7929 17.5757C15.2078 17.3369 15.7164 17.3087 16.1552 17.501L18.1751 18.3893C18.4968 18.5318 18.8749 18.4494 19.1094 18.1851C20.0866 17.0861 20.8162 15.8289 21.2804 14.4498C21.3931 14.115 21.2761 13.7451 20.9907 13.5354L19.2172 12.2354ZM11.0169 14.791C8.92286 14.791 7.22528 13.0934 7.22528 10.9994C7.22528 8.90528 8.92286 7.2077 11.0169 7.2077C13.111 7.2077 14.8086 8.90528 14.8086 10.9994C14.8086 13.0934 13.111 14.791 11.0169 14.791Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </div>

                                            <div onClick={() => setRecentTransactions(true)} className="p-[14px] dark:bg-custommediumgraybg bg-customgraybg rounded-[10px]">
                                                <svg className="fill-custommediumgraybg dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M11.1667 0.166626C8.21825 0.166626 5.5398 1.35142 3.58336 3.26957V2.33329C3.58534 2.18844 3.55826 2.04467 3.5037 1.91047C3.44915 1.77627 3.36824 1.65438 3.26576 1.552C3.16328 1.44961 3.04131 1.36882 2.90705 1.3144C2.7728 1.25998 2.629 1.23303 2.48416 1.23515C2.19703 1.23936 1.92331 1.35738 1.72315 1.56329C1.52299 1.76921 1.41277 2.04616 1.41669 2.33329V6.12496C1.41704 6.40454 1.52546 6.67317 1.71927 6.87467C1.91309 7.07618 2.17729 7.19496 2.45665 7.20618C2.61729 7.2441 2.78446 7.24483 2.94542 7.20829H6.29169C6.43525 7.21032 6.57778 7.1838 6.71099 7.13027C6.84421 7.07674 6.96545 6.99726 7.06769 6.89647C7.16992 6.79567 7.2511 6.67556 7.30651 6.54311C7.36192 6.41067 7.39046 6.26853 7.39046 6.12496C7.39046 5.98139 7.36192 5.83925 7.30651 5.70681C7.2511 5.57436 7.16992 5.45425 7.06769 5.35345C6.96545 5.25265 6.84421 5.17318 6.71099 5.11965C6.57778 5.06612 6.43525 5.0396 6.29169 5.04163H4.87722C6.45484 3.37577 8.68346 2.33329 11.1667 2.33329C15.9659 2.33329 19.8334 6.20074 19.8334 11C19.8334 15.7992 15.9659 19.6666 11.1667 19.6666C6.36748 19.6666 2.50003 15.7992 2.50003 11C2.50206 10.8564 2.47554 10.7139 2.422 10.5807C2.36847 10.4474 2.289 10.3262 2.1882 10.224C2.0874 10.1217 1.96729 10.0406 1.83485 9.98514C1.7024 9.92973 1.56026 9.9012 1.41669 9.9012C1.27312 9.9012 1.13099 9.92973 0.998542 9.98514C0.866097 10.0406 0.745985 10.1217 0.645187 10.224C0.544389 10.3262 0.464915 10.4474 0.411383 10.5807C0.357851 10.7139 0.33133 10.8564 0.33336 11C0.33336 16.9702 5.19649 21.8333 11.1667 21.8333C17.1369 21.8333 22 16.9702 22 11C22 5.02976 17.1369 0.166626 11.1667 0.166626ZM11.1508 5.02681C10.8637 5.03102 10.59 5.14905 10.3898 5.35496C10.1897 5.56087 10.0794 5.83782 10.0834 6.12496V12.0833C10.0834 12.3706 10.1975 12.6461 10.4007 12.8493C10.6039 13.0525 10.8794 13.1666 11.1667 13.1666H14.9584C15.1019 13.1687 15.2444 13.1421 15.3777 13.0886C15.5109 13.0351 15.6321 12.9556 15.7344 12.8548C15.8366 12.754 15.9178 12.6339 15.9732 12.5014C16.0286 12.369 16.0571 12.2269 16.0571 12.0833C16.0571 11.9397 16.0286 11.7976 15.9732 11.6651C15.9178 11.5327 15.8366 11.4126 15.7344 11.3118C15.6321 11.211 15.5109 11.1315 15.3777 11.078C15.2444 11.0245 15.1019 10.9979 14.9584 11H12.25V6.12496C12.252 5.98011 12.2249 5.83634 12.1704 5.70214C12.1158 5.56794 12.0349 5.44605 11.9324 5.34366C11.8299 5.24128 11.708 5.16049 11.5737 5.10606C11.4395 5.05164 11.2957 5.02469 11.1508 5.02681Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[43px]"></div>

                                    <div className="py-[18px] px-[35px] bg-customgraybg dark:bg-customblackbg rounded-[50px] ">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[16px] dark:text-white text-customblackbg font-[600]">0.00</p>
                                            <div onClick={() => setTokenModal(true)} className=" cursor-pointer bg-white dark:bg-[#1A1E1F] py-[8px] px-[10px] rounded-[40px]">
                                                <div className="flex gap-[29px] items-center">
                                                    <div className="flex gap-[7px] items-center">
                                                        <div className="p-[6px] bg-[#F3BA2F] rounded-[40px]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M6.11833 8.40442L10.003 4.52133L13.8893 8.40758L16.1483 6.14692L10.003 0L3.85767 6.14534L6.11833 8.40442Z" fill="white" />
                                                                <path d="M0 10.0017L2.25908 7.741L4.51975 10.0017L2.25908 12.2607L0 10.0017Z" fill="white" />
                                                                <path d="M6.11833 11.5972L10.003 15.4818L13.8893 11.5956L16.1499 13.8531L10.0046 20L3.85767 13.8578L6.11833 11.5972Z" fill="white" />
                                                                <path d="M15.4814 10.0017L17.7405 7.741L20.0012 10.0001L17.7405 12.2623L15.4814 10.0017Z" fill="white" />
                                                                <path
                                                                    d="M12.2957 9.99995L10.0034 7.70612L8.30834 9.40122L8.11245 9.59553L7.71118 9.99679L10.0034 12.2875L12.2957 10.0015V9.99995Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <p className="text-[16px] dark:text-white text-customblackbg font-[600]">BNB</p>
                                                    </div>

                                                    <svg className="fill-customblackbg dark-fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                                        <path
                                                            d="M9.47453 13.0942C9.19439 13.3743 8.74028 13.3743 8.46014 13.0942L1.64492 6.27894C1.36478 5.99879 1.36478 5.54469 1.64492 5.26454C1.92506 4.9844 2.37917 4.9844 2.65931 5.26454L8.96733 11.5726L15.2754 5.26454C15.4156 5.12429 15.5989 5.05435 15.7826 5.05435C15.9662 5.05435 16.1495 5.12429 16.2897 5.26454C16.5699 5.54469 16.5699 5.99879 16.2897 6.27894L9.47453 13.0942Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-[25px] flex justify-center">
                                        <img src={exchangeIcon} alt="exchangeIcon" className="cursor-pointer" />
                                    </div>

                                    <div className="py-[18px] px-[35px] bg-customgraybg dark:bg-customblackbg rounded-[50px]">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[16px] dark:text-white text-customblackbg font-[600]">0.00</p>
                                            <div onClick={() => setTokenModal(true)} className=" cursor-pointer bg-white dark:bg-[#1A1E1F] py-[8px] px-[10px] rounded-[40px]">
                                                <div className="flex gap-[29px] items-center">
                                                    <div className="flex gap-[7px] items-center">
                                                        <div className="p-[6px] bg-custombluebg rounded-[40px]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <g clip-path="url(#clip0_94_12424)">
                                                                    <path
                                                                        d="M10.0007 17.712C5.74832 17.712 2.28797 14.2532 2.28797 10.0008C2.28797 5.74833 5.74832 2.28797 10.0007 2.28797C12.5661 2.28797 14.8424 3.54758 16.2435 5.47958L18.2683 4.38275C16.4666 1.7388 13.4322 0 10.0007 0C4.4872 0 0 4.48721 0 10.0008C0 15.5143 4.4872 20 10.0007 20C13.4327 20 16.4666 18.2612 18.2668 15.6188L16.2435 14.5219C14.8424 16.4539 12.5656 17.712 10.0007 17.712Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M11.4109 7.1611C12.2796 7.1611 12.9839 6.45685 12.9839 5.58812C12.9839 4.71938 12.2796 4.01514 11.4109 4.01514C10.5421 4.01514 9.83789 4.71938 9.83789 5.58812C9.83789 6.45685 10.5421 7.1611 11.4109 7.1611Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M6.69916 5.77828C7.5252 6.04653 7.97702 6.93393 7.70877 7.75946C7.44052 8.58551 6.55312 9.03732 5.72758 8.76907C4.90154 8.50082 4.44973 7.61342 4.71797 6.78789C4.98622 5.96184 5.87362 5.51003 6.69916 5.77828Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M4.94047 11.8029C5.4511 11.1001 6.43434 10.9444 7.13716 11.4551C7.83998 11.9657 7.99566 12.9489 7.48502 13.6518C6.97439 14.3546 5.99064 14.5102 5.28833 13.9996C4.58551 13.489 4.42983 12.5057 4.94047 11.8029Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M10.1387 15.3374C9.62807 14.6345 9.78375 13.6513 10.4866 13.1407C11.1894 12.63 12.1726 12.7857 12.6833 13.4885C13.1939 14.1913 13.0382 15.1746 12.3354 15.6852C11.6326 16.1959 10.6493 16.0402 10.1387 15.3374Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M18.7901 5.23621L16.7795 6.32593V6.32746C17.3744 7.41972 17.7121 8.67273 17.7121 10.0008C17.7121 11.3288 17.3749 12.5803 16.7795 13.6741V13.6756L18.7901 14.7654C19.5609 13.3486 20 11.7254 20 10.0008C20 8.27619 19.5624 6.65503 18.7901 5.23621Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M16.711 10.0008C16.711 11.1574 16.4179 12.2472 15.9001 13.1979L8.75073 10.0008L15.9001 6.80359C16.4163 7.7559 16.711 8.8441 16.711 10.0008Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M12.3672 8.6063C12.8028 9.20618 13.6426 9.33904 14.2419 8.90345C14.7439 8.53835 14.9174 7.8908 14.7054 7.33807L12.2607 8.43135C12.2917 8.49119 12.3262 8.55052 12.3672 8.6068V8.6063Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M10.6473 10.5743C10.5723 10.6286 10.5079 10.6924 10.4536 10.7619L12.1772 11.5327C12.2218 11.2812 12.1691 11.0124 12.0073 10.7898C11.6914 10.3547 11.0824 10.2584 10.6478 10.5743H10.6473Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M14.5588 11.6884C14.3818 11.4445 14.4356 11.1032 14.6795 10.9262C14.9234 10.7493 15.2647 10.803 15.4416 11.0469C15.6186 11.2908 15.5649 11.6321 15.321 11.8091C15.0771 11.9861 14.7358 11.9323 14.5588 11.6884Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M15.2648 9.70112C15.1334 9.52009 15.1735 9.26654 15.3545 9.13521C15.5356 9.00387 15.7891 9.04393 15.9204 9.22496C16.0518 9.40599 16.0117 9.65953 15.8307 9.79087C15.6497 9.92221 15.3961 9.88215 15.2648 9.70112Z"
                                                                        fill="white"
                                                                    />
                                                                    <path
                                                                        d="M12.84 10.2295C12.7492 10.1042 12.7771 9.92929 12.9018 9.83852C13.0271 9.74775 13.202 9.77564 13.2928 9.90039C13.3836 10.0256 13.3557 10.2006 13.2309 10.2913C13.1057 10.3821 12.9308 10.3542 12.84 10.2295Z"
                                                                        fill="white"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_94_12424">
                                                                        <rect width="20" height="20" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div>
                                                        <p className="text-[16px] dark:text-white text-customblackbg font-[600]">PizzaSwap</p>
                                                    </div>

                                                    <svg className="fill-customblackbg dark-fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                                        <path
                                                            d="M9.47453 13.0942C9.19439 13.3743 8.74028 13.3743 8.46014 13.0942L1.64492 6.27894C1.36478 5.99879 1.36478 5.54469 1.64492 5.26454C1.92506 4.9844 2.37917 4.9844 2.65931 5.26454L8.96733 11.5726L15.2754 5.26454C15.4156 5.12429 15.5989 5.05435 15.7826 5.05435C15.9662 5.05435 16.1495 5.12429 16.2897 5.26454C16.5699 5.54469 16.5699 5.99879 16.2897 6.27894L9.47453 13.0942Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-warap justify-between my-[25px]">
                                        <p className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[600]">Slippage Tolerance</p>
                                        <p className="text-[16px] dark:text-white text-customblackbg font-[600]">0.1%</p>
                                    </div>
                                    <WalletButton onClick={() => setConnectWallet(true)} buttonText="Unlock Wallet" />

                                </div>
                            )}
                            {activeTab === 'Liquidity' && (
                                <div>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div>
                                            {' '}
                                            <h5 className="text-[22px] dark:text-white text-customblackbg font-[700]">Liquidity</h5>
                                            <p className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500] text-[Poppins] mt-[5px]">Add liquidity to receive LP tokens</p>
                                        </div>
                                        <div className="flex gap-[12px]">
                                            <div className="p-[14px] bg-customgraybg rounded-[10px]" onClick={() => setSettingModal(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M19.2172 12.2354C18.831 11.9522 18.6003 11.4972 18.6003 11.0178C18.6003 10.5384 18.831 10.0834 19.2167 9.80066L21.0009 8.49253C21.2853 8.28345 21.4029 7.91566 21.2918 7.58037C20.8325 6.2002 20.1061 4.94137 19.1322 3.83799C18.8977 3.57366 18.5196 3.49024 18.1962 3.63216L16.1872 4.51562C15.7495 4.70845 15.2398 4.68083 14.8243 4.44087C14.4094 4.20145 14.131 3.77462 14.0784 3.29849L13.8369 1.09283C13.7984 0.741826 13.5373 0.455825 13.1917 0.384867C11.785 0.0972421 10.3068 0.0923673 8.8752 0.379451C8.52745 0.449326 8.26582 0.735326 8.22736 1.08795L7.98795 3.27953C7.9354 3.7562 7.65699 4.18303 7.24099 4.42245C6.82607 4.66187 6.31799 4.69058 5.8787 4.4972L3.85882 3.60887C3.53815 3.46695 3.15899 3.54928 2.92445 3.81308C1.94728 4.91212 1.21765 6.16932 0.753447 7.54841C0.64078 7.88316 0.75778 8.25312 1.04324 8.46274L2.81611 9.76274C3.20286 10.0466 3.43361 10.5016 3.43361 10.9809C3.43361 11.4603 3.20286 11.9153 2.8172 12.1981L1.03295 13.5062C0.748571 13.7153 0.63103 14.0831 0.742072 14.4184C1.2014 15.7985 1.92778 17.0574 2.9017 18.1607C3.13624 18.4256 3.5154 18.5096 3.8377 18.3666L5.84674 17.4831C6.2844 17.2903 6.79357 17.3179 7.20957 17.5579C7.62449 17.7973 7.9029 18.2241 7.95545 18.7002L8.19703 20.9059C8.23549 21.2569 8.49657 21.5429 8.84215 21.6139C9.5539 21.759 10.2852 21.8327 11.0169 21.8327C11.7309 21.8327 12.4513 21.7607 13.1582 21.6187C13.5059 21.5489 13.7675 21.2629 13.806 20.9102L14.0459 18.7187C14.0985 18.242 14.3769 17.8152 14.7929 17.5757C15.2078 17.3369 15.7164 17.3087 16.1552 17.501L18.1751 18.3893C18.4968 18.5318 18.8749 18.4494 19.1094 18.1851C20.0866 17.0861 20.8162 15.8289 21.2804 14.4498C21.3931 14.115 21.2761 13.7451 20.9907 13.5354L19.2172 12.2354ZM11.0169 14.791C8.92286 14.791 7.22528 13.0934 7.22528 10.9994C7.22528 8.90528 8.92286 7.2077 11.0169 7.2077C13.111 7.2077 14.8086 8.90528 14.8086 10.9994C14.8086 13.0934 13.111 14.791 11.0169 14.791Z"
                                                        fill="#636E72"
                                                    />
                                                </svg>
                                            </div>

                                            <div onClick={() => setRecentTransactions(true)} className="p-[14px] bg-customgraybg rounded-[10px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M11.1667 0.166626C8.21825 0.166626 5.5398 1.35142 3.58336 3.26957V2.33329C3.58534 2.18844 3.55826 2.04467 3.5037 1.91047C3.44915 1.77627 3.36824 1.65438 3.26576 1.552C3.16328 1.44961 3.04131 1.36882 2.90705 1.3144C2.7728 1.25998 2.629 1.23303 2.48416 1.23515C2.19703 1.23936 1.92331 1.35738 1.72315 1.56329C1.52299 1.76921 1.41277 2.04616 1.41669 2.33329V6.12496C1.41704 6.40454 1.52546 6.67317 1.71927 6.87467C1.91309 7.07618 2.17729 7.19496 2.45665 7.20618C2.61729 7.2441 2.78446 7.24483 2.94542 7.20829H6.29169C6.43525 7.21032 6.57778 7.1838 6.71099 7.13027C6.84421 7.07674 6.96545 6.99726 7.06769 6.89647C7.16992 6.79567 7.2511 6.67556 7.30651 6.54311C7.36192 6.41067 7.39046 6.26853 7.39046 6.12496C7.39046 5.98139 7.36192 5.83925 7.30651 5.70681C7.2511 5.57436 7.16992 5.45425 7.06769 5.35345C6.96545 5.25265 6.84421 5.17318 6.71099 5.11965C6.57778 5.06612 6.43525 5.0396 6.29169 5.04163H4.87722C6.45484 3.37577 8.68346 2.33329 11.1667 2.33329C15.9659 2.33329 19.8334 6.20074 19.8334 11C19.8334 15.7992 15.9659 19.6666 11.1667 19.6666C6.36748 19.6666 2.50003 15.7992 2.50003 11C2.50206 10.8564 2.47554 10.7139 2.422 10.5807C2.36847 10.4474 2.289 10.3262 2.1882 10.224C2.0874 10.1217 1.96729 10.0406 1.83485 9.98514C1.7024 9.92973 1.56026 9.9012 1.41669 9.9012C1.27312 9.9012 1.13099 9.92973 0.998542 9.98514C0.866097 10.0406 0.745985 10.1217 0.645187 10.224C0.544389 10.3262 0.464915 10.4474 0.411383 10.5807C0.357851 10.7139 0.33133 10.8564 0.33336 11C0.33336 16.9702 5.19649 21.8333 11.1667 21.8333C17.1369 21.8333 22 16.9702 22 11C22 5.02976 17.1369 0.166626 11.1667 0.166626ZM11.1508 5.02681C10.8637 5.03102 10.59 5.14905 10.3898 5.35496C10.1897 5.56087 10.0794 5.83782 10.0834 6.12496V12.0833C10.0834 12.3706 10.1975 12.6461 10.4007 12.8493C10.6039 13.0525 10.8794 13.1666 11.1667 13.1666H14.9584C15.1019 13.1687 15.2444 13.1421 15.3777 13.0886C15.5109 13.0351 15.6321 12.9556 15.7344 12.8548C15.8366 12.754 15.9178 12.6339 15.9732 12.5014C16.0286 12.369 16.0571 12.2269 16.0571 12.0833C16.0571 11.9397 16.0286 11.7976 15.9732 11.6651C15.9178 11.5327 15.8366 11.4126 15.7344 11.3118C15.6321 11.211 15.5109 11.1315 15.3777 11.078C15.2444 11.0245 15.1019 10.9979 14.9584 11H12.25V6.12496C12.252 5.98011 12.2249 5.83634 12.1704 5.70214C12.1158 5.56794 12.0349 5.44605 11.9324 5.34366C11.8299 5.24128 11.708 5.16049 11.5737 5.10606C11.4395 5.05164 11.2957 5.02469 11.1508 5.02681Z"
                                                        fill="#636E72"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[43px]"></div>

                                    <div>
                                        <div className="flex  items-center justify-center gap-[10px] rounded-[40px] cursor-pointer bg-custombluebg py-[22px] px-[34px] ">
                                            <div className="text-[18px] text-center text-white font-[500]">Add Liquidity</div>
                                        </div>

                                        <div className="flex justify-between py-[30px]">
                                            <p className="text-[20px] dark:text-white text-custommediumgraybg font-[500] text-[Poppins] mt-[5px]">Your Liquidity</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M12 2C6.48603 2 2 6.48604 2 12C2 17.514 6.48603 22 12 22C17.514 22 22 17.514 22 12C22 6.48604 17.514 2 12 2ZM12 3.5C16.7033 3.5 20.5 7.2967 20.5 12C20.5 16.7033 16.7033 20.5 12 20.5C7.29669 20.5 3.5 16.7033 3.5 12C3.5 7.2967 7.29669 3.5 12 3.5ZM12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8C11 8.26522 11.1054 8.51957 11.2929 8.70711C11.4804 8.89464 11.7348 9 12 9C12.2652 9 12.5196 8.89464 12.7071 8.70711C12.8946 8.51957 13 8.26522 13 8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7ZM11.9883 10.4893C11.7895 10.4924 11.6002 10.5742 11.4617 10.7169C11.3233 10.8595 11.2471 11.0513 11.25 11.25V16.75C11.2486 16.8494 11.267 16.9481 11.304 17.0403C11.3411 17.1325 11.3961 17.2164 11.4659 17.2872C11.5357 17.358 11.6188 17.4142 11.7105 17.4526C11.8022 17.4909 11.9006 17.5107 12 17.5107C12.0994 17.5107 12.1978 17.4909 12.2895 17.4526C12.3812 17.4142 12.4643 17.358 12.5341 17.2872C12.6039 17.2164 12.6589 17.1325 12.696 17.0403C12.733 16.9481 12.7514 16.8494 12.75 16.75V11.25C12.7514 11.1496 12.7327 11.05 12.6949 10.957C12.6571 10.8639 12.6011 10.7795 12.53 10.7085C12.459 10.6376 12.3745 10.5816 12.2814 10.544C12.1883 10.5063 12.0887 10.4877 11.9883 10.4893Z"
                                                    fill="#2B70FA"
                                                />
                                            </svg>
                                        </div>

                                        <div className="cursor-pointer">
                                            <div className="flex justify-center">
                                                <svg
                                                    className="fill-customlightgraybg dark:fill-custommediumgraybg"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="85"
                                                    height="84"
                                                    viewBox="0 0 85 84"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M13.625 38.5C15.074 38.5 16.25 37.324 16.25 35.875V34.125C16.25 32.676 15.074 31.5 13.625 31.5C12.176 31.5 11 32.676 11 34.125V35.875C11 37.324 12.176 38.5 13.625 38.5ZM34.625 15.75H36.375C37.824 15.75 39 14.574 39 13.125C39 11.676 37.824 10.5 36.375 10.5H34.625C33.176 10.5 32 11.676 32 13.125C32 14.574 33.176 15.75 34.625 15.75ZM16.25 49.875V48.125C16.25 46.676 15.074 45.5 13.625 45.5C12.176 45.5 11 46.676 11 48.125V49.875C11 51.324 12.176 52.5 13.625 52.5C15.074 52.5 16.25 51.324 16.25 49.875ZM46 13.125C46 14.574 47.176 15.75 48.625 15.75H50.375C51.824 15.75 53 14.574 53 13.125C53 11.676 51.824 10.5 50.375 10.5H48.625C47.176 10.5 46 11.676 46 13.125ZM62.625 15.75H64.375C66.7918 15.75 68.75 17.7083 68.75 20.125V21.875C68.75 23.324 69.926 24.5 71.375 24.5C72.824 24.5 74 23.324 74 21.875V20.125C74 14.8085 69.6915 10.5 64.375 10.5H62.625C61.176 10.5 60 11.676 60 13.125C60 14.574 61.176 15.75 62.625 15.75ZM39 70.875C39 69.426 37.824 68.25 36.375 68.25H34.625C33.176 68.25 32 69.426 32 70.875C32 72.324 33.176 73.5 34.625 73.5H36.375C37.824 73.5 39 72.324 39 70.875ZM16.25 21.875V20.125C16.25 17.7083 18.2083 15.75 20.625 15.75H22.375C23.824 15.75 25 14.574 25 13.125C25 11.676 23.824 10.5 22.375 10.5H20.625C15.3085 10.5 11 14.8085 11 20.125V21.875C11 23.324 12.176 24.5 13.625 24.5C15.074 24.5 16.25 23.324 16.25 21.875ZM68.75 62.125V63.875C68.75 66.2918 66.7918 68.25 64.375 68.25H62.625C61.176 68.25 60 69.426 60 70.875C60 72.324 61.176 73.5 62.625 73.5H64.375C69.6915 73.5 74 69.1915 74 63.875V62.125C74 60.676 72.824 59.5 71.375 59.5C69.926 59.5 68.75 60.676 68.75 62.125ZM22.375 68.25H20.625C18.2083 68.25 16.25 66.2918 16.25 63.875V62.125C16.25 60.676 15.074 59.5 13.625 59.5C12.176 59.5 11 60.676 11 62.125V63.875C11 69.1915 15.3085 73.5 20.625 73.5H22.375C23.824 73.5 25 72.324 25 70.875C25 69.426 23.824 68.25 22.375 68.25ZM71.375 45.5C69.926 45.5 68.75 46.676 68.75 48.125V49.875C68.75 51.324 69.926 52.5 71.375 52.5C72.824 52.5 74 51.324 74 49.875V48.125C74 46.676 72.824 45.5 71.375 45.5ZM68.75 34.125V35.875C68.75 37.324 69.926 38.5 71.375 38.5C72.824 38.5 74 37.324 74 35.875V34.125C74 32.676 72.824 31.5 71.375 31.5C69.926 31.5 68.75 32.676 68.75 34.125ZM50.375 68.25H48.625C47.176 68.25 46 69.426 46 70.875C46 72.324 47.176 73.5 48.625 73.5H50.375C51.824 73.5 53 72.324 53 70.875C53 69.426 51.824 68.25 50.375 68.25Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-[30px] dark:text-custommediumgraybg text-center pt-[10px] text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">
                                                Connect to a wallet to view your liquidity.
                                            </p>
                                        </div>

                                        <div className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500] text-[Poppins] mt-[60px]">
                                            Or, if you staked your LP tokens in a farm, unstake them to see them here.
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'Bridge' && <div className="p-4">Bridge</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Token Modal content */}
            <Transition appear show={tokenModal} as={Fragment}>
                <Dialog as="div" open={tokenModal} onClose={() => setTokenModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 pt-10">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel !h-[793px] border-0 p-0 rounded-[40px] overflow-hidden w-full max-w-[580px] text-black dark:text-white-dark">
                                    <div className="px-[25px]">
                                        <button
                                            type="button"
                                            onClick={() => setTokenModal(false)}
                                            className="absolute top-[35px] ltr:right-10  rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M22.7397 4.06624C22.4314 4.07352 22.1385 4.20255 21.9251 4.42513L14 12.3503L6.07485 4.42513C5.96599 4.31323 5.83579 4.22432 5.69195 4.16365C5.54811 4.10298 5.39356 4.0718 5.23745 4.07194C5.00545 4.07223 4.77881 4.14167 4.58648 4.27139C4.39414 4.40111 4.24484 4.58522 4.15765 4.8002C4.07046 5.01518 4.04933 5.25128 4.09697 5.47833C4.14461 5.70537 4.25886 5.91307 4.42511 6.07487L12.3502 14L4.42511 21.9251C4.31314 22.0326 4.22375 22.1614 4.16216 22.3039C4.10058 22.4464 4.06805 22.5997 4.06647 22.7549C4.06489 22.9101 4.09429 23.0641 4.15296 23.2078C4.21164 23.3515 4.29839 23.4821 4.40815 23.5918C4.51791 23.7016 4.64846 23.7884 4.79217 23.847C4.93588 23.9057 5.08985 23.9351 5.24506 23.9335C5.40028 23.9319 5.55361 23.8994 5.6961 23.8378C5.83858 23.7762 5.96734 23.6868 6.07485 23.5749L14 15.6497L21.9251 23.5749C22.0326 23.6868 22.1614 23.7762 22.3039 23.8378C22.4463 23.8994 22.5997 23.9319 22.7549 23.9335C22.9101 23.9351 23.0641 23.9057 23.2078 23.847C23.3515 23.7884 23.4821 23.7016 23.5918 23.5918C23.7016 23.4821 23.7883 23.3515 23.847 23.2078C23.9057 23.0641 23.9351 22.9101 23.9335 22.7549C23.9319 22.5997 23.8994 22.4464 23.8378 22.3039C23.7762 22.1614 23.6868 22.0326 23.5748 21.9251L15.6497 14L23.5748 6.07487C23.7446 5.91208 23.8612 5.70179 23.9094 5.47157C23.9575 5.24134 23.935 5.00194 23.8447 4.78476C23.7544 4.56758 23.6005 4.38276 23.4034 4.25454C23.2062 4.12632 22.9749 4.06069 22.7397 4.06624Z"
                                                    fill="#F94025"
                                                />
                                            </svg>
                                        </button>
                                        <div className="text-[22px] pt-[35px] dark:text-white text-customblackbg font-[600] rtl:pr-5 py-3 ltr:pr-[50px] ">
                                            <div className="flex items-center gap-2">
                                                Select a Token
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                        <path
                                                            d="M13.0001 2.16663C7.02662 2.16663 2.16675 7.0265 2.16675 13C2.16675 18.9734 7.02662 23.8333 13.0001 23.8333C18.9735 23.8333 23.8334 18.9734 23.8334 13C23.8334 7.0265 18.9735 2.16663 13.0001 2.16663ZM13.0001 3.79163C18.0953 3.79163 22.2084 7.90471 22.2084 13C22.2084 18.0952 18.0953 22.2083 13.0001 22.2083C7.90483 22.2083 3.79175 18.0952 3.79175 13C3.79175 7.90471 7.90483 3.79163 13.0001 3.79163ZM13.0001 7.58329C12.7128 7.58329 12.4372 7.69743 12.234 7.90059C12.0309 8.10376 11.9167 8.37931 11.9167 8.66663C11.9167 8.95394 12.0309 9.22949 12.234 9.43266C12.4372 9.63582 12.7128 9.74996 13.0001 9.74996C13.2874 9.74996 13.5629 9.63582 13.7661 9.43266C13.9693 9.22949 14.0834 8.95394 14.0834 8.66663C14.0834 8.37931 13.9693 8.10376 13.7661 7.90059C13.5629 7.69743 13.2874 7.58329 13.0001 7.58329ZM12.9874 11.3633C12.7721 11.3667 12.5669 11.4554 12.417 11.6099C12.267 11.7644 12.1845 11.9722 12.1876 12.1875V18.1458C12.1861 18.2535 12.206 18.3604 12.2461 18.4603C12.2862 18.5602 12.3459 18.6511 12.4215 18.7278C12.4971 18.8045 12.5871 18.8653 12.6865 18.9069C12.7858 18.9485 12.8924 18.9699 13.0001 18.9699C13.1078 18.9699 13.2144 18.9485 13.3137 18.9069C13.413 18.8653 13.5031 18.8045 13.5787 18.7278C13.6543 18.6511 13.7139 18.5602 13.7541 18.4603C13.7942 18.3604 13.8141 18.2535 13.8126 18.1458V12.1875C13.8141 12.0787 13.7939 11.9708 13.7529 11.87C13.712 11.7692 13.6513 11.6777 13.5743 11.6009C13.4973 11.524 13.4057 11.4634 13.3049 11.4226C13.2041 11.3818 13.0961 11.3616 12.9874 11.3633Z"
                                                            fill="#2B70FA"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="border-b border-solid border-customlightgraybg opacity-[0.25] mt-[15px]"></div>
                                    </div>
                                    <div className="px-[40px] pb-[35px]">
                                        <div className="flex justify-between bg-transparent w-full mt-[30px] py-[10px] px-[35px] border border-solid border-customgraybg dark:border-[#404648] opacity dark:text-customlightgraybg rounded-[50px]">
                                            <input placeholder="Search Name or Paste Address" className="bg-transparent w-full pe-[3px] text-customlightgraybg  outline-none" />
                                            <div className=" rounded-[40px] cursor-pointer   bg-custombluebg py-[10px] px-[25px]">
                                                <div className="text-[16px] text-white font-[600] text-center">Search</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center py-[30px]">
                                            <div className="text-[18px] text-customblackbg dark:text-white font-[600] text-center">Token Name</div>
                                            <svg className="fill-customblackbg dark:fill-white ms-[15px]" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path
                                                    d="M19.5186 13.5603L16.5 16.5789V8.70835C16.5 8.20235 16.0893 7.79169 15.5833 7.79169C15.0773 7.79169 14.6666 8.20235 14.6666 8.70835V16.5789L11.6481 13.5603C11.2906 13.2023 10.7094 13.2023 10.3519 13.5603C9.99393 13.9182 9.99393 14.4985 10.3519 14.8564L14.9352 19.4398C15.114 19.619 15.3486 19.7084 15.5833 19.7084C15.818 19.7084 16.0526 19.619 16.2314 19.4398L20.8147 14.8564C21.1727 14.4985 21.1727 13.9182 20.8147 13.5603C20.4572 13.2023 19.8761 13.2023 19.5186 13.5603ZM15.5833 2.29169C15.3402 2.29169 15.107 2.38826 14.9351 2.56017C14.7632 2.73208 14.6666 2.96524 14.6666 3.20835C14.6666 3.45147 14.7632 3.68463 14.9351 3.85653C15.107 4.02844 15.3402 4.12502 15.5833 4.12502C15.8264 4.12502 16.0596 4.02844 16.2315 3.85653C16.4034 3.68463 16.5 3.45147 16.5 3.20835C16.5 2.96524 16.4034 2.73208 16.2315 2.56017C16.0596 2.38826 15.8264 2.29169 15.5833 2.29169ZM15.5833 5.04169C15.3402 5.04169 15.107 5.13826 14.9351 5.31017C14.7632 5.48208 14.6666 5.71524 14.6666 5.95835C14.6666 6.20147 14.7632 6.43463 14.9351 6.60653C15.107 6.77844 15.3402 6.87502 15.5833 6.87502C15.8264 6.87502 16.0596 6.77844 16.2315 6.60653C16.4034 6.43463 16.5 6.20147 16.5 5.95835C16.5 5.71524 16.4034 5.48208 16.2315 5.31017C16.0596 5.13826 15.8264 5.04169 15.5833 5.04169ZM5.49997 5.42119V13.2917C5.49997 13.7977 5.91063 14.2084 6.41663 14.2084C6.92263 14.2084 7.3333 13.7977 7.3333 13.2917V5.42119L10.3519 8.43977C10.5306 8.61898 10.7653 8.70835 11 8.70835C11.2346 8.70835 11.4693 8.61898 11.6481 8.43977C12.006 8.08181 12.006 7.50156 11.6481 7.1436L7.06472 2.56027C6.70722 2.20231 6.12605 2.20231 5.76855 2.56027L1.18522 7.1436C0.827258 7.50156 0.827258 8.08181 1.18522 8.43977C1.54272 8.79773 2.12388 8.79773 2.48138 8.43977L5.49997 5.42119ZM6.41663 17.875C6.17352 17.875 5.94036 17.9716 5.76845 18.1435C5.59654 18.3154 5.49997 18.5486 5.49997 18.7917C5.49997 19.0348 5.59654 19.268 5.76845 19.4399C5.94036 19.6118 6.17352 19.7084 6.41663 19.7084C6.65975 19.7084 6.89291 19.6118 7.06482 19.4399C7.23672 19.268 7.3333 19.0348 7.3333 18.7917C7.3333 18.5486 7.23672 18.3154 7.06482 18.1435C6.89291 17.9716 6.65975 17.875 6.41663 17.875ZM6.41663 15.125C6.17352 15.125 5.94036 15.2216 5.76845 15.3935C5.59654 15.5654 5.49997 15.7986 5.49997 16.0417C5.49997 16.2848 5.59654 16.518 5.76845 16.6899C5.94036 16.8618 6.17352 16.9584 6.41663 16.9584C6.65975 16.9584 6.89291 16.8618 7.06482 16.6899C7.23672 16.518 7.3333 16.2848 7.3333 16.0417C7.3333 15.7986 7.23672 15.5654 7.06482 15.3935C6.89291 15.2216 6.65975 15.125 6.41663 15.125Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </div>

                                        <div className="overflow-y-scroll  pe-[16px] scrollbar">
                                            <div className="h-[500px]  mb-[-25px]">
                                                {items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex mt-[12px] gap-[10px] items-center py-[15px] px-[20px] bg-customgraybg dark:bg-customblackbg rounded-[50px] cursor-pointer"
                                                    >
                                                        <img src={item.icon} alt={`${item.name} Icon`} />
                                                        <p className="text-[16px] text-customblackbg dark:text-white font-[600] ">{item.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* setting Modal */}
            <Transition appear show={settingModal} as={Fragment}>
                <Dialog as="div" open={settingModal} onClose={() => setSettingModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 pt-10">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel  border-0 p-0 rounded-[40px] overflow-hidden w-full max-w-[580px] text-black dark:text-white-dark">
                                    <div className="px-[10px]">
                                        <button
                                            type="button"
                                            onClick={() => setSettingModal(false)}
                                            className="absolute top-[35px] ltr:right-8  rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M22.7397 4.06624C22.4314 4.07352 22.1385 4.20255 21.9251 4.42513L14 12.3503L6.07485 4.42513C5.96599 4.31323 5.83579 4.22432 5.69195 4.16365C5.54811 4.10298 5.39356 4.0718 5.23745 4.07194C5.00545 4.07223 4.77881 4.14167 4.58648 4.27139C4.39414 4.40111 4.24484 4.58522 4.15765 4.8002C4.07046 5.01518 4.04933 5.25128 4.09697 5.47833C4.14461 5.70537 4.25886 5.91307 4.42511 6.07487L12.3502 14L4.42511 21.9251C4.31314 22.0326 4.22375 22.1614 4.16216 22.3039C4.10058 22.4464 4.06805 22.5997 4.06647 22.7549C4.06489 22.9101 4.09429 23.0641 4.15296 23.2078C4.21164 23.3515 4.29839 23.4821 4.40815 23.5918C4.51791 23.7016 4.64846 23.7884 4.79217 23.847C4.93588 23.9057 5.08985 23.9351 5.24506 23.9335C5.40028 23.9319 5.55361 23.8994 5.6961 23.8378C5.83858 23.7762 5.96734 23.6868 6.07485 23.5749L14 15.6497L21.9251 23.5749C22.0326 23.6868 22.1614 23.7762 22.3039 23.8378C22.4463 23.8994 22.5997 23.9319 22.7549 23.9335C22.9101 23.9351 23.0641 23.9057 23.2078 23.847C23.3515 23.7884 23.4821 23.7016 23.5918 23.5918C23.7016 23.4821 23.7883 23.3515 23.847 23.2078C23.9057 23.0641 23.9351 22.9101 23.9335 22.7549C23.9319 22.5997 23.8994 22.4464 23.8378 22.3039C23.7762 22.1614 23.6868 22.0326 23.5748 21.9251L15.6497 14L23.5748 6.07487C23.7446 5.91208 23.8612 5.70179 23.9094 5.47157C23.9575 5.24134 23.935 5.00194 23.8447 4.78476C23.7544 4.56758 23.6005 4.38276 23.4034 4.25454C23.2062 4.12632 22.9749 4.06069 22.7397 4.06624Z"
                                                    fill="#F94025"
                                                />
                                            </svg>
                                        </button>
                                        <div className="text-[22px] pt-[35px] dark:text-white text-customblackbg font-[600] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            Settings
                                        </div>
                                        <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[15px] mx-5"></div>
                                    </div>

                                    <div className="px-[40px] pb-[35px]">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[18px] py-[15px] dark:text-white text-customblackbg font-[600]">Slippage Tolerance</p>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M10.9999 1.83337C5.94545 1.83337 1.83325 5.94557 1.83325 11C1.83325 16.0545 5.94545 20.1667 10.9999 20.1667C16.0544 20.1667 20.1666 16.0545 20.1666 11C20.1666 5.94557 16.0544 1.83337 10.9999 1.83337ZM10.9999 3.20837C15.3113 3.20837 18.7916 6.68868 18.7916 11C18.7916 15.3114 15.3113 18.7917 10.9999 18.7917C6.68855 18.7917 3.20825 15.3114 3.20825 11C3.20825 6.68868 6.68855 3.20837 10.9999 3.20837ZM10.9999 6.41671C10.7568 6.41671 10.5236 6.51328 10.3517 6.68519C10.1798 6.8571 10.0833 7.09026 10.0833 7.33337C10.0833 7.57649 10.1798 7.80965 10.3517 7.98155C10.5236 8.15346 10.7568 8.25004 10.9999 8.25004C11.243 8.25004 11.4762 8.15346 11.6481 7.98155C11.82 7.80965 11.9166 7.57649 11.9166 7.33337C11.9166 7.09026 11.82 6.8571 11.6481 6.68519C11.4762 6.51328 11.243 6.41671 10.9999 6.41671ZM10.9892 9.61519C10.807 9.61804 10.6334 9.69308 10.5065 9.82383C10.3796 9.95459 10.3098 10.1304 10.3124 10.3125V15.3542C10.3111 15.4453 10.328 15.5358 10.3619 15.6203C10.3959 15.7048 10.4463 15.7818 10.5103 15.8467C10.5743 15.9115 10.6505 15.9631 10.7346 15.9982C10.8186 16.0334 10.9088 16.0515 10.9999 16.0515C11.091 16.0515 11.1812 16.0334 11.2653 15.9982C11.3493 15.9631 11.4256 15.9115 11.4895 15.8467C11.5535 15.7818 11.6039 15.7048 11.6379 15.6203C11.6719 15.5358 11.6887 15.4453 11.6874 15.3542V10.3125C11.6887 10.2205 11.6716 10.1292 11.6369 10.0439C11.6023 9.95865 11.5509 9.88121 11.4858 9.81618C11.4207 9.75115 11.3432 9.69985 11.2579 9.66533C11.1726 9.6308 11.0812 9.61376 10.9892 9.61519Z"
                                                        fill="#2B70FA"
                                                    />
                                                </svg>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-[10px]">
                                            <div className="gap-[10px] text-customblackbg dark:text-white py-[16px] px-[25px] bg-customgraybg dark:bg-customblackbg border border-customlightgraybg  rounded-[50px] cursor-pointe">
                                                0.1%
                                            </div>
                                            <div className=" gap-[10px] text-customblackbg dark:text-white py-[16px] px-[25px] bg-customgraybg dark:bg-customblackbg border border-customlightgraybg  rounded-[50px] cursor-pointe">
                                                0.1%
                                            </div>
                                            <div className="gap-[10px] text-customblackbg dark:text-white py-[16px] px-[25px] bg-customgraybg dark:bg-customblackbg border border-customlightgraybg  rounded-[50px] cursor-pointe">
                                                0.1%
                                            </div>

                                            <input
                                                placeholder="Enter Percentage"
                                                className=" dark:bg-customblackbg bg-customgraybg w-full text-[16px] py-[16px] px-[25px] opacity dark:text-customlightgraybg text-custommediumgraybg rounded-[50px]  outline-none"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 pt-[30px] ">
                                            <p className="text-[18px] pb-[10px] dark:text-white text-customblackbg font-[600]">Transaction Deadline</p>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M10.9999 1.83337C5.94545 1.83337 1.83325 5.94557 1.83325 11C1.83325 16.0545 5.94545 20.1667 10.9999 20.1667C16.0544 20.1667 20.1666 16.0545 20.1666 11C20.1666 5.94557 16.0544 1.83337 10.9999 1.83337ZM10.9999 3.20837C15.3113 3.20837 18.7916 6.68868 18.7916 11C18.7916 15.3114 15.3113 18.7917 10.9999 18.7917C6.68855 18.7917 3.20825 15.3114 3.20825 11C3.20825 6.68868 6.68855 3.20837 10.9999 3.20837ZM10.9999 6.41671C10.7568 6.41671 10.5236 6.51328 10.3517 6.68519C10.1798 6.8571 10.0833 7.09026 10.0833 7.33337C10.0833 7.57649 10.1798 7.80965 10.3517 7.98155C10.5236 8.15346 10.7568 8.25004 10.9999 8.25004C11.243 8.25004 11.4762 8.15346 11.6481 7.98155C11.82 7.80965 11.9166 7.57649 11.9166 7.33337C11.9166 7.09026 11.82 6.8571 11.6481 6.68519C11.4762 6.51328 11.243 6.41671 10.9999 6.41671ZM10.9892 9.61519C10.807 9.61804 10.6334 9.69308 10.5065 9.82383C10.3796 9.95459 10.3098 10.1304 10.3124 10.3125V15.3542C10.3111 15.4453 10.328 15.5358 10.3619 15.6203C10.3959 15.7048 10.4463 15.7818 10.5103 15.8467C10.5743 15.9115 10.6505 15.9631 10.7346 15.9982C10.8186 16.0334 10.9088 16.0515 10.9999 16.0515C11.091 16.0515 11.1812 16.0334 11.2653 15.9982C11.3493 15.9631 11.4256 15.9115 11.4895 15.8467C11.5535 15.7818 11.6039 15.7048 11.6379 15.6203C11.6719 15.5358 11.6887 15.4453 11.6874 15.3542V10.3125C11.6887 10.2205 11.6716 10.1292 11.6369 10.0439C11.6023 9.95865 11.5509 9.88121 11.4858 9.81618C11.4207 9.75115 11.3432 9.69985 11.2579 9.66533C11.1726 9.6308 11.0812 9.61376 10.9892 9.61519Z"
                                                        fill="#2B70FA"
                                                    />
                                                </svg>
                                            </span>
                                        </div>

                                        <div>
                                            <input
                                                placeholder="Enter Minutes"
                                                className="dark:bg-customblackbg bg-customgraybg w-[205px] text-[16px] py-[16px] px-[25px] opacity dark:text-customlightgraybg text-custommediumgraybg rounded-[50px]  outline-none"
                                            />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Recent Transection */}
            <Transition appear show={recentTransactions} as={Fragment}>
                <Dialog as="div" open={recentTransactions} onClose={() => setRecentTransactions(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 pt-10">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel  border-0 p-0 rounded-[40px] overflow-hidden w-full max-w-[580px] max-sm:pb-8 lg:h-[302px] text-black dark:text-white-dark">
                                    <div className="px-[10px]">
                                        <button
                                            type="button"
                                            onClick={() => setRecentTransactions(false)}
                                            className="absolute top-[35px] ltr:right-8  rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M22.7397 4.06624C22.4314 4.07352 22.1385 4.20255 21.9251 4.42513L14 12.3503L6.07485 4.42513C5.96599 4.31323 5.83579 4.22432 5.69195 4.16365C5.54811 4.10298 5.39356 4.0718 5.23745 4.07194C5.00545 4.07223 4.77881 4.14167 4.58648 4.27139C4.39414 4.40111 4.24484 4.58522 4.15765 4.8002C4.07046 5.01518 4.04933 5.25128 4.09697 5.47833C4.14461 5.70537 4.25886 5.91307 4.42511 6.07487L12.3502 14L4.42511 21.9251C4.31314 22.0326 4.22375 22.1614 4.16216 22.3039C4.10058 22.4464 4.06805 22.5997 4.06647 22.7549C4.06489 22.9101 4.09429 23.0641 4.15296 23.2078C4.21164 23.3515 4.29839 23.4821 4.40815 23.5918C4.51791 23.7016 4.64846 23.7884 4.79217 23.847C4.93588 23.9057 5.08985 23.9351 5.24506 23.9335C5.40028 23.9319 5.55361 23.8994 5.6961 23.8378C5.83858 23.7762 5.96734 23.6868 6.07485 23.5749L14 15.6497L21.9251 23.5749C22.0326 23.6868 22.1614 23.7762 22.3039 23.8378C22.4463 23.8994 22.5997 23.9319 22.7549 23.9335C22.9101 23.9351 23.0641 23.9057 23.2078 23.847C23.3515 23.7884 23.4821 23.7016 23.5918 23.5918C23.7016 23.4821 23.7883 23.3515 23.847 23.2078C23.9057 23.0641 23.9351 22.9101 23.9335 22.7549C23.9319 22.5997 23.8994 22.4464 23.8378 22.3039C23.7762 22.1614 23.6868 22.0326 23.5748 21.9251L15.6497 14L23.5748 6.07487C23.7446 5.91208 23.8612 5.70179 23.9094 5.47157C23.9575 5.24134 23.935 5.00194 23.8447 4.78476C23.7544 4.56758 23.6005 4.38276 23.4034 4.25454C23.2062 4.12632 22.9749 4.06069 22.7397 4.06624Z"
                                                    fill="#F94025"
                                                />
                                            </svg>
                                        </button>
                                        <div className="text-[22px] pt-[35px] dark:text-white text-customblackbg font-[600] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            Recent Transactions
                                        </div>
                                        <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[15px] mx-5"></div>
                                    </div>

                                    <div className="px-[40px]">
                                        <p className="text-[20px] pt-[10px] text-center dark:text-customlightgraybg text-customblackbg font-[500]">
                                            Please connect your wallet to view your recent transactions
                                        </p>
                                    </div>
                                    <div className="flex justify-center pt-[30px] ">
                                        <div className=" rounded-full cursor-pointer bg-custombluebg py-[12px] px-[34px] ">
                                            <div className="text-[16px]  text-white text-center font-[500]">Connect</div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Connect to a Wallet Modal */}
            <CustomDialog
                isOpen={connectWallet}
                onClose={() => setConnectWallet(false)}
                itemsConnect={itemsConnect}
                theme={theme}
                setConnectWallet={setConnectWallet}
            />
        </div>
    );
};

export default Trade;
