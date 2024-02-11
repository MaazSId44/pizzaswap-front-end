import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const CustomDialog = ({ isOpen, onClose, theme, setConnectWallet, itemsConnect }: any) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={onClose} className="relative z-[51]">
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
                            <Dialog.Panel id={'headlessui-dialog-panel-:rb'} className="panel  border-0 p-0 rounded-[40px]  w-full max-w-lg text-black dark:text-white-dark">
                                <div className="px-[25px]">
                                    <button
                                        type="button"
                                        onClick={() => setConnectWallet(false)}
                                        className="absolute top-[35px] ltr:right-10  rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M22.7397 4.06624C22.4314 4.07352 22.1385 4.20255 21.9251 4.42513L14 12.3503L6.07485 4.42513C5.96599 4.31323 5.83579 4.22432 5.69195 4.16365C5.54811 4.10298 5.39356 4.0718 5.23745 4.07194C5.00545 4.07223 4.77881 4.14167 4.58648 4.27139C4.39414 4.40111 4.24484 4.58522 4.15765 4.8002C4.07046 5.01518 4.04933 5.25128 4.09697 5.47833C4.14461 5.70537 4.25886 5.91307 4.42511 6.07487L12.3502 14L4.42511 21.9251C4.31314 22.0326 4.22375 22.1614 4.16216 22.3039C4.10058 22.4464 4.06805 22.5997 4.06647 22.7549C4.06489 22.9101 4.09429 23.0641 4.15296 23.2078C4.21164 23.3515 4.29839 23.4821 4.40815 23.5918C4.51791 23.7016 4.64846 23.7884 4.79217 23.847C4.93588 23.9057 5.08985 23.9351 5.24506 23.9335C5.40028 23.9319 5.55361 23.8994 5.6961 23.8378C5.83858 23.7762 5.96734 23.6868 6.07485 23.5749L14 15.6497L21.9251 23.5749C22.0326 23.6868 22.1614 23.7762 22.3039 23.8378C22.4463 23.8994 22.5997 23.9319 22.7549 23.9335C22.9101 23.9351 23.0641 23.9057 23.2078 23.847C23.3515 23.7884 23.4821 23.7016 23.5918 23.5918C23.7016 23.4821 23.7883 23.3515 23.847 23.2078C23.9057 23.0641 23.9351 22.9101 23.9335 22.7549C23.9319 22.5997 23.8994 22.4464 23.8378 22.3039C23.7762 22.1614 23.6868 22.0326 23.5748 21.9251L15.6497 14L23.5748 6.07487C23.7446 5.91208 23.8612 5.70179 23.9094 5.47157C23.9575 5.24134 23.935 5.00194 23.8447 4.78476C23.7544 4.56758 23.6005 4.38276 23.4034 4.25454C23.2062 4.12632 22.9749 4.06069 22.7397 4.06624Z"
                                                fill="#F94025"
                                            />
                                        </svg>
                                    </button>
                                    <div className="text-[22px] pt-[35px] dark:text-white text-customblackbg font-[700] text-[Urbanist]  py-3 ltr:pr-[50px]">
                                        <div className="flex items-center gap-2">
                                            Connect to a Wallet
                                        </div>
                                    </div>
                                    <div className="border-b border-solid border-customlightgraybg opacity-[0.25] mt-[15px]"></div>
                                </div>
                                <div className="px-[25px] custom-scrollbar h-[690px] overflow-y-scroll ">
                                    <div className="">
                                        <div className=" mt-[30px]">
                                            {itemsConnect.map((item: any) => (
                                                <div
                                                    key={item.id}
                                                    className="flex mt-[12px] gap-[10px] items-center py-[15px] px-[20px] bg-customgraybg dark:bg-customblackbg rounded-[50px] cursor-pointer"
                                                >
                                                    <img src={item.icon} alt={`${item.name} Icon`} />
                                                    <p className="text-[16px] text-customblackbg dark:text-white font-[600] text-[Urbanist] ">{item.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 py-[30px]">
                                        {theme == 'dark' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path
                                                    d="M11 1.83334C5.94549 1.83334 1.83333 5.94551 1.83333 11C1.83333 16.0545 5.94549 20.1667 11 20.1667C16.0545 20.1667 20.1667 16.0545 20.1667 11C20.1667 5.94551 16.0545 1.83334 11 1.83334ZM11 16.5C10.4935 16.5 10.0833 16.0898 10.0833 15.5833C10.0833 15.0769 10.4935 14.6667 11 14.6667C11.5065 14.6667 11.9167 15.0769 11.9167 15.5833C11.9167 16.0898 11.5065 16.5 11 16.5ZM12.3704 11.4478C11.9157 11.8021 11.6875 11.9799 11.6875 12.6042C11.6875 12.9841 11.38 13.2917 11 13.2917C10.62 13.2917 10.3125 12.9841 10.3125 12.6042C10.3125 11.308 11.0133 10.7621 11.5252 10.3634C12.0184 9.97884 12.375 9.70109 12.375 8.70834C12.375 7.95026 11.7581 7.33334 11 7.33334C10.2419 7.33334 9.62499 7.95026 9.62499 8.70834V8.93751C9.62499 9.31747 9.31745 9.62501 8.93749 9.62501C8.55754 9.62501 8.24999 9.31747 8.24999 8.93751V8.70834C8.24999 7.19172 9.48337 5.95834 11 5.95834C12.5166 5.95834 13.75 7.19172 13.75 8.70834C13.75 10.3726 12.9525 10.9941 12.3704 11.4478Z"
                                                    fill="#2B70FA"
                                                />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path
                                                    d="M11 1.83334C5.94549 1.83334 1.83333 5.94551 1.83333 11C1.83333 16.0545 5.94549 20.1667 11 20.1667C16.0545 20.1667 20.1667 16.0545 20.1667 11C20.1667 5.94551 16.0545 1.83334 11 1.83334ZM11 16.5C10.4935 16.5 10.0833 16.0898 10.0833 15.5833C10.0833 15.0769 10.4935 14.6667 11 14.6667C11.5065 14.6667 11.9167 15.0769 11.9167 15.5833C11.9167 16.0898 11.5065 16.5 11 16.5ZM12.3704 11.4478C11.9157 11.8021 11.6875 11.9799 11.6875 12.6042C11.6875 12.9841 11.38 13.2917 11 13.2917C10.62 13.2917 10.3125 12.9841 10.3125 12.6042C10.3125 11.308 11.0133 10.7621 11.5252 10.3634C12.0184 9.97884 12.375 9.70109 12.375 8.70834C12.375 7.95026 11.7581 7.33334 11 7.33334C10.2419 7.33334 9.62499 7.95026 9.62499 8.70834V8.93751C9.62499 9.31747 9.31745 9.62501 8.93749 9.62501C8.55754 9.62501 8.24999 9.31747 8.24999 8.93751V8.70834C8.24999 7.19172 9.48337 5.95834 11 5.95834C12.5166 5.95834 13.75 7.19172 13.75 8.70834C13.75 10.3726 12.9525 10.9941 12.3704 11.4478Z"
                                                    fill="#2B70FA"
                                                />
                                            </svg>
                                        )}

                                        <p className="text-[18px] dark:text-white text-customblackbg font-[600] text-[Urbanist]">Learn how to Connect</p>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CustomDialog;
