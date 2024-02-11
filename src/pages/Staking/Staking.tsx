import { Fragment, useEffect, useRef, useState } from 'react';
import main from '../../../public/assets/images/main-icon.svg';
import icon1 from '../../../public/assets/images/icon 1.svg';
import icon2 from '../../../public/assets/images/icon 2.svg';
import icon3 from '../../../public/assets/images/icon 3.svg';
import icon4 from '../../../public/assets/images/icon 4.svg';
import icon5 from '../../../public/assets/images/icon 5.svg';
import icon6 from '../../../public/assets/images/icon 6.svg';
import icon7 from '../../../public/assets/images/icon 7.svg';
import icon8 from '../../../public/assets/images/icon 8.svg';
import icon9 from '../../../public/assets/images/icon 9.svg';
import bgslice from '../../../public/assets/images/pizzaslice.png';
import connect1 from '../../../public/assets/images/connect1.png';
import connect2 from '../../../public/assets/images/connect2.png';
import connect3 from '../../../public/assets/images/connect3.png';
import connect4 from '../../../public/assets/images/connect4.png';
import connect5 from '../../../public/assets/images/connect5.png';
import connect6 from '../../../public/assets/images/connect6.png';
import connect7 from '../../../public/assets/images/connect7.png';
import { Dialog, Transition } from '@headlessui/react';
import CustomDialog from '../../components/Reuseable/ConnectToWalletModal';
import WalletButton from '../../components/Reuseable/WalletButton';
import { stackingdata } from '../../components/Constants/Constant';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
function Staking() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [visibleItems, setVisibleItems] = useState(9);
    const [connectWallet, setConnectWallet] = useState<any>(false);
    const [aprModal, setAprModal] = useState<any>(false);
    const dispatch = useDispatch()
    const [showStaked, setShowStaked] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('Staking'));
    }, []);


    const navItems = [
        {
            title: 'All',
        },
        {
            title: 'PizzaSwap',
        },
        {
            title: 'Partner',
        },
        {
            title: 'Inactive',
        },
    ];

    const items = [
        {
            contentTitle: 'PizzaSwap',
            mutli: '11x',
            main: main,
            icon: icon1,
            title: `PizzaSwap-Anchor`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: '$10',
            tag: 'PizzaSwap',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'UnStaked',
        },
        {
            main: main,
            icon: icon2,
            contentTitle: 'PizzaSwap',
            mutli: '11x',
            title: `PizzaSwap-Bitcoin`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: '$50',
            tag: 'PizzaSwap',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'Staked',
        },
        {
            main: main,
            icon: icon3,
            contentTitle: 'PizzaSwap',
            mutli: '19x',
            title: `PizzaSwap-Bitcoin Lightning`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: '$99',
            tag: 'PizzaSwap',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'UnStaked',
        },
        {
            main: main,
            icon: icon4,
            contentTitle: 'Partner',
            mutli: '13x',
            title: `PizzaSwap-Cardano`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: '$5',
            tag: 'Partner',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'Staked',
        },
        {
            main: main,
            icon: icon5,
            contentTitle: 'Partner',
            mutli: '10x',
            title: `PizzaSwap-Cosmos`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: '$5',
            tag: 'Partner',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'Staked',
        },
        {
            main: main,
            icon: icon6,
            contentTitle: 'Partner',
            mutli: '11x',
            title: `PizzaSwap-Dash`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: '$5',
            tag: 'Partner',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'UnStaked',
        },

        {
            main: main,
            icon: icon7,
            contentTitle: 'Partner',
            mutli: '17x',
            title: `PizzaSwap-Dogecoin`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: 'free',
            tag: 'inactive',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'Staked',
        },
        {
            main: main,
            icon: icon8,
            contentTitle: 'Partner',
            mutli: '9x',
            title: `PizzaSwap-Flow`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: 'free',
            tag: 'inactive',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'UnStaked',
        },
        {
            main: main,
            icon: icon9,
            contentTitle: 'Inactivea',
            mutli: '15x',
            title: `PizzaSwap-Ethereum Classic`,
            apr: '1.65%',
            earn: 'Pizzaswap',
            deposit: '2%',
            harvest: '2 Hour(s)',
            price: 'free',
            tag: 'inactive',
            harvestbtn: 'Harvest',
            earned: '0.000',
            stacked: 'UnStaked',
        },
    ];

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

    const table = [
        {
            id: '1',
            day: '1d',
            roi: '0.00%',
            eraned: '101,066,256',
        },
        {
            id: '2',
            day: '7d',
            roi: '0.03%',
            eraned: '164,043',
        },
        {
            id: '3',
            day: '30d',
            roi: '0.14%',
            eraned: '100,902,213',
        },
        {
            id: '4',
            day: '365d(APY)',
            roi: '1.66%',
            eraned: '0.03',
        },
    ];

    const firstBtnRef = useRef<HTMLButtonElement>(null);

    const filteredItems =
        selectedTab === 0
            ? items.filter(
                (item) =>
                    (selectedFilter === 'All' || item.tag === selectedFilter) &&
                    (!showStaked || item.stacked === 'Staked')
            )
            : items.filter(
                (item) =>
                    item.contentTitle === navItems[selectedTab]?.title &&
                    (selectedFilter === 'All' || item.tag === selectedFilter) &&
                    (!showStaked || item.stacked === 'Staked')
            );
    return (
        <div className="">
            <div>
                <h1 className="text-[28px] dark:text-white text-customblackbg font-[700] text-[Poppins] leading-8 ">{stackingdata.stackingtitle}</h1>
                <p className="text-[16px] dark:text-customlightgraybg text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">{stackingdata.stackingsubtitle}</p>
            </div>

            <div className="flex items-center justify-center gap-[28px] max-sm:flex-col max-md:flex-wrap pt-[70px]">
                <div className="flex items-center gap-3">
                    <span className="ms-3 text-[18px] font-[500] m-[0px] dark:text-[#B2BEC3] text-[#2D3436] ">Staked Only</span>


                    <label className="relative inline-flex items-center cursor-pointer mb-0">
                        <input
                            type="checkbox"
                            value="toggle"
                            className="sr-only peer"
                            onChange={() => setShowStaked(!showStaked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]  max-md:after:top-[2px] min-md:after:top-[10px] max-lg:after:top-[2px] max-xl:after:top-[2px] max-2xl:after:top-[2px]  after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="bg-[#FFF] dark:bg-[#1A1E1F] rounded-[50px] max-lg:rounded-[20px]  border-[1px] p-[20px] border-solid border-[#F0F3F5] dark:border-[#636E72] w-fit flex flex-row gap-[20px] max-sm:flex-col max-md:flex-col flex-wrap justify-center max-sm:gap-y-[10px] max-md:gap-y-[10px] max-sm:w-[100%] max-md:w-[60%]  ">
                    {navItems.map((item, index) => (
                        <button
                            ref={index === 0 ? firstBtnRef : null}
                            key={index}
                            onClick={() => setSelectedTab(index)}
                            className={`outline-none rounded-[30px] border-0 py-[12px] px-[34px] w-[228px]
             text-center text-[18px] hover:text-white hover:bg-[#2B70FA] bg-none text-[#989CAA] max-md:mx-0  max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%] max-xl:w-[100%] dark:text-white 
             ${selectedTab === index ? 'bg-[#2B70FA] text-white border-[0px] ' : "dark:text-[#fff] dark:bg-[#636E72] bg-[#F0F3F5] text-'[#636E72]"}`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
            {/* flex justify-center flex-wrap  items-center   */}

            {filteredItems.length >= 1 ? (
                <>
                    <div
                        className={`${filteredItems.length === 1
                            ? ' mx-[32%] place-content-center max-md:mx-[20%] max-lg:mx-[20%]'
                            : 'grid grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-2   max-sm:grid-cols-1'
                            }   gap-[40px]  pt-[40px] max-sm:pt-[100px] max-md:pt-[100px]  max-lg:pt-[100px]`}
                    >
                        {filteredItems.slice(0, visibleItems).map((item, index) => (
                            <>
                                <div className="bg-[#fff] dark:bg-[#1A1E1F]  rounded-[20px] border-[1px] border-solid border-[#B2BEC34D] md:py-[35px] py-[35px] px-[30px] md:p-[30px] sm:p-[20px]">
                                    <div className="flex gap-[10px] items-center mb-[18px]">
                                        <div>
                                            <img src={item.main} alt="" />
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                <path
                                                    d="M4.98276 14.0833H17.101L13.5336 17.6507C13.1105 18.0738 13.1105 18.7595 13.5336 19.1826C13.7454 19.3944 14.0222 19.5 14.2995 19.5C14.5769 19.5 14.8536 19.3944 15.0654 19.1826L20.4822 13.7659C20.6853 13.5633 20.7996 13.2876 20.7996 12.9999C20.7996 12.7123 20.6853 12.4371 20.4822 12.234L15.0654 6.81728C14.6424 6.39424 13.9566 6.39424 13.5336 6.81728C13.1105 7.24033 13.1105 7.92609 13.5336 8.34913L17.101 11.9166H4.98276C4.38475 11.9166 3.89941 12.4019 3.89941 12.9999C3.89941 13.5979 4.38475 14.0833 4.98276 14.0833Z"
                                                    fill="#B2BEC3"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <img src={item.icon} alt="" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[30px]">
                                        <div className="flex justify-between items-center ">
                                            <div>
                                                <p className="text-[22px] font-[600] m-[0px] dark:text-[#FFF] text-[#2D3436] ">{item.title}</p>
                                            </div>
                                            <div className="bg-[#2B70FA] rounded-[20px] px-[14px] py-[6px]">
                                                <p className=" text-[16px] font-[600] m-[0px] p-[0px] text-[#FFF]">{item.mutli}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-[18px]">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#636E72] dark:text-[#B2BEC3]  group-hover:text-[#20D091]">APR</p>
                                                </div>
                                                <div className="flex gap-[10px]">
                                                    <div onClick={() => setAprModal(true)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className=" cursor-pointer" fill="none">
                                                            <path
                                                                d="M17.25 2H6.75C5.234 2 4 3.2335 4 4.75V19.25C4 20.7665 5.234 22 6.75 22H17.25C18.766 22 20 20.7665 20 19.25V4.75C20 3.2335 18.766 2 17.25 2ZM8.25 18.5C7.5595 18.5 7 17.9405 7 17.25C7 16.5595 7.5595 16 8.25 16C8.9405 16 9.5 16.5595 9.5 17.25C9.5 17.9405 8.9405 18.5 8.25 18.5ZM8.25 15C7.5595 15 7 14.4405 7 13.75C7 13.0595 7.5595 12.5 8.25 12.5C8.9405 12.5 9.5 13.0595 9.5 13.75C9.5 14.4405 8.9405 15 8.25 15ZM12 18.5C11.3095 18.5 10.75 17.9405 10.75 17.25C10.75 16.5595 11.3095 16 12 16C12.6905 16 13.25 16.5595 13.25 17.25C13.25 17.9405 12.6905 18.5 12 18.5ZM12 15C11.3095 15 10.75 14.4405 10.75 13.75C10.75 13.0595 11.3095 12.5 12 12.5C12.6905 12.5 13.25 13.0595 13.25 13.75C13.25 14.4405 12.6905 15 12 15ZM17 17.25C17 17.9405 16.4405 18.5 15.75 18.5C15.0595 18.5 14.5 17.9405 14.5 17.25C14.5 16.7735 14.5 14.2275 14.5 13.75C14.5 13.0595 15.0595 12.5 15.75 12.5C16.4405 12.5 17 13.0595 17 13.75C17 14.2275 17 16.7735 17 17.25ZM17 9.27C17 9.9485 16.448 10.5 15.7695 10.5H8.2305C7.552 10.5 7 9.948 7 9.27V6.73C7 6.0515 7.552 5.5 8.2305 5.5H15.7695C16.448 5.5 17 6.052 17 6.73V9.27Z"
                                                                fill="#2B70FA"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">{item.apr}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3]   group-hover:text-[#20D091]">
                                                        Earn:
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">{item.earn}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#636E72] dark:text-[#B2BEC3]   group-hover:text-[#20D091]">
                                                        Deposit Fee:
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">{item.deposit}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#636E72] dark:text-[#B2BEC3] group-hover:text-[#20D091]">
                                                        Harvest Lockup:
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">{item.harvest}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[100%] p-[1px] opacity-[25%] bg-[#B2BEC3]"></div>

                                        <div className="flex justify-between items-center flex-wrap">
                                            <div>
                                                <div>
                                                    <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#B2BEC3]   group-hover:text-[#20D091]">PizzaSwap Earned</p>
                                                </div>
                                                <div>
                                                    <p className="text-[22px] max-sm:text-[16px] max-md:text-[22px] font-[600] text-[#2D3436] dark:text-[#fff]  group-hover:text-[#20D091] leading-9">
                                                        {item.earned}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="py-[10px] max-sm:w-[100%] max-md:w-[100%]   max-2xl:w-[100%] ">
                                                <button
                                                    className="text-[18px] font-[500] text-[#fff]  bg-[#2B70FA] py-[12px] px-[30px] rounded-[40px] max-sm:w-[100%]  max-md:w-[100%] max-lg:w-[100%] max-xl:w-[100%] max-2xl:w-[100%]"
                                                   
                                                >
                                                    {item.harvestbtn}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-[18px]">
                                            <div>
                                                <p className="text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF]">
                                                    {item.title} {item.stacked}
                                                </p>
                                            </div>
                                            <WalletButton onClick={() => setConnectWallet(true)} buttonText="Unlock Wallet" />

                                            <div className="w-[100%] p-[1px] opacity-[25%] my-[20px] bg-[#B2BEC3]"></div>

                                            <div className="flex items-center justify-center gap-[7px] ">
                                                <p className="text-[18px] cursor-pointer text-center dark:text-customlightgraybg text-customlightgraybg font-[700] text-[Poppins]">View All</p>
                                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                                                    <path
                                                        d="M9.47477 13.0942C9.19463 13.3743 8.74052 13.3743 8.46038 13.0942L1.64516 6.27894C1.36502 5.99879 1.36502 5.54469 1.64516 5.26454C1.92531 4.9844 2.37941 4.9844 2.65956 5.26454L8.96758 11.5726L15.2756 5.26454C15.4158 5.12429 15.5991 5.05435 15.7828 5.05435C15.9664 5.05435 16.1497 5.12429 16.29 5.26454C16.5701 5.54469 16.5701 5.99879 16.29 6.27894L9.47477 13.0942Z"
                                                        fill="#B2BEC3"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                        {/* Connect to a Wallet Modal */}
                        <CustomDialog isOpen={connectWallet} onClose={() => setConnectWallet(false)} itemsConnect={itemsConnect} theme={theme} setConnectWallet={setConnectWallet} />

                        {/* APR Modal */}
                        <Transition appear show={aprModal} as={Fragment}>
                            <Dialog as="div" open={aprModal} onClose={() => setAprModal(false)} className="relative z-[51]">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
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
                                            <Dialog.Panel id={'headlessui-dialog-panel-:rb'} className="panel !h-[526px] border-0 p-0 rounded-[40px] overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                                <div className="px-[25px]">
                                                    <button
                                                        type="button"
                                                        onClick={() => setConnectWallet(false)}
                                                        className="absolute top-[30px] max-sm:top-[20px] ltr:right-10  rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path
                                                                d="M22.7397 4.06624C22.4314 4.07352 22.1385 4.20255 21.9251 4.42513L14 12.3503L6.07485 4.42513C5.96599 4.31323 5.83579 4.22432 5.69195 4.16365C5.54811 4.10298 5.39356 4.0718 5.23745 4.07194C5.00545 4.07223 4.77881 4.14167 4.58648 4.27139C4.39414 4.40111 4.24484 4.58522 4.15765 4.8002C4.07046 5.01518 4.04933 5.25128 4.09697 5.47833C4.14461 5.70537 4.25886 5.91307 4.42511 6.07487L12.3502 14L4.42511 21.9251C4.31314 22.0326 4.22375 22.1614 4.16216 22.3039C4.10058 22.4464 4.06805 22.5997 4.06647 22.7549C4.06489 22.9101 4.09429 23.0641 4.15296 23.2078C4.21164 23.3515 4.29839 23.4821 4.40815 23.5918C4.51791 23.7016 4.64846 23.7884 4.79217 23.847C4.93588 23.9057 5.08985 23.9351 5.24506 23.9335C5.40028 23.9319 5.55361 23.8994 5.6961 23.8378C5.83858 23.7762 5.96734 23.6868 6.07485 23.5749L14 15.6497L21.9251 23.5749C22.0326 23.6868 22.1614 23.7762 22.3039 23.8378C22.4463 23.8994 22.5997 23.9319 22.7549 23.9335C22.9101 23.9351 23.0641 23.9057 23.2078 23.847C23.3515 23.7884 23.4821 23.7016 23.5918 23.5918C23.7016 23.4821 23.7883 23.3515 23.847 23.2078C23.9057 23.0641 23.9351 22.9101 23.9335 22.7549C23.9319 22.5997 23.8994 22.4464 23.8378 22.3039C23.7762 22.1614 23.6868 22.0326 23.5748 21.9251L15.6497 14L23.5748 6.07487C23.7446 5.91208 23.8612 5.70179 23.9094 5.47157C23.9575 5.24134 23.935 5.00194 23.8447 4.78476C23.7544 4.56758 23.6005 4.38276 23.4034 4.25454C23.2062 4.12632 22.9749 4.06069 22.7397 4.06624Z"
                                                                fill="#F94025"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <div className="text-[22px] pt-[30px]  max-sm:pt-[20px] dark:text-white text-customblackbg font-[700] text-[Urbanist] ltr:pl-5 rtl:pr-5 py-3 max-sm:py-2 ltr:pr-[50px] rtl:pl-[50px]">
                                                        ROI
                                                    </div>
                                                    <div className="border-b border-solid border-customlightgraybg opacity-[0.25] mt-[15px] "></div>
                                                </div>

                                                <div className="px-[25px]">
                                                    <div className="bg-[#fff] dark:bg-[#1A1E1F] rounded-[40px] flex flex-col gap-[25px] max-sm:gap-[20px]">
                                                        <div>
                                                            <table className="w-[100%]">
                                                                <tbody className="border-b-[1px] !border-[#B2BEC34d]">
                                                                    <tr className="flex justify-between py-[18px] !bg-[none]">
                                                                        <th className="font-[600] dark:font-[500] text-[18px] max-sm:text-[16px]  dark:text-[#fff] text-[#2D3436] w-[20%]">
                                                                            Timeframe
                                                                        </th>

                                                                        <th className="font-[600] dark:font-[500] text-[18px] max-sm:text-[16px] dark:text-[#fff] text-[#2D3436] w-[30%]">ROI</th>

                                                                        <th className="font-[600] dark:font-[500] text-[18px] max-sm:text-[16px] dark:text-[#fff] text-[#2D3436] text-end w-[40%]">
                                                                            PizzaSwap Per $1000
                                                                        </th>
                                                                    </tr>
                                                                    {table.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <tr key={item.id} className="w-[100%] flex  border-b-[1px] !border-[#B2BEC34d] ">
                                                                                    <td className="text-[#636E72] text-[16px]  max-sm:text-[13px] text-start font-[500]  w-[33%]  ">{item.day}</td>

                                                                                    <td className="text-[#636E72] text-[16px]  max-sm:text-[13px] font-[500] text-center w-[20%]">{item.roi}</td>

                                                                                    <td className="text-[#636E72] text-[16px]  max-sm:text-[13px] font-[500] px-0 !text-end w-[47%]">{item.eraned}</td>
                                                                                </tr>
                                                                            </>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div>
                                                            <p className="font-[500] text-[13px]  max-sm:text-[10px] text-[#2D3436] dark:text-[#fff]">
                                                                Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means
                                                                represent guaranteed returns.
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-[500] text-[18px] max-sm:text-[16px] text-center text-[#2D3436] dark:text-[#fff] flex justify-center items-center gap-[5px]">
                                                                Get PizzaSwap-BNB LP{' '}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                                    <path
                                                                        d="M4.83334 11.8333H14.1551L11.4109 14.5775C11.0855 14.9029 11.0855 15.4304 11.4109 15.7558C11.5738 15.9187 11.7867 16 12.0001 16C12.2134 16 12.4263 15.9187 12.5893 15.7558L16.756 11.5891C16.9122 11.4333 17.0001 11.2212 17.0001 10.9999C17.0001 10.7787 16.9122 10.567 16.756 10.4108L12.5893 6.24407C12.2638 5.91864 11.7363 5.91864 11.4109 6.24407C11.0855 6.56949 11.0855 7.09699 11.4109 7.42241L14.1551 10.1666H4.83334C4.37334 10.1666 4 10.5399 4 10.9999C4 11.46 4.37334 11.8333 4.83334 11.8333Z"
                                                                        fill="#2B70FA"
                                                                    />
                                                                </svg>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-center intems-center mt-20">
                        <img width={320} height={320} src={bgslice} alt="bgslice" />
                    </div>
                </>
            )}
        </div>
    );
}

export default Staking;
