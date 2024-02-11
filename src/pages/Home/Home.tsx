import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';

import avatar from '../../../public/assets/images/avatar.png';
import connect from '../../../public/assets/images/connectImage.svg';
import { homeData } from '../../components/Constants/Constant'
import { Link } from 'react-router-dom';
import WalletButton from '../../components/Reuseable/WalletButton';
import CustomDialog from '../../components/Reuseable/ConnectToWalletModal';
import connect1 from '../../../public/assets/images/connect1.png';
import connect2 from '../../../public/assets/images/connect2.png';
import connect3 from '../../../public/assets/images/connect3.png';
import connect4 from '../../../public/assets/images/connect4.png';
import connect5 from '../../../public/assets/images/connect5.png';
import connect6 from '../../../public/assets/images/connect6.png';
import connect7 from '../../../public/assets/images/connect7.png';
const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Home'));
    });
    const [connectWallet, setConnectWallet] = useState<any>(false);
    const theme = localStorage.getItem('theme');

    const data = [
        { label: homeData.PizzaSwapStats.MarketCap, value: homeData.PizzaSwapStats.amount },
        { label: homeData.PizzaSwapStats.TotalMinted, value: homeData.PizzaSwapStats.amount2 },
        { label: homeData.PizzaSwapStats.TotalBurned, value: homeData.PizzaSwapStats.amount3 },
        { label: homeData.PizzaSwapStats.Supply, value: homeData.PizzaSwapStats.amount4 },
        { label: homeData.PizzaSwapStats.newPizza, value: homeData.PizzaSwapStats.amount5 },
    ];

    const cardData = [
        {
            image: '../assets/images/card1.png',
            title: homeData.Announcements.NFTCreatorStudio,
            description: homeData.Announcements.NFTCreatorStudioDescription,
        },
        {
            image: '../assets/images/card2.png',
            title: homeData.Announcements.NFTLoyaltyProgram,
            description: homeData.Announcements.NFTLoyaltyProgramDescription,
        },
        {
            image: '../assets/images/card3.png',
            title: homeData.Announcements.PersonalizedNFTGallery,
            description: homeData.Announcements.PersonalizedNFTGalleryDescription,
        },
        {
            image: '../assets/images/card4.png',
            title: homeData.Announcements.PersonalizedNFTGallery,
            description: homeData.Announcements.PersonalizedNFTGalleryDescription,
        },
    ];

    const backgroundImageStyle = {
        backgroundImage: 'url("../assets/images/profitbg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const backgroundLotryImageStyle = {
        backgroundImage: 'url("../assets/images/lotry.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const itemsConnect = [
        { id: 1, name: 'Metamask', icon: connect1 },
        { id: 2, name: 'TrustWallet', icon: connect2 },
        { id: 3, name: 'MathWallet', icon: connect3 },
        { id: 4, name: 'TokenPocket', icon: connect4 },
        { id: 5, name: 'WalletConnect', icon: connect5 },
        { id: 6, name: 'Binance Chain Wallet', icon: connect6 },
        { id: 7, name: 'Safepal Wallet', icon: connect7 },
    ];
    return (
        <div>
            <div className="flex items-center gap-[10px] pb-[21px]">
                <img src={avatar} alt="avatar" />
                <div className="mt-[10px]">
                    <h1 className="text-[28px] dark:text-white text-customblackbg font-[700] leading-8 text-[Poppins] ">{homeData.WelcomeMessage}</h1>
                    <p className="text-[16px] dark:text-customlightgraybg text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">{homeData.StatusAndAnalytics}</p>
                </div>
            </div>

            <div className="pt-5">
                <div className="grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-[40px] mb-[40px]">
                    <div className="panel w-[100%] min-[350px]:px-[40px] h-full">
                        <div className="flex justify-between dark:text-white-light">
                            <h5 className="text-[22px] dark:text-white text-customblackbg font-[700]">{homeData.FarmsAndStaking}</h5>
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-[8.9px] text-[#e95f2b] py-[40px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                                    <g clip-path="url(#clip0_37_117)">
                                        <path
                                            d="M23.0017 40.7377C13.2211 40.7377 5.26233 32.7823 5.26233 23.0017C5.26233 13.2212 13.2211 5.26234 23.0017 5.26234C28.902 5.26234 34.1375 8.15943 37.36 12.603L42.017 10.0803C37.8732 3.99924 30.8941 0 23.0017 0C10.3206 0 0 10.3206 0 23.0017C0 35.6829 10.3206 46 23.0017 46C30.8952 46 37.8732 42.0008 42.0135 35.9232L37.36 33.4005C34.1375 37.8441 28.9009 40.7377 23.0017 40.7377Z"
                                            fill="#04091E"
                                        />
                                        <path
                                            d="M26.2452 16.4705C28.2433 16.4705 29.8631 14.8507 29.8631 12.8526C29.8631 10.8545 28.2433 9.23477 26.2452 9.23477C24.2471 9.23477 22.6273 10.8545 22.6273 12.8526C22.6273 14.8507 24.2471 16.4705 26.2452 16.4705Z"
                                            fill="#04091E"
                                        />
                                        <path
                                            d="M15.408 13.29C17.3079 13.907 18.347 15.948 17.7301 17.8467C17.1131 19.7466 15.0721 20.7858 13.1733 20.1688C11.2734 19.5518 10.2343 17.5108 10.8512 15.6121C11.4682 13.7122 13.5092 12.673 15.408 13.29Z"
                                            fill="#04091E"
                                        />
                                        <path
                                            d="M11.3632 27.1468C12.5377 25.5303 14.7992 25.1722 16.4156 26.3467C18.0321 27.5211 18.3902 29.7826 17.2157 31.3991C16.0413 33.0156 13.7786 33.3736 12.1633 32.1992C10.5468 31.0247 10.1888 28.7633 11.3632 27.1468Z"
                                            fill="#04091E"
                                        />
                                        <path
                                            d="M23.3189 35.2759C22.1445 33.6594 22.5025 31.3979 24.119 30.2235C25.7355 29.049 27.997 29.4071 29.1714 31.0236C30.3459 32.6401 29.9878 34.9015 28.3713 36.076C26.7549 37.2504 24.4934 36.8924 23.3189 35.2759Z"
                                            fill="#04091E"
                                        />
                                        <path
                                            d="M43.2172 12.0432L38.5928 14.5496V14.5531C39.9609 17.0653 40.7376 19.9472 40.7376 23.0018C40.7376 26.0563 39.962 28.9347 38.5928 31.4504V31.4539L43.2172 33.9603C44.9899 30.7017 46 26.9683 46 23.0018C46 19.0352 44.9934 15.3065 43.2172 12.0432Z"
                                            fill="#B2BEC3"
                                        />
                                        <path
                                            d="M38.4353 23.0018C38.4353 25.6621 37.7612 28.1685 36.5704 30.3553L20.1268 23.0018L36.5704 15.6482C37.7577 17.8385 38.4353 20.3414 38.4353 23.0018Z"
                                            fill="#2B70FA"
                                        />
                                        <path
                                            d="M28.4448 19.7944C29.4467 21.1742 31.3781 21.4797 32.7566 20.4779C33.9113 19.6381 34.3102 18.1488 33.8226 16.8775L28.1999 19.3921C28.2711 19.5297 28.3504 19.6661 28.4448 19.7956V19.7944Z"
                                            fill="#B2BEC3"
                                        />
                                        <path
                                            d="M24.4888 24.3209C24.3161 24.4456 24.168 24.5926 24.0432 24.7524L28.0075 26.5252C28.1101 25.9467 27.9888 25.3285 27.6168 24.8165C26.8902 23.8158 25.4894 23.5942 24.4899 24.3209H24.4888Z"
                                            fill="#B2BEC3"
                                        />
                                        <path
                                            d="M33.4856 26.8832C33.0785 26.3222 33.2022 25.5373 33.7632 25.1302C34.3241 24.7232 35.1091 24.8468 35.5161 25.4078C35.9231 25.9688 35.7995 26.7537 35.2385 27.1608C34.6775 27.5678 33.8926 27.4442 33.4856 26.8832Z"
                                            fill="#B2BEC3"
                                        />
                                        <path
                                            d="M35.1091 22.3125C34.807 21.8961 34.8991 21.313 35.3155 21.0109C35.7319 20.7088 36.315 20.8009 36.6171 21.2173C36.9192 21.6337 36.827 22.2168 36.4107 22.5189C35.9943 22.821 35.4111 22.7288 35.1091 22.3125Z"
                                            fill="#B2BEC3"
                                        />
                                        <path
                                            d="M29.5318 23.5278C29.3231 23.2397 29.3872 22.8373 29.6741 22.6285C29.9622 22.4198 30.3646 22.4839 30.5733 22.7708C30.7821 23.0589 30.718 23.4613 30.4311 23.67C30.143 23.8788 29.7406 23.8147 29.5318 23.5278Z"
                                            fill="#B2BEC3"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_37_117">
                                            <rect width="46" height="46" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <Link to={'/buy-pizzaswap'} className="rounded-[40px] cursor-pointer bg-custombluebg py-[12px] px-[34px] ">
                                    <div className="text-[16px] text-white font-[500]">{homeData.BuyPizzaSwap}</div>
                                </Link>
                                <div className="flex gap-[10px] rounded-[40px] cursor-pointer   bg-custombluebg py-[12px] px-[34px]">
                                    <div className="text-[16px] text-white font-[500]">{homeData.Connect} </div>
                                    <img src={connect} alt='connect' />
                                </div>
                            </div>
                            <div className=''>
                                <div>
                                    <div className="flex justify-between">
                                        <h2 className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500]">{homeData.PizzaSwapToHarvest}</h2>
                                        <p className="text-[16px] text-customred font-[500]">{homeData.Locked}</p>
                                    </div>
                                    <h1 className="text-[22px] dark:text-white text-customblackbg font-[600] pt-[10px]">{homeData.Wallet1}</h1>
                                </div>

                                <div className="pt-[28px]">
                                    <div className="flex justify-between">
                                        <h2 className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500]">{homeData.PizzaSwapInWallet}</h2>
                                        <p className="text-[16px] text-customred font-[500]">{homeData.Locked}</p>
                                    </div>
                                    <h1 className="text-[22px] dark:text-white text-customblackbg font-[600] pt-[10px]">{homeData.WalletBalance}</h1>
                                </div>
                            </div>

                            <div className='pt-[40px]'>
                                <WalletButton onClick={() => setConnectWallet(true)} buttonText={homeData.UnlockWallet} />

                            </div>
                        </div>
                    </div>

                    <div className="panel h-full">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="text-[22px] dark:text-white text-customblackbg font-[700]">{homeData.PizzaSwapStats.Title}</h5>
                        </div>
                        <div>
                            <ul className='mt-[40px]'>
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <div className='flex justify-between'>
                                            <li className='text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[600]'>
                                                {item.label}
                                            </li>
                                            <li className='text-[16px] dark:text-white text-customblackbg font-[600]'>
                                                {item.value}
                                            </li>
                                        </div>
                                        {index < data.length - 1 && (
                                            <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[18px]"></div>
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div>
                        <div className="panel" style={backgroundImageStyle}>
                            <div className="flex justify-between dark:text-white-light">
                                <h5 className="text-[22px] text-white font-[700]">{homeData.TotalValueLocked.TotalValueLocked}</h5>

                            </div>
                            <div className=" flex item-center gap-[10px]  pt-[30px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                    <path opacity="0.35" d="M60 70H20C14.4767 70 10 65.5233 10 60V20H60C65.5233 20 70 24.4767 70 30V60C70 65.5233 65.5233 70 60 70Z" fill="white" />
                                    <path d="M58.3334 50C61.0948 50 63.3334 47.7614 63.3334 45C63.3334 42.2386 61.0948 40 58.3334 40C55.572 40 53.3334 42.2386 53.3334 45C53.3334 47.7614 55.572 50 58.3334 50Z" fill="white" />
                                    <path d="M10 20C10 14.4767 14.4767 10 20 10H50C55.5233 10 60 14.4767 60 20H10Z" fill="white" />
                                </svg>
                                <div className="my-4">
                                    <p className="text-[34px] text-white font-[700]">{homeData.TotalValueLocked.TVL}</p>
                                    <p className="text-[18px] text-white font-[600] pt-[10px]">{homeData.TotalValueLocked.AcrossAllFarmsAndPools}</p>
                                </div>
                            </div>
                        </div>


                        <div className="panel mt-[30px]" style={backgroundLotryImageStyle}>
                            <div className="flex justify-between dark:text-white-light">
                                <h5 className="text-[22px] text-customblackbg font-[700]">{homeData.LotteryWinningNumbers}</h5>

                            </div>
                            <div className=" flex flex-wrap item-center gap-[15px]  pt-[30px]">
                                <div className='bg-white py-[12px] px-[34px] rounded-[40px]'>
                                    5
                                </div>
                                <div className='bg-white py-[12px] px-[34px] rounded-[40px]'>
                                    3
                                </div>
                                <div className='bg-white py-[12px] px-[34px] rounded-[40px]'>
                                    8
                                </div>
                                <div className='bg-white py-[12px] px-[34px] rounded-[40px]'>
                                    2
                                </div>

                            </div>
                            <div className='flex items-center gap-[10px]  pt-[16px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5.20829 2.08334C3.94454 2.08334 2.91663 3.11126 2.91663 4.37501V15.625C2.91663 16.8888 3.94454 17.9167 5.20829 17.9167H10.2083C11.472 17.9167 12.5 16.8888 12.5 15.625V10.625H6.45829C6.11288 10.625 5.83329 10.3454 5.83329 10C5.83329 9.65459 6.11288 9.37501 6.45829 9.37501H12.5V4.37501C12.5 3.11126 11.472 2.08334 10.2083 2.08334H5.20829ZM12.5 9.37501V10.625H15.7828L13.9331 12.4748C13.8731 12.5324 13.8252 12.6014 13.7922 12.6777C13.7592 12.754 13.7418 12.8362 13.7409 12.9193C13.7401 13.0025 13.7559 13.0849 13.7873 13.1619C13.8187 13.2389 13.8652 13.3089 13.924 13.3676C13.9828 13.4264 14.0527 13.4729 14.1297 13.5044C14.2067 13.5358 14.2892 13.5515 14.3723 13.5507C14.4555 13.5498 14.5376 13.5324 14.614 13.4994C14.6903 13.4664 14.7593 13.4186 14.8169 13.3586L17.7335 10.4419C17.8507 10.3247 17.9165 10.1657 17.9165 10C17.9165 9.83428 17.8507 9.67533 17.7335 9.55812L14.8169 6.64145C14.7586 6.58145 14.6889 6.53376 14.6119 6.50119C14.5348 6.46862 14.4521 6.45184 14.3684 6.45183C14.2441 6.45186 14.1225 6.489 14.0194 6.5585C13.9162 6.628 13.8361 6.72669 13.7894 6.84195C13.7426 6.95722 13.7313 7.08381 13.7569 7.20553C13.7825 7.32725 13.8438 7.43857 13.9331 7.52524L15.7828 9.37501H12.5Z" fill="#636E72" />
                                </svg>
                                <p className="text-[16px] text-custommediumgraybg font-[600]">{homeData.ExportNumbers}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid xl:grid-cols-1 gap-6">
                <div className="panel xl:col-span-2">
                    <div className='flex items-center justify-between px-4'>
                        <h5 className="text-[22px] dark:text-white text-customblackbg font-[700]">{homeData.Announcements.Announcements}</h5>
                        <div className='flex items-center gap-[5px] cursor-pointer'>
                            <p className="text-[18px] text-customlightgraybg font-[600] cursor-pointer">{homeData.Announcements.ViewAll}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3.83334 10.8333H13.1551L10.4109 13.5775C10.0855 13.9029 10.0855 14.4304 10.4109 14.7558C10.5738 14.9187 10.7867 15 11.0001 15C11.2134 15 11.4263 14.9187 11.5893 14.7558L15.756 10.5891C15.9122 10.4333 16.0001 10.2212 16.0001 9.99995C16.0001 9.7787 15.9122 9.56703 15.756 9.41078L11.5893 5.24407C11.2638 4.91864 10.7363 4.91864 10.4109 5.24407C10.0855 5.56949 10.0855 6.09699 10.4109 6.42241L13.1551 9.16661H3.83334C3.37334 9.16661 3 9.53994 3 9.99995C3 10.46 3.37334 10.8333 3.83334 10.8333Z" fill="#B2BEC3" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-wrap min-lg:flex-col xl:flex w-[100%] ">
                        {cardData.map((card, index) => (
                            <div key={index} className="w-full md:w-1/2 lg:w-[100%] xl:w-1/4 px-3">
                                <div className="rounded-[18px] mt-10 dark:bg-[#2F3334] bg-[rgba(178, 190, 195, 0.25)] border border-solid border-customgray py-[25px] px-[30px] overflow-hidden ">
                                    <img
                                        className="w-full rounded-[15px] h-[160px] object-cover object-center"
                                        src={card.image}
                                        alt={card.title}
                                    />
                                    <div className="mt-5">
                                        <h3 className="text-[16px] dark:text-white text-customblackbg font-[600] mb-[12px]">{card.title}</h3>
                                        <p className="text-[15px] dark:customlightgraybg text-custommediumgraybg font-[400]">{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>


                <p className="text-[16px] text-customblackbg font-[600] px-1 leading-normal tracking-[0.08px]">COPYRIGHT ©2024 PizzaSwap, All Rights Reserved</p>
            </div>
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

export default Home;
