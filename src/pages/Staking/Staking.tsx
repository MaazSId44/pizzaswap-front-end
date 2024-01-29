import { Fragment, useRef, useState } from "react";
import main from "../../../public/assets/images/main-icon.svg";
import icon1 from "../../../public/assets/images/icon 1.svg";
import icon2 from "../../../public/assets/images/icon 2.svg";
import icon3 from "../../../public/assets/images/icon 3.svg";
import icon4 from "../../../public/assets/images/icon 4.svg";
import icon5 from "../../../public/assets/images/icon 5.svg";
import icon6 from "../../../public/assets/images/icon 6.svg";
import icon7 from "../../../public/assets/images/icon 7.svg";
import icon8 from "../../../public/assets/images/icon 8.svg";
import icon9 from "../../../public/assets/images/icon 9.svg";
import bgslice from "../../../public/assets/images/pizzaslice.png"
import connect1 from '../../../public/assets/images/connect1.png';
import connect2 from '../../../public/assets/images/connect2.png';
import connect3 from '../../../public/assets/images/connect3.png';
import connect4 from '../../../public/assets/images/connect4.png';
import connect5 from '../../../public/assets/images/connect5.png';
import connect6 from '../../../public/assets/images/connect6.png';
import connect7 from '../../../public/assets/images/connect7.png';
import { Dialog, Transition } from "@headlessui/react";
function Staking() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [visibleItems, setVisibleItems] = useState(9);
  const [connectWallet, setConnectWallet] = useState<any>(false);

  const navItems = [
    {
      title: "All",
    },
    {
      title: "PizzaSwap",
    },
    {
      title: "Partner",
    },
    {
      title: "Inactive",
    },
  ];

  const items = [

    {
      main: main,
      icon: icon2,
      contentTitle: "PizzaSwap",
      mutli: "11x",
      title: `PizzaSwap-Bitcoin`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "$50",
      tag: "PizzaSwap",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
    {
      contentTitle: "PizzaSwap",
      mutli: "11x",
      main: main,
      icon: icon1,
      title: `PizzaSwap-Anchor`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "$10",
      tag: "PizzaSwap",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
    {
      main: main,
      icon: icon6,
      contentTitle: "Partner",
      mutli: "11x",
      title: `PizzaSwap-Dash`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "$5",
      tag: "Partner",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
    {
      main: main,
      icon: icon4,
      contentTitle: "Partner",
      mutli: "13x",
      title: `PizzaSwap-Cardano`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "$5",
      tag: "Partner",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
    {
      main: main,
      icon: icon5,
      contentTitle: "Partner",
      mutli: "10x",
      title: `PizzaSwap-Cosmos`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "$5",
      tag: "Partner",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
  

    {
      main: main,
      icon: icon7,
      contentTitle: "Partner",
      mutli: "17x",
      title: `PizzaSwap-Dogecoin`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "free",
      tag: "inactive",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
    {
      main: main,
      icon: icon8,
      contentTitle: "Partner",
      mutli: "9x",
      title: `PizzaSwap-Flow`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "free",
      tag: "inactive",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
    },
    {
      main: main,
      icon: icon9,
      contentTitle: "Inactivea",
      mutli: "15x",
      title: `PizzaSwap-Ethereum Classic`,
      apr: "1.65%",
      earn: "Pizzaswap",
      deposit: "2%",
      harvest: "2 Hour(s)",
      price: "free",
      tag: "inactive",
      harvestbtn: "Harvest",
      earned: "0.000",
      stacked: "Staked",
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

  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredItems =
    selectedTab === 0
      ? items.filter(
        (item) => selectedFilter === "All" || item.tag === selectedFilter
      )
      : items.filter(
        (item) =>
          item.contentTitle === navItems[selectedTab]?.title &&
          (selectedFilter === "All" || item.tag === selectedFilter)
      );
  const remainingItems = filteredItems.slice(visibleItems, visibleItems + 4);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  return (
    <div className="">
      <div>
        <h1 className="text-[28px] dark:text-white text-customblackbg font-[700] text-[Poppins] ">Stake tokens to earn PizzaSwap</h1>
        <p className="text-[16px] dark:text-customlightgraybg text-customlightgraybg font-[500] text-[Poppins] mt-[5px]">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="flex items-center justify-center gap-[28px] max-md:flex-wrap pt-[70px]">
        <div className="flex items-center gap-3">
          <span className="ms-3 text-[18px] font-[500] m-[0px] dark:text-[#B2BEC3] text-[#2D3436] ">
            Staked Only
          </span>

          <label className="relative inline-flex items-center cursor-pointer mb-0">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute min-[425px]:after:top-[2px] max-[767px]:after:top-[2px] min-[768px]:after:top-[10px] max-[1024px]:after:top-[10px]  min-[1025px]:after:top-[2px] max-[1440px]:after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

          </label>
        </div>
        <div className="bg-[#FFF] dark:bg-[#1A1E1F] rounded-[50px]  border-[1px] p-[20px] border-solid dark:border-[#636E72] w-fit flex flex-row gap-[10px] max-sm:flex-col max-md:flex-col  flex-wrap justify-center max-sm:gap-y-[10px] max-md:gap-y-[10px]">
          {navItems.map((item, index) => (
            <button
              ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`outline-none rounded-[30px] border-2 dark:border-white border-[rgba(6, 30, 44, 0.07)]  dark:border-opacity-[0.08]  py-[12px] px-[34px] w-[228px]
             text-center text-[16px] hover:text-white hover:bg-[#2B70FA] bg-none text-[#989CAA]   dark:text-white mx-[10px]
             ${selectedTab === index
                  ? "bg-[#2B70FA] text-white border-[0px] "
                  : "dark:text-[#fff] dark:bg-[#636E72] bg-[#F0F3F5] text-'[#636E72]"
                }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      {/* flex justify-center flex-wrap  items-center   */}


      {filteredItems.length >= 1 ? (
        <>
          <div className={`${filteredItems.length === 1 ? " mx-[32%] place-content-center max-md:mx-[20%] max-lg:mx-[20%]" : "grid grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-sm:grid-cols-1"}   gap-[40px] pt-[30px] max-sm:pt-[100px] max-md:pt-[100px]  max-lg:pt-[100px]`}>
            {filteredItems.slice(0, visibleItems).map((item, index) => (
              <>
                <div className="bg-[#fff] dark:bg-[#1A1E1F]  rounded-[20px] border-[1px] border-solid border-[#B2BEC34D] p-[30px]">
                  <div className="flex gap-[10px] items-center mb-[18px]">
                    <div>
                      <img src={item.main} alt="" />
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
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
                        <p className="text-[18px] font-[600] m-[0px] dark:text-[#FFF] text-[#2D3436] ">
                          {item.title}
                        </p>
                      </div>
                      <div className="bg-[#2B70FA] rounded-[20px] px-[14px] py-[6px]">
                        <p className=" text-[16px] font-[600] m-[0px] p-[0px] text-[#FFF]">
                          {item.mutli}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[18px]">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#636E72] dark:text-[#B2BEC3]  group-hover:text-[#20D091]">
                            APR
                          </p>
                        </div>
                        <div className="flex gap-[10px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className=" cursor-pointer"
                            fill="none"
                            onClick={() => {
                              console.log("ok response");
                            }}
                          >
                            <path
                              d="M17.25 2H6.75C5.234 2 4 3.2335 4 4.75V19.25C4 20.7665 5.234 22 6.75 22H17.25C18.766 22 20 20.7665 20 19.25V4.75C20 3.2335 18.766 2 17.25 2ZM8.25 18.5C7.5595 18.5 7 17.9405 7 17.25C7 16.5595 7.5595 16 8.25 16C8.9405 16 9.5 16.5595 9.5 17.25C9.5 17.9405 8.9405 18.5 8.25 18.5ZM8.25 15C7.5595 15 7 14.4405 7 13.75C7 13.0595 7.5595 12.5 8.25 12.5C8.9405 12.5 9.5 13.0595 9.5 13.75C9.5 14.4405 8.9405 15 8.25 15ZM12 18.5C11.3095 18.5 10.75 17.9405 10.75 17.25C10.75 16.5595 11.3095 16 12 16C12.6905 16 13.25 16.5595 13.25 17.25C13.25 17.9405 12.6905 18.5 12 18.5ZM12 15C11.3095 15 10.75 14.4405 10.75 13.75C10.75 13.0595 11.3095 12.5 12 12.5C12.6905 12.5 13.25 13.0595 13.25 13.75C13.25 14.4405 12.6905 15 12 15ZM17 17.25C17 17.9405 16.4405 18.5 15.75 18.5C15.0595 18.5 14.5 17.9405 14.5 17.25C14.5 16.7735 14.5 14.2275 14.5 13.75C14.5 13.0595 15.0595 12.5 15.75 12.5C16.4405 12.5 17 13.0595 17 13.75C17 14.2275 17 16.7735 17 17.25ZM17 9.27C17 9.9485 16.448 10.5 15.7695 10.5H8.2305C7.552 10.5 7 9.948 7 9.27V6.73C7 6.0515 7.552 5.5 8.2305 5.5H15.7695C16.448 5.5 17 6.052 17 6.73V9.27Z"
                              fill="#2B70FA"
                            />
                          </svg>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">
                            {item.apr}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#636E72] dark:text-[#B2BEC3]   group-hover:text-[#20D091]">
                            Earn:
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">
                            {item.earn}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#636E72] dark:text-[#B2BEC3]   group-hover:text-[#20D091]">
                            Deposit Fee:
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">
                            {item.deposit}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#636E72] dark:text-[#B2BEC3] group-hover:text-[#20D091]">
                            Harvest Lockup:
                          </p>
                        </div>
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF] ">
                            {item.harvest}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] p-[1px] opacity-[25%] bg-[#B2BEC3]"></div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div>
                          <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500px] text-[#B2BEC3]   group-hover:text-[#20D091]">
                            PizzaSwap Earned
                          </p>
                        </div>
                        <div>
                          <p className="text-[22px] max-sm:text-[16px] max-md:text-[16px] font-[600] text-[#2D3436] dark:text-[#fff]  group-hover:text-[#20D091]">
                            {item.earned}
                          </p>
                        </div>
                      </div>

                      <div className="py-[10px]">
                        <button
                          className="text-[18px] font-[500] text-[#fff]  bg-[#2B70FA] py-[12px] px-[30px] rounded-[40px]  "
                          onClick={() => {
                            console.log("ok response harvest btn");
                          }}
                        >
                          {item.harvestbtn}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[18px]">
                      <div>
                        <p className="text-[16px] max-sm:text-[16px] max-md:text-[16px] font-[500] text-[#2D3436] dark:text-[#FFF]">
                          {item.title} {item.stacked}
                        </p>
                      </div>
                      <div className="">
                        <button onClick={() => setConnectWallet(true)} className="text-[#fff] bg-[#2B70FA] w-[100%] rounded-[40px] text-[18px] font-[500] flex justify-center items-center py-[22px] px-[34px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="me-[5px]"
                          >
                            <path
                              d="M3.95872 1.66608C2.70048 1.66608 1.66706 2.69951 1.66706 3.95774V6.87441C1.66589 6.95723 1.68119 7.03946 1.71207 7.11631C1.74295 7.19317 1.7888 7.26312 1.84696 7.3221C1.90511 7.38108 1.9744 7.42792 2.05082 7.45988C2.12723 7.49185 2.20923 7.50831 2.29206 7.50831C2.37488 7.50831 2.45689 7.49185 2.5333 7.45988C2.60971 7.42792 2.679 7.38108 2.73716 7.3221C2.79531 7.26312 2.84116 7.19317 2.87204 7.11631C2.90293 7.03946 2.91823 6.95723 2.91706 6.87441V3.95774C2.91706 3.37515 3.37613 2.91608 3.95872 2.91608H6.87539C6.95821 2.91725 7.04044 2.90195 7.11729 2.87107C7.19415 2.84018 7.2641 2.79433 7.32308 2.73618C7.38206 2.67803 7.4289 2.60873 7.46086 2.53232C7.49283 2.45591 7.50929 2.37391 7.50929 2.29108C7.50929 2.20825 7.49283 2.12625 7.46086 2.04984C7.4289 1.97343 7.38206 1.90413 7.32308 1.84598C7.2641 1.78783 7.19415 1.74197 7.11729 1.71109C7.04044 1.68021 6.95821 1.66491 6.87539 1.66608H3.95872ZM13.1254 1.66608C13.0426 1.66491 12.9603 1.68021 12.8835 1.71109C12.8066 1.74197 12.7367 1.78783 12.6777 1.84598C12.6187 1.90413 12.5719 1.97343 12.5399 2.04984C12.508 2.12625 12.4915 2.20825 12.4915 2.29108C12.4915 2.37391 12.508 2.45591 12.5399 2.53232C12.5719 2.60873 12.6187 2.67803 12.6777 2.73618C12.7367 2.79433 12.8066 2.84018 12.8835 2.87107C12.9603 2.90195 13.0426 2.91725 13.1254 2.91608H16.0421C16.6247 2.91608 17.0837 3.37515 17.0837 3.95774V6.87441C17.0826 6.95723 17.0979 7.03946 17.1287 7.11631C17.1596 7.19317 17.2055 7.26312 17.2636 7.3221C17.3218 7.38108 17.3911 7.42792 17.4675 7.45988C17.5439 7.49185 17.6259 7.50831 17.7087 7.50831C17.7916 7.50831 17.8736 7.49185 17.95 7.45988C18.0264 7.42792 18.0957 7.38108 18.1538 7.3221C18.212 7.26312 18.2578 7.19317 18.2887 7.11631C18.3196 7.03946 18.3349 6.95723 18.3337 6.87441V3.95774C18.3337 2.69951 17.3003 1.66608 16.0421 1.66608H13.1254ZM10.0004 4.16608C9.08281 4.16608 8.21199 4.38812 7.44505 4.7805C7.37019 4.81683 7.30334 4.86775 7.24842 4.93025C7.1935 4.99276 7.15161 5.06561 7.12521 5.14452C7.09881 5.22343 7.08844 5.30682 7.09469 5.38979C7.10094 5.47277 7.1237 5.55366 7.16162 5.62772C7.19955 5.70178 7.25188 5.76753 7.31555 5.8211C7.37922 5.87467 7.45294 5.915 7.5324 5.9397C7.61186 5.96441 7.69545 5.973 7.77827 5.96497C7.86109 5.95695 7.94148 5.93247 8.01471 5.89297C8.61111 5.58784 9.28381 5.41608 10.0004 5.41608C12.4185 5.41608 14.3754 7.37296 14.3754 9.79108V13.5411C14.3742 13.6239 14.3895 13.7061 14.4204 13.783C14.4513 13.8598 14.4971 13.9298 14.5553 13.9888C14.6134 14.0477 14.6827 14.0946 14.7591 14.1265C14.8356 14.1585 14.9176 14.175 15.0004 14.175C15.0832 14.175 15.1652 14.1585 15.2416 14.1265C15.318 14.0946 15.3873 14.0477 15.4455 13.9888C15.5036 13.9298 15.5495 13.8598 15.5804 13.783C15.6113 13.7061 15.6266 13.6239 15.6254 13.5411V9.79108C15.6254 6.69503 13.0964 4.16608 10.0004 4.16608ZM5.95254 6.24209C5.85094 6.2411 5.75064 6.26489 5.66031 6.3114C5.56998 6.35791 5.49235 6.42574 5.43415 6.50901C4.76888 7.43242 4.37539 8.5698 4.37539 9.79108V13.5411C4.37422 13.6239 4.38952 13.7061 4.4204 13.783C4.45129 13.8598 4.49714 13.9298 4.55529 13.9888C4.61344 14.0477 4.68274 14.0946 4.75915 14.1265C4.83556 14.1585 4.91756 14.175 5.00039 14.175C5.08322 14.175 5.16522 14.1585 5.24163 14.1265C5.31804 14.0946 5.38734 14.0477 5.44549 13.9888C5.50364 13.9298 5.54949 13.8598 5.58038 13.783C5.61126 13.7061 5.62656 13.6239 5.62539 13.5411V9.79108C5.62539 8.83736 5.93008 7.9589 6.44814 7.23981C6.51689 7.14724 6.5587 7.03746 6.56894 6.92261C6.57917 6.80776 6.55744 6.69231 6.50614 6.58904C6.45485 6.48578 6.37598 6.39871 6.27828 6.33748C6.18058 6.27624 6.06784 6.24323 5.95254 6.24209ZM10.0004 6.66608C8.28279 6.66608 6.87539 8.07348 6.87539 9.79108V14.7911C6.87422 14.8739 6.88952 14.9561 6.9204 15.033C6.95129 15.1098 6.99714 15.1798 7.05529 15.2388C7.11344 15.2977 7.18274 15.3446 7.25915 15.3765C7.33556 15.4085 7.41756 15.425 7.50039 15.425C7.58322 15.425 7.66522 15.4085 7.74163 15.3765C7.81804 15.3446 7.88734 15.2977 7.94549 15.2388C8.00364 15.1798 8.04949 15.1098 8.08038 15.033C8.11126 14.9561 8.12656 14.8739 8.12539 14.7911V9.79108C8.12539 8.75118 8.96049 7.91608 10.0004 7.91608C10.053 7.91608 10.105 7.91828 10.1558 7.92259C10.2389 7.93207 10.323 7.92479 10.4032 7.90118C10.4834 7.87757 10.5581 7.83812 10.6227 7.78515C10.6874 7.73218 10.7408 7.66677 10.7798 7.59279C10.8187 7.51882 10.8425 7.43778 10.8495 7.35448C10.8566 7.27117 10.8469 7.1873 10.821 7.10781C10.7951 7.02832 10.7535 6.95484 10.6987 6.89172C10.6438 6.8286 10.5769 6.77711 10.5019 6.74031C10.4268 6.70351 10.3451 6.68214 10.2616 6.67747C10.175 6.67012 10.0878 6.66608 10.0004 6.66608ZM11.9934 7.69472C11.8798 7.69966 11.7698 7.73547 11.675 7.79831C11.5803 7.86114 11.5045 7.94862 11.4558 8.05132C11.4071 8.15402 11.3873 8.26807 11.3986 8.38118C11.4098 8.49429 11.4517 8.60219 11.5198 8.69326C11.7444 9.00314 11.8754 9.37875 11.8754 9.79108V14.7911C11.8742 14.8739 11.8895 14.9561 11.9204 15.033C11.9513 15.1098 11.9971 15.1798 12.0553 15.2388C12.1134 15.2977 12.1827 15.3446 12.2591 15.3765C12.3356 15.4085 12.4176 15.425 12.5004 15.425C12.5832 15.425 12.6652 15.4085 12.7416 15.3765C12.818 15.3446 12.8873 15.2977 12.9455 15.2388C13.0036 15.1798 13.0495 15.1098 13.0804 15.033C13.1113 14.9561 13.1266 14.8739 13.1254 14.7911V9.79108C13.1254 9.11007 12.9042 8.47431 12.5313 7.96002C12.4711 7.87425 12.3903 7.805 12.2963 7.75864C12.2023 7.71228 12.0981 7.6903 11.9934 7.69472ZM9.99062 9.15713C9.82501 9.15971 9.66719 9.22793 9.55183 9.3468C9.43647 9.46566 9.37301 9.62546 9.37539 9.79108V11.0411C9.37422 11.1239 9.38952 11.2061 9.4204 11.283C9.45129 11.3598 9.49714 11.4298 9.55529 11.4888C9.61344 11.5477 9.68274 11.5946 9.75915 11.6266C9.83556 11.6585 9.91756 11.675 10.0004 11.675C10.0832 11.675 10.1652 11.6585 10.2416 11.6266C10.318 11.5946 10.3873 11.5477 10.4455 11.4888C10.5036 11.4298 10.5495 11.3598 10.5804 11.283C10.6113 11.2061 10.6266 11.1239 10.6254 11.0411V9.79108C10.6266 9.70743 10.611 9.62438 10.5795 9.54687C10.548 9.46936 10.5013 9.39896 10.4421 9.33984C10.3829 9.28072 10.3124 9.23409 10.2349 9.2027C10.1573 9.17132 10.0743 9.15582 9.99062 9.15713ZM2.28229 12.4905C2.11667 12.493 1.95885 12.5613 1.8435 12.6801C1.72814 12.799 1.66468 12.9588 1.66706 13.1244V16.0411C1.66706 17.2993 2.70048 18.3327 3.95872 18.3327H6.87539C6.95821 18.3339 7.04044 18.3186 7.11729 18.2877C7.19415 18.2568 7.2641 18.211 7.32308 18.1528C7.38206 18.0947 7.4289 18.0254 7.46086 17.949C7.49283 17.8726 7.50929 17.7906 7.50929 17.7077C7.50929 17.6249 7.49283 17.5429 7.46086 17.4665C7.4289 17.3901 7.38206 17.3208 7.32308 17.2626C7.2641 17.2045 7.19415 17.1586 7.11729 17.1278C7.04044 17.0969 6.95821 17.0816 6.87539 17.0827H3.95872C3.37613 17.0827 2.91706 16.6237 2.91706 16.0411V13.1244C2.91826 13.0408 2.90265 12.9577 2.87117 12.8802C2.83968 12.8027 2.79296 12.7323 2.73376 12.6732C2.67457 12.6141 2.6041 12.5674 2.52655 12.536C2.449 12.5047 2.36594 12.4892 2.28229 12.4905ZM9.99062 12.4905C9.82501 12.493 9.66719 12.5613 9.55183 12.6801C9.43647 12.799 9.37301 12.9588 9.37539 13.1244V15.6244C9.37422 15.7072 9.38952 15.7895 9.4204 15.8663C9.45129 15.9432 9.49714 16.0131 9.55529 16.0721C9.61344 16.1311 9.68274 16.1779 9.75915 16.2099C9.83556 16.2418 9.91756 16.2583 10.0004 16.2583C10.0832 16.2583 10.1652 16.2418 10.2416 16.2099C10.318 16.1779 10.3873 16.1311 10.4455 16.0721C10.5036 16.0131 10.5495 15.9432 10.5804 15.8663C10.6113 15.7895 10.6266 15.7072 10.6254 15.6244V13.1244C10.6266 13.0408 10.611 12.9577 10.5795 12.8802C10.548 12.8027 10.5013 12.7323 10.4421 12.6732C10.3829 12.6141 10.3124 12.5674 10.2349 12.536C10.1573 12.5047 10.0743 12.4892 9.99062 12.4905ZM17.699 12.4905C17.5333 12.493 17.3755 12.5613 17.2602 12.6801C17.1448 12.799 17.0813 12.9588 17.0837 13.1244V16.0411C17.0837 16.6237 16.6247 17.0827 16.0421 17.0827H13.1254C13.0426 17.0816 12.9603 17.0969 12.8835 17.1278C12.8066 17.1586 12.7367 17.2045 12.6777 17.2626C12.6187 17.3208 12.5719 17.3901 12.5399 17.4665C12.508 17.5429 12.4915 17.6249 12.4915 17.7077C12.4915 17.7906 12.508 17.8726 12.5399 17.949C12.5719 18.0254 12.6187 18.0947 12.6777 18.1528C12.7367 18.211 12.8066 18.2568 12.8835 18.2877C12.9603 18.3186 13.0426 18.3339 13.1254 18.3327H16.0421C17.3003 18.3327 18.3337 17.2993 18.3337 16.0411V13.1244C18.3349 13.0408 18.3193 12.9577 18.2878 12.8802C18.2563 12.8027 18.2096 12.7323 18.1504 12.6732C18.0912 12.6141 18.0208 12.5674 17.9432 12.536C17.8657 12.5047 17.7826 12.4892 17.699 12.4905Z"
                              fill="white"
                            />
                          </svg>
                          Unlock Wallet
                        </button>
                      </div>
                      <div className="w-[100%] p-[1px] opacity-[25%] my-[20px] bg-[#B2BEC3]"></div>

                      <div className="flex items-center justify-center gap-[7px] ">
                        <p className="text-[18px] cursor-pointer text-center dark:text-customlightgraybg text-customlightgraybg font-[700] text-[Poppins]">View All</p>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                          <path d="M9.47477 13.0942C9.19463 13.3743 8.74052 13.3743 8.46038 13.0942L1.64516 6.27894C1.36502 5.99879 1.36502 5.54469 1.64516 5.26454C1.92531 4.9844 2.37941 4.9844 2.65956 5.26454L8.96758 11.5726L15.2756 5.26454C15.4158 5.12429 15.5991 5.05435 15.7828 5.05435C15.9664 5.05435 16.1497 5.12429 16.29 5.26454C16.5701 5.54469 16.5701 5.99879 16.29 6.27894L9.47477 13.0942Z" fill="#B2BEC3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}


            {/* Connect to a Wallet Modal */}
            <Transition appear show={connectWallet} as={Fragment}>
              <Dialog as="div" open={connectWallet} onClose={() => setConnectWallet(false)} className="relative z-[51]">
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
                      <Dialog.Panel className="panel !h-[793px] border-0 p-0 rounded-[40px] overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                        <div className='px-[25px]'>
                          <button
                            type="button"
                            onClick={() => setConnectWallet(false)}
                            className="absolute top-[35px] ltr:right-10  rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M22.7397 4.06624C22.4314 4.07352 22.1385 4.20255 21.9251 4.42513L14 12.3503L6.07485 4.42513C5.96599 4.31323 5.83579 4.22432 5.69195 4.16365C5.54811 4.10298 5.39356 4.0718 5.23745 4.07194C5.00545 4.07223 4.77881 4.14167 4.58648 4.27139C4.39414 4.40111 4.24484 4.58522 4.15765 4.8002C4.07046 5.01518 4.04933 5.25128 4.09697 5.47833C4.14461 5.70537 4.25886 5.91307 4.42511 6.07487L12.3502 14L4.42511 21.9251C4.31314 22.0326 4.22375 22.1614 4.16216 22.3039C4.10058 22.4464 4.06805 22.5997 4.06647 22.7549C4.06489 22.9101 4.09429 23.0641 4.15296 23.2078C4.21164 23.3515 4.29839 23.4821 4.40815 23.5918C4.51791 23.7016 4.64846 23.7884 4.79217 23.847C4.93588 23.9057 5.08985 23.9351 5.24506 23.9335C5.40028 23.9319 5.55361 23.8994 5.6961 23.8378C5.83858 23.7762 5.96734 23.6868 6.07485 23.5749L14 15.6497L21.9251 23.5749C22.0326 23.6868 22.1614 23.7762 22.3039 23.8378C22.4463 23.8994 22.5997 23.9319 22.7549 23.9335C22.9101 23.9351 23.0641 23.9057 23.2078 23.847C23.3515 23.7884 23.4821 23.7016 23.5918 23.5918C23.7016 23.4821 23.7883 23.3515 23.847 23.2078C23.9057 23.0641 23.9351 22.9101 23.9335 22.7549C23.9319 22.5997 23.8994 22.4464 23.8378 22.3039C23.7762 22.1614 23.6868 22.0326 23.5748 21.9251L15.6497 14L23.5748 6.07487C23.7446 5.91208 23.8612 5.70179 23.9094 5.47157C23.9575 5.24134 23.935 5.00194 23.8447 4.78476C23.7544 4.56758 23.6005 4.38276 23.4034 4.25454C23.2062 4.12632 22.9749 4.06069 22.7397 4.06624Z" fill="#F94025" />
                            </svg>
                          </button>
                          <div className="text-[22px] pt-[35px] dark:text-white text-customblackbg font-[700] text-[Urbanist] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                            <div className='flex items-center gap-2'>
                              Connect to a Wallet
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                  <path d="M13.0001 2.16663C7.02662 2.16663 2.16675 7.0265 2.16675 13C2.16675 18.9734 7.02662 23.8333 13.0001 23.8333C18.9735 23.8333 23.8334 18.9734 23.8334 13C23.8334 7.0265 18.9735 2.16663 13.0001 2.16663ZM13.0001 3.79163C18.0953 3.79163 22.2084 7.90471 22.2084 13C22.2084 18.0952 18.0953 22.2083 13.0001 22.2083C7.90483 22.2083 3.79175 18.0952 3.79175 13C3.79175 7.90471 7.90483 3.79163 13.0001 3.79163ZM13.0001 7.58329C12.7128 7.58329 12.4372 7.69743 12.234 7.90059C12.0309 8.10376 11.9167 8.37931 11.9167 8.66663C11.9167 8.95394 12.0309 9.22949 12.234 9.43266C12.4372 9.63582 12.7128 9.74996 13.0001 9.74996C13.2874 9.74996 13.5629 9.63582 13.7661 9.43266C13.9693 9.22949 14.0834 8.95394 14.0834 8.66663C14.0834 8.37931 13.9693 8.10376 13.7661 7.90059C13.5629 7.69743 13.2874 7.58329 13.0001 7.58329ZM12.9874 11.3633C12.7721 11.3667 12.5669 11.4554 12.417 11.6099C12.267 11.7644 12.1845 11.9722 12.1876 12.1875V18.1458C12.1861 18.2535 12.206 18.3604 12.2461 18.4603C12.2862 18.5602 12.3459 18.6511 12.4215 18.7278C12.4971 18.8045 12.5871 18.8653 12.6865 18.9069C12.7858 18.9485 12.8924 18.9699 13.0001 18.9699C13.1078 18.9699 13.2144 18.9485 13.3137 18.9069C13.413 18.8653 13.5031 18.8045 13.5787 18.7278C13.6543 18.6511 13.7139 18.5602 13.7541 18.4603C13.7942 18.3604 13.8141 18.2535 13.8126 18.1458V12.1875C13.8141 12.0787 13.7939 11.9708 13.7529 11.87C13.712 11.7692 13.6513 11.6777 13.5743 11.6009C13.4973 11.524 13.4057 11.4634 13.3049 11.4226C13.2041 11.3818 13.0961 11.3616 12.9874 11.3633Z" fill="#2B70FA" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div className="border-b border-solid border-customlightgraybg opacity-[0.25] mt-[15px] mx-5"></div>

                        </div>
                        <div className="px-[25px]">
                          <div className=''>
                            <div className=' mt-[30px]'>
                              {itemsConnect.map((item) => (
                                <div key={item.id} className='flex mt-[12px] gap-[10px] items-center py-[15px] px-[20px] bg-customgraybg dark:bg-customblackbg rounded-[50px] cursor-pointer'>
                                  <img src={item.icon} alt={`${item.name} Icon`} />
                                  <p className='text-[16px] text-customblackbg dark:text-white font-[600] text-[Urbanist] '>{item.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-3 py-[30px]'>
                            {theme == 'dark' ?
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M11 1.83334C5.94549 1.83334 1.83333 5.94551 1.83333 11C1.83333 16.0545 5.94549 20.1667 11 20.1667C16.0545 20.1667 20.1667 16.0545 20.1667 11C20.1667 5.94551 16.0545 1.83334 11 1.83334ZM11 16.5C10.4935 16.5 10.0833 16.0898 10.0833 15.5833C10.0833 15.0769 10.4935 14.6667 11 14.6667C11.5065 14.6667 11.9167 15.0769 11.9167 15.5833C11.9167 16.0898 11.5065 16.5 11 16.5ZM12.3704 11.4478C11.9157 11.8021 11.6875 11.9799 11.6875 12.6042C11.6875 12.9841 11.38 13.2917 11 13.2917C10.62 13.2917 10.3125 12.9841 10.3125 12.6042C10.3125 11.308 11.0133 10.7621 11.5252 10.3634C12.0184 9.97884 12.375 9.70109 12.375 8.70834C12.375 7.95026 11.7581 7.33334 11 7.33334C10.2419 7.33334 9.62499 7.95026 9.62499 8.70834V8.93751C9.62499 9.31747 9.31745 9.62501 8.93749 9.62501C8.55754 9.62501 8.24999 9.31747 8.24999 8.93751V8.70834C8.24999 7.19172 9.48337 5.95834 11 5.95834C12.5166 5.95834 13.75 7.19172 13.75 8.70834C13.75 10.3726 12.9525 10.9941 12.3704 11.4478Z" fill="#2B70FA" />
                              </svg>
                              :
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M11 1.83334C5.94549 1.83334 1.83333 5.94551 1.83333 11C1.83333 16.0545 5.94549 20.1667 11 20.1667C16.0545 20.1667 20.1667 16.0545 20.1667 11C20.1667 5.94551 16.0545 1.83334 11 1.83334ZM11 16.5C10.4935 16.5 10.0833 16.0898 10.0833 15.5833C10.0833 15.0769 10.4935 14.6667 11 14.6667C11.5065 14.6667 11.9167 15.0769 11.9167 15.5833C11.9167 16.0898 11.5065 16.5 11 16.5ZM12.3704 11.4478C11.9157 11.8021 11.6875 11.9799 11.6875 12.6042C11.6875 12.9841 11.38 13.2917 11 13.2917C10.62 13.2917 10.3125 12.9841 10.3125 12.6042C10.3125 11.308 11.0133 10.7621 11.5252 10.3634C12.0184 9.97884 12.375 9.70109 12.375 8.70834C12.375 7.95026 11.7581 7.33334 11 7.33334C10.2419 7.33334 9.62499 7.95026 9.62499 8.70834V8.93751C9.62499 9.31747 9.31745 9.62501 8.93749 9.62501C8.55754 9.62501 8.24999 9.31747 8.24999 8.93751V8.70834C8.24999 7.19172 9.48337 5.95834 11 5.95834C12.5166 5.95834 13.75 7.19172 13.75 8.70834C13.75 10.3726 12.9525 10.9941 12.3704 11.4478Z" fill="#2B70FA" />
                              </svg>

                            }


                            <p className='text-[18px] dark:text-white text-customblackbg font-[600] text-[Urbanist]'>Learn how to Connect</p>
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
          <div className=" pt-[90px] ps-[40%] mb-[25px]">
            <img width={320} height={320} src={bgslice} alt="bgslice" />
          </div>
        </>
      )}
    </div>
  );
}

export default Staking;
