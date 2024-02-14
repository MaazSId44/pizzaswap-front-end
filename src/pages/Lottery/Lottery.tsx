import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useRef, useState } from 'react';
import person from '../../assets/Images/lotteryBg.png';
import { LoteryData, homeData } from '../../components/Constants/Constant';
import bgslice from "../../../public/assets/images/pizzaslice.png"
import CountdownTimer from '../../components/Reuseable/CountdownTimer ';
import CustomDialog from '../../components/Reuseable/ConnectToWalletModal';
import connect1 from '../../../public/assets/images/connect1.png';
import connect2 from '../../../public/assets/images/connect2.png';
import connect3 from '../../../public/assets/images/connect3.png';
import connect4 from '../../../public/assets/images/connect4.png';
import connect5 from '../../../public/assets/images/connect5.png';
import connect6 from '../../../public/assets/images/connect6.png';
import connect7 from '../../../public/assets/images/connect7.png';
import img2 from '../../../public/assets/images/img2.png';
import WalletButton from '../../components/Reuseable/WalletButton';
import { FaArrowRight } from "react-icons/fa";
const Lottery = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Lottery'));
        // GetUserDetail()
    }, []);

    const backgroundLotryImageStyle = {
        backgroundImage: `url("${person}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 50,
        width: '100%',
        borderRadius: 30,
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
    const navItems = [
        { title: 'Next Draw', value: 'Swap content goes here' },
        { title: 'Past Draws', value: 'Liquidity content goes here' },
    ];

    const handleTabClick = (title: string) => {
        setActiveTab(title);
        if (title == 'Next Draw') {
            setMainTitle('Exchange');
        } else if (title == 'Past Draws') {
            setMainTitle('Past Draws');
        }
    };
    const [activeTab, setActiveTab] = useState('Next Draw');
    const [mainTitle, setMainTitle] = useState('Exchange');
    const [settingModal, setSettingModal] = useState<any>(false);
    const [recentTransactions, setRecentTransactions] = useState<any>(false);
    const [tokenModal, setTokenModal] = useState<any>(false);
    const [connectWallet, setConnectWallet] = useState<any>(false);
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Set the initial time values based on your requirements

    useEffect(() => {
        const interval = setInterval(() => {
            // Decrease the seconds
            setTime((prevTime) => {
                const newTime = { ...prevTime };
                if (newTime.seconds > 0) {
                    newTime.seconds -= 1;
                } else {
                    // Decrease the minutes
                    if (newTime.minutes > 0) {
                        newTime.minutes -= 1;
                        newTime.seconds = 59;
                    } else {
                        // Decrease the hours
                        if (newTime.hours > 0) {
                            newTime.hours -= 1;
                            newTime.minutes = 59;
                            newTime.seconds = 59;
                        } else {
                            // Timer has reached 0, you can clear the interval here if needed
                            clearInterval(interval);
                        }
                    }
                }
                return newTime;
            });
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this useEffect runs once on mount

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const theme = localStorage.getItem('theme');

    return (
        <div>
            <div className="pt-[60px]" style={backgroundLotryImageStyle}>
                <div className='flex justify-center'>
                    <div>
                        <p className="text-[38px] text-white font-[500] mt-[5px] text-center leading-normal">{LoteryData.loteryupsidetitle}</p>
                        <p className="text-[16px] text-customlightgraybg font-[500] text-center leading-normal">{LoteryData.loteryupsidedowntext}</p>
                        <div className="flex items-center flex-wrap justify-center gap-[120px] max-sm:gap-0  pt-[80px]">
                            <div>
                                <CountdownTimer hours={3} minutes={38} seconds={19} label="Until Ticket Sale" />
                            </div>

                            <div>
                                <CountdownTimer hours={0} minutes={38} seconds={0} label="Until Lottery Draw" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[100%]">
                <div className="flex items-center justify-center w-full max-sm:mt-[20px]">
                    <div className="flex flex-1 min-[425px]:flex-col  items-center justify-between max-lg:rounded-[20px]  max-sm:flex-col md:flex-row  gap-y-2 lg:w-[70%] md:mt-[30px] xl:max-w-fit rounded-[50px]  py-[20px] px-[12px]  bg-white dark:bg-[#1A1E1F] dark:border-[#636E72] border-[1px] border-[solid] ">
                        {navItems.map((item) => (
                            <div
                                key={item.title}
                                className={`py-[12px] px-[34px] mx-[8px] cursor-pointer text-center w-[100%] xl:w-[228px] text-[18px] font-[500]  ${activeTab === item.title ? 'bg-custombluebg text-white' : 'bg-customgraybg dark:bg-custommediumgraybg text-custommediumgraybg dark:text-white '
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
                    <div className=" h-full w-[45%] max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:max-w-[60%] ">
                        <div>
                            {activeTab === 'Next Draw' && (
                                <>
                                    <div className="flex gap-[40px] max-md:flex-col  ">
                                        <div className="panel w-[50%] max-md:w-[100%] dark:border-[#b2bec340] dark:border-[1px]  dark:border-solid">
                                            <div className=" flex flex-wrap items-center justify-between">
                                                <div className="p-[8px] bg-custombluebg rounded-[40px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none">
                                                        <g clipPath="url(#clip0_94_12424)">
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
                                            </div>

                                            <div className="flex justify-between mt-[18px]">
                                                <div className="text-[22px] font-[600] text-[#636E72] ">{LoteryData.lotterycardtittle}</div>
                                                <div className="text-[22px] font-[600] text-[#2D3436] dark:text-[#fff]">{LoteryData.totalpotpoint}</div>
                                            </div>

                                            <div className="flex justify-between mt-[22px]">
                                                <div className="text-[18px] font-[500] text-[#2B70FA]">{LoteryData.nomatched}</div>
                                                <div className="text-[18px] font-[500] text-[#2B70FA]">{LoteryData.pizepot}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex justify-between mt-[18px]">
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.match1}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.pot1}</div>
                                                </div>
                                                <div className="flex justify-between mt-[18px]">
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.match2}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.pot2}</div>
                                                </div>
                                                <div className="flex justify-between mt-[18px]">
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.match3}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.pot3}</div>
                                                </div>
                                            </div>

                                            <div className="border-b border-solid border-customlightgraybg opacity-[0.25] my-[43px]"></div>

                                            <div className="flex justify-between">
                                                <div className="text-[20px] font-[500] text-[#636E72] dark:text-[#B2BEC3]">{LoteryData.burn}</div>
                                                <div className="text-[20px] font-[500] text-[#636E72] dark:text-[#B2BEC3]">{LoteryData.burnpoint}</div>
                                            </div>
                                        </div>

                                        <div className="panel flex flex-col items-center w-[50%] max-md:w-[100%] dark:border-[#b2bec340] dark:border-[1px]  dark:border-solid">
                                            <div className="w-[60%] mb-4">
                                                <img src={img2} className="w-[100%]" alt="img2" />
                                            </div>
                                            <div className="text-[22px] font-[600] my-[15px] text-center text-[#636E72] dark:text-[#B2BEC3]">
                                                {LoteryData.unlock}
                                                </div>
                                            <div className='mt-[5px] w-full'>
                                                <WalletButton onClick={() => setConnectWallet(true)} buttonText="Unlock Wallet" />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="panel dark:border-[#b2bec340] dark:border-[1px]  dark:border-solid  mt-[30px] flex max-sm:flex-col md:flex-col lg:flex-row gap-y-4 gap-x-6">
                                        <div className="w-[45%] max-sm:w-[100%] md:w-[100%] lg:w-[45%]">
                                            <div className="flex justify-between dark:text-white-light">
                                                <h5 className="text-[22px] text-[#1A1E1F] dark:text-[#fff] font-[600] text-[Urbanist]">{homeData.LotteryWinningNumbers}</h5>
                                            </div>
                                            <div className=" flex flex-wrap item-center gap-[15px]  pt-[30px]">
                                                <div className="bg-[#F0F3F5] dark:bg-[#636E72] text-[#2D3436] dark:text-[#fff] py-[12px] px-[34px] rounded-[40px] text-[22px] font-[500]">5</div>
                                                <div className="bg-[#F0F3F5] dark:bg-[#636E72] text-[#2D3436] dark:text-[#fff] py-[12px] px-[34px] rounded-[40px] text-[22px] font-[500]">3</div>
                                                <div className="bg-[#F0F3F5] dark:bg-[#636E72] text-[#2D3436] dark:text-[#fff] py-[12px] px-[34px] rounded-[40px] text-[22px] font-[500]">8</div>
                                                <div className="bg-[#F0F3F5] dark:bg-[#636E72] text-[#2D3436] dark:text-[#fff] py-[12px] px-[34px] rounded-[40px] text-[22px] font-[500]">2</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="border-s max-sm:w-[100%] max-sm:border-b md:border-b md:w-[100%] lg:border-s  h-full border-solid border-customlightgraybg opacity-[0.25] "></div>
                                        </div>
                                        <div className="w-[49%] mx-auto max-sm:w-[100%] md:w-[100%] lg:w-[49%]">
                                            <div className="flex justify-between">
                                                <div className="text-[#636E72] text-[16px] font-[500]">{LoteryData.ticket1}</div>
                                                <div className="text-[#2D3436] dark:text-[#fff] text-[16px] font-[500]">{LoteryData.ticket1no}</div>
                                            </div>
                                            <div className="flex justify-between my-[10px]">
                                                <div className="text-[#636E72] text-[16px] font-[500]">{LoteryData.ticket2}</div>
                                                <div className="text-[#2D3436] dark:text-[#fff] text-[16px] font-[500]">{LoteryData.ticket2no}</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="text-[#636E72] text-[16px] font-[500]">{LoteryData.ticket3}</div>
                                                <div className="text-[#2D3436] dark:text-[#fff] text-[16px] font-[500]">{LoteryData.ticket3no}</div>
                                            </div>
                                            <div className="flex items-center gap-[10px] pt-[16px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3.20768 0.083374C1.94393 0.083374 0.916016 1.11129 0.916016 2.37504V13.625C0.916016 14.8888 1.94393 15.9167 3.20768 15.9167H8.20768C9.47143 15.9167 10.4993 14.8888 10.4993 13.625V8.62504H4.45768C4.11227 8.62504 3.83268 8.34546 3.83268 8.00004C3.83268 7.65462 4.11227 7.37504 4.45768 7.37504H10.4993V2.37504C10.4993 1.11129 9.47143 0.083374 8.20768 0.083374H3.20768ZM10.4993 7.37504V8.62504H13.7822L11.9325 10.4748C11.8725 10.5324 11.8246 10.6014 11.7916 10.6777C11.7586 10.754 11.7412 10.8362 11.7403 10.9193C11.7395 11.0025 11.7552 11.085 11.7867 11.162C11.8181 11.2389 11.8646 11.3089 11.9234 11.3677C11.9822 11.4265 12.0521 11.473 12.1291 11.5044C12.2061 11.5358 12.2886 11.5516 12.3717 11.5507C12.4549 11.5499 12.537 11.5325 12.6133 11.4995C12.6897 11.4665 12.7587 11.4186 12.8162 11.3586L15.7329 8.44193C15.8501 8.32472 15.9159 8.16577 15.9159 8.00004C15.9159 7.83431 15.8501 7.67536 15.7329 7.55815L12.8162 4.64148C12.758 4.58149 12.6883 4.53379 12.6113 4.50122C12.5342 4.46865 12.4515 4.45187 12.3678 4.45186C12.2435 4.45189 12.1219 4.48903 12.0187 4.55853C11.9156 4.62803 11.8355 4.72672 11.7888 4.84198C11.742 4.95725 11.7307 5.08384 11.7563 5.20556C11.7819 5.32728 11.8432 5.4386 11.9325 5.52527L13.7822 7.37504H10.4993Z" fill="#2B70FA" />
                                                </svg>
                                                <p className="text-[16px] font-[500] text-custombluebg font-[600] text-[Urbanist]">{homeData.ExportNumbers}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-[40px]'>
                                        <p className='m-0 text-[#2D3436] dark:text-[#FFFFFF] text-[22px] font-[600]'>How It Works?</p>
                                        <p className='m-0 mt-[12px] text-[#2D3436] dark:text-[#FFFFFF] text-[16px] font-[400]'>Spend EBITEMPURA to buy tickets, contributing to the lottery pot. Win prizes if 2, 3, or 4 of <br /> your ticket numbers match the winning numbers and their exact order!</p>

                                        <div className='flex items-center  gap-[7px] mt-[12px]'>
                                            <div>
                                                <p className='m-0  text-[#B2BEC3] font-[600] text-[18px]'>
                                                    Read More
                                                </p>
                                            </div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                                                    <path d="M0.833342 5.83329H10.1551L7.41091 8.57748C7.08549 8.9029 7.08549 9.43041 7.41091 9.75583C7.57382 9.91875 7.78674 10 8.00008 10C8.21341 10 8.42633 9.91875 8.58925 9.75583L12.756 5.58912C12.9122 5.43329 13.0001 5.2212 13.0001 4.99995C13.0001 4.7787 12.9122 4.56703 12.756 4.41078L8.58925 0.244065C8.26383 -0.081355 7.73633 -0.081355 7.41091 0.244065C7.08549 0.569485 7.08549 1.09699 7.41091 1.42241L10.1551 4.16661H0.833342C0.373337 4.16661 0 4.53994 0 4.99995C0 5.45995 0.373337 5.83329 0.833342 5.83329Z" fill="#B2BEC3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'Past Draws' && (
                                <>
                                    <div className='py-[25px] w-[100%]'>
                                        <div className='w-[100%] relative'>
                                            <input type="text" className='bg-[#FFFFFF] dark:bg-[#1A1E1F] w-[100%] py-[28px] rounded-[50px] ps-[35px] pe-[122px] placeholder-customlightgraybg text-customblackbg dark:text-white outline-none text-[16px]  font-[500] dark:border-[#b2bec340] dark:border-[1px]  dark:border-solid' placeholder='Search Lottery Number' />
                                            <button className='text-[16px] bg-[#2B70FA] rounded-[35px] text-[#ffffff] py-[10px] px-[20px] absolute right-[3%] top-[25%]'>Search</button>
                                        </div>
                                    </div>
                                    <div className="flex gap-[40px] max-sm:flex-col md:flex-col lg:flex-row ">
                                        <div className="panel gap-y-4 w-[50%] max-sm:w-[100%] md:w-[100%] lg:w-[50%] dark:border-[#b2bec340] dark:border-[1px]  dark:border-solid">
                                            <div className="flex  items-center justify-between">
                                                <div className="text-[22px] text-[#636E72] dark:text-[#B2BEC3] font-[600]">{LoteryData.round1}</div>
                                                <div className="text-[16px] text-[#636E72] dark:text-[#B2BEC3] font-[400]">{LoteryData.round1time}</div>
                                            </div>
                                            <div className="flex mt-[20px]">
                                                <div className="p-[8px] bg-custombluebg rounded-[40px] w-fit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none">
                                                        <g clipPath="url(#clip0_94_12424)">
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
                                                <div className="ms-[10px]">
                                                    <div className="text-[14px] font-[500] dark:text-[#B2BEC3] text-[#636E72]">{LoteryData.totalprize}</div>
                                                    <div className="text-[22px] font-[600] text-[#2D3436] dark:text-[#fff] mt-[5px]">{LoteryData.prizepoint}</div>
                                                </div>
                                            </div>
                                            <div className="flex mt-[28px] ">
                                                <div className="w-fit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                                        <path
                                                            d="M17.1849 4.16669C15.1745 4.16669 13.5391 5.8021 13.5391 7.81252V20.8334H16.6641V10.4167C18.3932 10.4167 19.7891 9.02085 19.7891 7.29169H30.2057C30.2057 9.02085 31.6016 10.4167 33.3307 10.4167V20.8334H36.4557V7.81252C36.4557 5.8021 34.8203 4.16669 32.8099 4.16669H17.1849ZM24.9974 9.37502C24.4449 9.37502 23.915 9.59451 23.5243 9.98521C23.1336 10.3759 22.9141 10.9058 22.9141 11.4584C22.9141 12.0109 23.1336 12.5408 23.5243 12.9315C23.915 13.3222 24.4449 13.5417 24.9974 13.5417C25.5499 13.5417 26.0798 13.3222 26.4705 12.9315C26.8612 12.5408 27.0807 12.0109 27.0807 11.4584C27.0807 10.9058 26.8612 10.3759 26.4705 9.98521C26.0798 9.59451 25.5499 9.37502 24.9974 9.37502ZM24.9974 17.7084C22.5745 17.7084 20.4746 18.9813 19.4391 20.8334H30.5557C29.5203 18.9813 27.4203 17.7084 24.9974 17.7084ZM6.76824 18.75C5.23595 18.75 3.89469 19.3169 2.88844 20.3919C1.54678 21.8242 0.874396 24.1111 1.04315 26.6642C1.44523 32.7965 8.45573 38.3774 15.8401 38.5274C17.113 39.2649 18.5847 39.795 20.2306 40.1408C23.2764 40.6585 26.8616 40.6567 29.6157 40.1734C31.323 39.8286 32.8433 39.2858 34.1547 38.5254C41.5391 38.3754 48.5496 32.7955 48.9517 26.6642C49.1183 24.1111 48.448 21.8242 47.1064 20.3919C46.1001 19.3179 44.7578 18.75 43.2266 18.75C39.6589 18.75 37.8833 20.7438 37.5645 22.9167H36.4557H33.3307H31.2189H18.7759H16.6641H13.5391H12.4303C12.1115 20.7438 10.3349 18.75 6.76824 18.75ZM6.76824 21.875C7.95678 21.875 9.37241 22.1797 9.37241 23.6328C9.37241 24.2839 8.5547 25 7.80991 25C6.94741 25 6.24741 25.699 6.24741 26.5625C6.24741 27.4261 6.94741 28.125 7.80991 28.125C8.42449 28.125 9.01976 27.9951 9.56976 27.7669C9.89267 30.4763 10.6361 32.7609 11.7955 34.6171C7.7278 33.14 4.38084 29.8244 4.16001 26.4588C4.05167 24.814 4.43891 23.3093 5.16912 22.5281C5.58058 22.0885 6.10366 21.875 6.76824 21.875ZM43.2266 21.875C43.8901 21.875 44.4122 22.0885 44.8237 22.5281C45.5539 23.3083 45.9421 24.815 45.8348 26.4608C45.614 29.8254 42.267 33.14 38.1993 34.6171C39.3597 32.7609 40.1032 30.4763 40.4251 27.7669C40.9751 27.9951 41.5703 28.125 42.1849 28.125C43.0474 28.125 43.7474 27.4261 43.7474 26.5625C43.7474 25.699 43.0474 25 42.1849 25C41.4401 25 40.6224 24.2839 40.6224 23.6328C40.6224 22.1797 42.038 21.875 43.2266 21.875ZM21.1909 42.3788L21.3414 43.75H18.2266C17.3641 43.75 16.6641 44.449 16.6641 45.3125C16.6641 46.1761 17.3641 46.875 18.2266 46.875H31.7682C32.6307 46.875 33.3307 46.1761 33.3307 45.3125C33.3307 44.449 32.6307 43.75 31.7682 43.75H28.6534L28.804 42.393C27.6238 42.5388 26.3622 42.6188 25.0747 42.6188C23.7747 42.6188 22.4617 42.5329 21.1909 42.3788Z"
                                                            fill="#2B70FA"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="ms-[10px]">
                                                    <div className="text-[14px] font-[500] dark:text-[#B2BEC3] text-[#636E72]">{LoteryData.winningno}</div>
                                                    <div className="text-[22px] font-[600] text-[#2D3436] dark:text-[#fff] mt-[5px] ">{LoteryData.winningnos}</div>
                                                </div>
                                            </div>
                                            <div className="border-b border-t border-solid border-customlightgraybg  my-[43px]">
                                                <div className=" flex justify-between mt-[30px] mb-[18px]">
                                                    <div className="text-[18px] font-[500] text-[#2B70FA] dark:text-[#2B70FA] ">{LoteryData.head1}</div>
                                                    <div className="text-[18px] font-[500] text-[#2B70FA] dark:text-[#2B70FA] ">{LoteryData.head2}</div>
                                                    <div className="text-[18px] font-[500] text-[#2B70FA] dark:text-[#2B70FA] ">{LoteryData.head3}</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r1c1}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r1c2}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r1c3}</div>
                                                </div>
                                                <div className="flex justify-between my-[18px]">
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r2c1}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r2c2}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r2c3}</div>
                                                </div>
                                                <div className="flex justify-between mb-[30px]">
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r3c1}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r3c2}</div>
                                                    <div className="text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3] ">{LoteryData.r3c3}</div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between">
                                                <div className="text-[20px] font-[500] text-[#636E72] dark:text-[#B2BEC3]">{LoteryData.toburn}</div>
                                                <div className="text-[20px] font-[500] text-[#636E72] dark:text-[#B2BEC3]">{LoteryData.burnpoints}</div>
                                            </div>

                                            <div className='mt-[30px]  w-full'>
                                                <WalletButton onClick={() => setConnectWallet(true)} buttonText="Unlock Wallet" />
                                            </div>

                                        </div>

                                        <div className="panel dark:border-[#b2bec340] dark:border-[1px]  dark:border-solid w-[50%] max-sm:w-[100%] md:w-[100%] lg:w-[50%]">
                                            <div className="text-[22px] font-[600] text-[#636E72] dark:text-[#B2BEC3]">{LoteryData.historycardtittle}</div>
                                            <div className="flex justify-center items-center mt-[100px]">
                                                <img src={bgslice} className='' alt=".." />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <CustomDialog
                                isOpen={connectWallet}
                                onClose={() => setConnectWallet(false)}
                                itemsConnect={itemsConnect}
                                theme={theme}
                                setConnectWallet={setConnectWallet}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lottery;
