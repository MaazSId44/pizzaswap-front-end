import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';

import avatar from '../../public/assets/images/avatar.png';
import connect from '../../public/assets/images/connectImage.svg';
import { homeData } from '../components/Constants/Constant'

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Home'));
    });

    const date = new Date();
    const month = date.getMonth();
    const data = [
        { label: homeData.PizzaSwapStats.MarketCap, value: homeData.PizzaSwapStats.amount },
        { label: homeData.PizzaSwapStats.TotalMinted, value: homeData.PizzaSwapStats.amount2 },
        { label: homeData.PizzaSwapStats.TotalBurned, value: homeData.PizzaSwapStats.amount3 },
        { label: homeData.PizzaSwapStats.Supply, value: homeData.PizzaSwapStats.amount4 },
        { label: homeData.PizzaSwapStats.MarketCap, value: homeData.PizzaSwapStats.amount },
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
        backgroundImage: 'url("../../public/assets/images/lotry.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    // const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    // const [loading] = useState(false);

    return (
        <div>
            <div className="flex items-center gap-[10px] pb-[21px]">
                <img src={avatar} alt="avatar" />
                <div className="mt-[10px]">
                    <h1 className="text-[28px] dark:text-white text-customblackbg font-[700] text-[Poppins] ">{homeData.WelcomeMessage}</h1>
                    <p className="text-[16px] dark:text-customlightgraybg text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">{homeData.StatusAndAnalytics}</p>
                </div>
            </div>
            
            <div className="pt-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[40px] mb-[40px]">
                    <div className="panel h-full">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="text-[22px] dark:text-white text-customblackbg font-[700] text-[Urbanist]">{homeData.FarmsAndStaking}</h5>
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-[18px] text-[#e95f2b]">
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
                                <div className="rounded-[40px] cursor-pointer bg-custombluebg py-[12px] px-[34px] ">
                                    <div className="text-[16px] text-white font-[500] text-[Urbanist]">{homeData.BuyPizzaSwap}</div>
                                </div>
                                <div className="flex gap-[10px] rounded-[40px] cursor-pointer   bg-custombluebg py-[12px] px-[34px]">
                                    <div className="text-[16px] text-white font-[500] text-[Urbanist]">{homeData.Connect} </div>
                                    <img src={connect} alt='connect' />
                                </div>
                            </div>
                            <div className='pt-[40px]'>
                                <div>
                                    <div className="flex justify-between">
                                        <h2 className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500] text-[Urbanist]">{homeData.PizzaSwapToHarvest}</h2>
                                        <p className="text-[16px] text-customred font-[500] text-[Urbanist]">{homeData.Locked}</p>
                                    </div>
                                    <h1 className="text-[22px] dark:text-white text-customblackbg font-[600] text-[Urbanist] pt-[10px]">{homeData.Wallet1}</h1>
                                </div>

                                <div className="pt-[28px]">
                                    <div className="flex justify-between">
                                        <h2 className="text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[500] text-[Urbanist]">{homeData.PizzaSwapInWallet}</h2>
                                        <p className="text-[16px] text-customred font-[500] text-[Urbanist]">{homeData.Locked}</p>
                                    </div>
                                    <h1 className="text-[22px] dark:text-white text-customblackbg font-[600] text-[Urbanist] pt-[10px]">{homeData.WalletBalance}</h1>
                                </div>
                            </div>

                            <div className="flex mt-[40px] items-center justify-center gap-[10px] rounded-[40px] cursor-pointer bg-custombluebg py-[22px] px-[34px] ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M3.95833 1.66666C2.70009 1.66666 1.66666 2.70009 1.66666 3.95832V6.87499C1.66549 6.95781 1.68079 7.04004 1.71167 7.11689C1.74256 7.19375 1.78841 7.2637 1.84656 7.32268C1.90471 7.38166 1.97401 7.4285 2.05042 7.46046C2.12683 7.49243 2.20883 7.50889 2.29166 7.50889C2.37449 7.50889 2.45649 7.49243 2.5329 7.46046C2.60931 7.4285 2.67861 7.38166 2.73676 7.32268C2.79491 7.2637 2.84076 7.19375 2.87165 7.11689C2.90253 7.04004 2.91783 6.95781 2.91666 6.87499V3.95832C2.91666 3.37573 3.37573 2.91666 3.95833 2.91666H6.87499C6.95781 2.91783 7.04004 2.90253 7.1169 2.87164C7.19375 2.84076 7.2637 2.79491 7.32268 2.73676C7.38166 2.67861 7.4285 2.60931 7.46047 2.5329C7.49243 2.45649 7.5089 2.37449 7.5089 2.29166C7.5089 2.20883 7.49243 2.12683 7.46047 2.05042C7.4285 1.97401 7.38166 1.90471 7.32268 1.84656C7.2637 1.78841 7.19375 1.74255 7.1169 1.71167C7.04004 1.68079 6.95781 1.66549 6.87499 1.66666H3.95833ZM13.125 1.66666C13.0422 1.66549 12.9599 1.68079 12.8831 1.71167C12.8062 1.74255 12.7363 1.78841 12.6773 1.84656C12.6183 1.90471 12.5715 1.97401 12.5395 2.05042C12.5076 2.12683 12.4911 2.20883 12.4911 2.29166C12.4911 2.37449 12.5076 2.45649 12.5395 2.5329C12.5715 2.60931 12.6183 2.67861 12.6773 2.73676C12.7363 2.79491 12.8062 2.84076 12.8831 2.87164C12.9599 2.90253 13.0422 2.91783 13.125 2.91666H16.0417C16.6243 2.91666 17.0833 3.37573 17.0833 3.95832V6.87499C17.0822 6.95781 17.0975 7.04004 17.1283 7.11689C17.1592 7.19375 17.2051 7.2637 17.2632 7.32268C17.3214 7.38166 17.3907 7.4285 17.4671 7.46046C17.5435 7.49243 17.6255 7.50889 17.7083 7.50889C17.7912 7.50889 17.8732 7.49243 17.9496 7.46046C18.026 7.4285 18.0953 7.38166 18.1534 7.32268C18.2116 7.2637 18.2574 7.19375 18.2883 7.11689C18.3192 7.04004 18.3345 6.95781 18.3333 6.87499V3.95832C18.3333 2.70009 17.2999 1.66666 16.0417 1.66666H13.125ZM9.99999 4.16666C9.08241 4.16666 8.21159 4.3887 7.44465 4.78108C7.3698 4.81741 7.30295 4.86833 7.24803 4.93083C7.1931 4.99334 7.15122 5.06619 7.12482 5.1451C7.09842 5.22401 7.08804 5.3074 7.09429 5.39037C7.10055 5.47335 7.1233 5.55424 7.16123 5.6283C7.19915 5.70236 7.25148 5.76811 7.31515 5.82168C7.37882 5.87525 7.45255 5.91558 7.53201 5.94028C7.61146 5.96499 7.69505 5.97358 7.77787 5.96555C7.86069 5.95753 7.94108 5.93305 8.01432 5.89355C8.61071 5.58842 9.28341 5.41666 9.99999 5.41666C12.4181 5.41666 14.375 7.37354 14.375 9.79166V13.5417C14.3738 13.6245 14.3891 13.7067 14.42 13.7836C14.4509 13.8604 14.4967 13.9304 14.5549 13.9893C14.613 14.0483 14.6823 14.0952 14.7588 14.1271C14.8352 14.1591 14.9172 14.1756 15 14.1756C15.0828 14.1756 15.1648 14.1591 15.2412 14.1271C15.3176 14.0952 15.3869 14.0483 15.4451 13.9893C15.5032 13.9304 15.5491 13.8604 15.58 13.7836C15.6109 13.7067 15.6262 13.6245 15.625 13.5417V9.79166C15.625 6.69561 13.096 4.16666 9.99999 4.16666ZM5.95214 6.24267C5.85055 6.24168 5.75024 6.26547 5.65991 6.31198C5.56959 6.35849 5.49196 6.42632 5.43375 6.50959C4.76848 7.433 4.37499 8.57038 4.37499 9.79166V13.5417C4.37382 13.6245 4.38912 13.7067 4.42001 13.7836C4.45089 13.8604 4.49674 13.9304 4.55489 13.9893C4.61305 14.0483 4.68234 14.0952 4.75875 14.1271C4.83516 14.1591 4.91717 14.1756 4.99999 14.1756C5.08282 14.1756 5.16482 14.1591 5.24123 14.1271C5.31765 14.0952 5.38694 14.0483 5.44509 13.9893C5.50325 13.9304 5.5491 13.8604 5.57998 13.7836C5.61086 13.7067 5.62616 13.6245 5.62499 13.5417V9.79166C5.62499 8.83794 5.92968 7.95948 6.44775 7.24039C6.5165 7.14782 6.5583 7.03804 6.56854 6.92319C6.57878 6.80834 6.55704 6.69289 6.50575 6.58962C6.45445 6.48636 6.37559 6.39929 6.27788 6.33806C6.18018 6.27682 6.06744 6.24381 5.95214 6.24267ZM9.99999 6.66666C8.28239 6.66666 6.87499 8.07406 6.87499 9.79166V14.7917C6.87382 14.8745 6.88912 14.9567 6.92001 15.0336C6.95089 15.1104 6.99674 15.1804 7.05489 15.2393C7.11305 15.2983 7.18234 15.3452 7.25875 15.3771C7.33516 15.4091 7.41717 15.4256 7.49999 15.4256C7.58282 15.4256 7.66482 15.4091 7.74123 15.3771C7.81765 15.3452 7.88694 15.2983 7.94509 15.2393C8.00325 15.1804 8.0491 15.1104 8.07998 15.0336C8.11086 14.9567 8.12616 14.8745 8.12499 14.7917V9.79166C8.12499 8.75176 8.96009 7.91666 9.99999 7.91666C10.0526 7.91666 10.1046 7.91886 10.1554 7.92317C10.2385 7.93265 10.3226 7.92537 10.4028 7.90176C10.483 7.87815 10.5577 7.8387 10.6224 7.78573C10.687 7.73276 10.7404 7.66735 10.7794 7.59337C10.8183 7.5194 10.8421 7.43836 10.8491 7.35506C10.8562 7.27175 10.8465 7.18788 10.8206 7.10839C10.7947 7.0289 10.7531 6.95542 10.6983 6.8923C10.6434 6.82917 10.5765 6.77769 10.5015 6.74089C10.4264 6.70409 10.3447 6.68272 10.2612 6.67805C10.1746 6.6707 10.0874 6.66666 9.99999 6.66666ZM11.993 7.6953C11.8794 7.70024 11.7694 7.73605 11.6746 7.79889C11.5799 7.86172 11.5041 7.94919 11.4554 8.0519C11.4067 8.1546 11.3869 8.26865 11.3982 8.38176C11.4094 8.49487 11.4513 8.60277 11.5194 8.69384C11.744 9.00372 11.875 9.37933 11.875 9.79166V14.7917C11.8738 14.8745 11.8891 14.9567 11.92 15.0336C11.9509 15.1104 11.9967 15.1804 12.0549 15.2393C12.113 15.2983 12.1823 15.3452 12.2588 15.3771C12.3352 15.4091 12.4172 15.4256 12.5 15.4256C12.5828 15.4256 12.6648 15.4091 12.7412 15.3771C12.8176 15.3452 12.8869 15.2983 12.9451 15.2393C13.0032 15.1804 13.0491 15.1104 13.08 15.0336C13.1109 14.9567 13.1262 14.8745 13.125 14.7917V9.79166C13.125 9.11065 12.9038 8.47489 12.5309 7.9606C12.4707 7.87483 12.3899 7.80558 12.2959 7.75922C12.2019 7.71286 12.0977 7.69088 11.993 7.6953ZM9.99023 9.15771C9.82461 9.16029 9.66679 9.22851 9.55143 9.34738C9.43608 9.46624 9.37262 9.62604 9.37499 9.79166V11.0417C9.37382 11.1245 9.38912 11.2067 9.42001 11.2836C9.45089 11.3604 9.49674 11.4304 9.55489 11.4893C9.61305 11.5483 9.68234 11.5952 9.75875 11.6271C9.83516 11.6591 9.91717 11.6756 9.99999 11.6756C10.0828 11.6756 10.1648 11.6591 10.2412 11.6271C10.3176 11.5952 10.3869 11.5483 10.4451 11.4893C10.5032 11.4304 10.5491 11.3604 10.58 11.2836C10.6109 11.2067 10.6262 11.1245 10.625 11.0417V9.79166C10.6262 9.70801 10.6106 9.62496 10.5791 9.54745C10.5476 9.46994 10.5009 9.39954 10.4417 9.34042C10.3825 9.2813 10.312 9.23467 10.2345 9.20328C10.1569 9.1719 10.0739 9.1564 9.99023 9.15771ZM2.28189 12.491C2.11628 12.4936 1.95846 12.5618 1.8431 12.6807C1.72774 12.7996 1.66428 12.9594 1.66666 13.125V16.0417C1.66666 17.2999 2.70009 18.3333 3.95833 18.3333H6.87499C6.95781 18.3345 7.04004 18.3192 7.1169 18.2883C7.19375 18.2574 7.2637 18.2116 7.32268 18.1534C7.38166 18.0953 7.4285 18.026 7.46047 17.9496C7.49243 17.8732 7.5089 17.7912 7.5089 17.7083C7.5089 17.6255 7.49243 17.5435 7.46047 17.4671C7.4285 17.3907 7.38166 17.3214 7.32268 17.2632C7.2637 17.2051 7.19375 17.1592 7.1169 17.1283C7.04004 17.0975 6.95781 17.0822 6.87499 17.0833H3.95833C3.37573 17.0833 2.91666 16.6243 2.91666 16.0417V13.125C2.91786 13.0413 2.90225 12.9583 2.87077 12.8808C2.83928 12.8033 2.79256 12.7329 2.73336 12.6738C2.67417 12.6146 2.60371 12.568 2.52616 12.5366C2.44861 12.5052 2.36554 12.4897 2.28189 12.491ZM9.99023 12.491C9.82461 12.4936 9.66679 12.5618 9.55143 12.6807C9.43608 12.7996 9.37262 12.9594 9.37499 13.125V15.625C9.37382 15.7078 9.38912 15.79 9.42001 15.8669C9.45089 15.9437 9.49674 16.0137 9.55489 16.0727C9.61305 16.1317 9.68234 16.1785 9.75875 16.2105C9.83516 16.2424 9.91717 16.2589 9.99999 16.2589C10.0828 16.2589 10.1648 16.2424 10.2412 16.2105C10.3176 16.1785 10.3869 16.1317 10.4451 16.0727C10.5032 16.0137 10.5491 15.9437 10.58 15.8669C10.6109 15.79 10.6262 15.7078 10.625 15.625V13.125C10.6262 13.0413 10.6106 12.9583 10.5791 12.8808C10.5476 12.8033 10.5009 12.7329 10.4417 12.6738C10.3825 12.6146 10.312 12.568 10.2345 12.5366C10.1569 12.5052 10.0739 12.4897 9.99023 12.491ZM17.6986 12.491C17.5329 12.4936 17.3751 12.5618 17.2598 12.6807C17.1444 12.7996 17.081 12.9594 17.0833 13.125V16.0417C17.0833 16.6243 16.6243 17.0833 16.0417 17.0833H13.125C13.0422 17.0822 12.9599 17.0975 12.8831 17.1283C12.8062 17.1592 12.7363 17.2051 12.6773 17.2632C12.6183 17.3214 12.5715 17.3907 12.5395 17.4671C12.5076 17.5435 12.4911 17.6255 12.4911 17.7083C12.4911 17.7912 12.5076 17.8732 12.5395 17.9496C12.5715 18.026 12.6183 18.0953 12.6773 18.1534C12.7363 18.2116 12.8062 18.2574 12.8831 18.2883C12.9599 18.3192 13.0422 18.3345 13.125 18.3333H16.0417C17.2999 18.3333 18.3333 17.2999 18.3333 16.0417V13.125C18.3345 13.0413 18.3189 12.9583 18.2874 12.8808C18.256 12.8033 18.2092 12.7329 18.15 12.6738C18.0908 12.6146 18.0204 12.568 17.9428 12.5366C17.8653 12.5052 17.7822 12.4897 17.6986 12.491Z"
                                        fill="white"
                                    />
                                </svg>
                                <div className="text-[18px] text-center text-white font-[500] text-[Urbanist]">{homeData.UnlockWallet}</div>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full">
                        <div className="flex justify-between dark:text-white-light mb-5">
                            <h5 className="text-[22px] dark:text-white text-customblackbg font-[700] text-[Urbanist]">{homeData.PizzaSwapStats.Title}</h5>
                        </div>
                        <div>
                            <ul className='mt-[40px]'>
                                {data.map((item, index) => (
                                    <div key={index}>
                                        <div className='flex justify-between'>
                                            <li className='text-[16px] dark:text-customlightgraybg text-custommediumgraybg font-[600] text-[Urbanist]'>
                                                {item.label}
                                            </li>
                                            <li className='text-[16px] dark:text-white text-customblackbg font-[600] text-[Urbanist]'>
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
                                <h5 className="text-[22px] text-white font-[700] text-[Urbanist]">{homeData.TotalValueLocked.TotalValueLocked}</h5>

                            </div>
                            <div className=" flex item-center gap-[10px]  pt-[30px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                    <path opacity="0.35" d="M60 70H20C14.4767 70 10 65.5233 10 60V20H60C65.5233 20 70 24.4767 70 30V60C70 65.5233 65.5233 70 60 70Z" fill="white" />
                                    <path d="M58.3334 50C61.0948 50 63.3334 47.7614 63.3334 45C63.3334 42.2386 61.0948 40 58.3334 40C55.572 40 53.3334 42.2386 53.3334 45C53.3334 47.7614 55.572 50 58.3334 50Z" fill="white" />
                                    <path d="M10 20C10 14.4767 14.4767 10 20 10H50C55.5233 10 60 14.4767 60 20H10Z" fill="white" />
                                </svg>
                                <div className="my-4">
                                    <p className="text-[34px] text-white font-[700] text-[Urbanist]">{homeData.TotalValueLocked.TVL}</p>
                                    <p className="text-[18px] text-white font-[600] text-[Urbanist] pt-[10px]">{homeData.TotalValueLocked.AcrossAllFarmsAndPools}</p>
                                </div>
                            </div>
                        </div>


                        <div className="panel mt-[30px]" style={backgroundLotryImageStyle}>
                            <div className="flex justify-between dark:text-white-light">
                                <h5 className="text-[22px] text-customblackbg font-[700] text-[Urbanist]">{homeData.LotteryWinningNumbers}</h5>

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
                                <p className="text-[16px] text-custommediumgraybg font-[600] text-[Urbanist]">{homeData.ExportNumbers}</p>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            <div className="grid xl:grid-cols-1 gap-6">
                <div className="panel xl:col-span-2">
                    <div className='flex items-center justify-between'>
                        <h5 className="text-[22px] dark:text-white text-customblackbg font-[700] text-[Urbanist]">{homeData.Announcements.Announcements}</h5>
                        <div className='flex items-center gap-[5px] cursor-pointer'>
                            <p className="text-[18px] text-customlightgraybg font-[600] text-[Urbanist] cursor-pointer">{homeData.Announcements.ViewAll}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3.83334 10.8333H13.1551L10.4109 13.5775C10.0855 13.9029 10.0855 14.4304 10.4109 14.7558C10.5738 14.9187 10.7867 15 11.0001 15C11.2134 15 11.4263 14.9187 11.5893 14.7558L15.756 10.5891C15.9122 10.4333 16.0001 10.2212 16.0001 9.99995C16.0001 9.7787 15.9122 9.56703 15.756 9.41078L11.5893 5.24407C11.2638 4.91864 10.7363 4.91864 10.4109 5.24407C10.0855 5.56949 10.0855 6.09699 10.4109 6.42241L13.1551 9.16661H3.83334C3.37334 9.16661 3 9.53994 3 9.99995C3 10.46 3.37334 10.8333 3.83334 10.8333Z" fill="#B2BEC3" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-wrap pt-[40px]">
                        {cardData.map((card, index) => (
                            <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-3 mb-8">
                                <div className="rounded-[18px] dark:bg-[#2F3334] bg-[rgba(178, 190, 195, 0.25)] border border-solid border-customgray py-[25px] px-[30px] overflow-hidden ">
                                    <img
                                        className="w-full rounded-[15px] h-48 object-cover object-center"
                                        src={card.image}
                                        alt={card.title}
                                    />
                                    <div className="mt-5">
                                        <h3 className="text-[16px] dark:text-white text-customblackbg font-[600] text-[Urbanist] mb-[12px]">{card.title}</h3>
                                        <p className="text-[15px] dark:customlightgraybg text-custommediumgraybg font-[400] text-[Urbanist]">{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>

    );
};

export default Home;
