import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ hours, minutes, seconds, label }: any) => {
    const [time, setTime] = useState({
        hours,
        minutes,
        seconds
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const newTime = { ...prevTime };
                if (newTime.seconds > 0) {
                    newTime.seconds -= 1;
                } else {
                    if (newTime.minutes > 0) {
                        newTime.minutes -= 1;
                        newTime.seconds = 59;
                    } else {
                        if (newTime.hours > 0) {
                            newTime.hours -= 1;
                            newTime.minutes = 59;
                            newTime.seconds = 59;
                        } else {
                            clearInterval(interval);
                        }
                    }
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className='flex items-center justify-center gap-5'>
                <div style={{ borderColor: 'rgba(192, 192, 192, 0.25)' }} className='p-[12px] w-[90px] h-[90px]  border border-1  rounded-[20px] text-center '>
                    <div className='text-[54px] dark:text-customlightgraybg text-customgraybg tracking-[3px] !opacity-100 font-[600] mt-4'>{time.hours.toString().padStart(2, '0')}</div>
                    <p className='text-[16px] dark:text-customlightgraybg text-white text-center mt-3 font-[600] leading-7'>H</p>
                </div>

                <div style={{ borderColor: 'rgba(192, 192, 192, 0.25)' }} className='p-[12px] w-[90px] h-[90px]  border border-1  rounded-[20px] text-center '>
                    <div className='text-[54px] dark:text-customlightgraybg text-white tracking-[3px]  font-[600] mt-4'>{time.minutes.toString().padStart(2, '0')}</div>
                    <p className='text-[16px] dark:text-customlightgraybg text-white text-center mt-3  font-[600] leading-7'>M</p>
                </div>

                <div style={{ borderColor: 'rgba(192, 192, 192, 0.25)' }} className='p-[12px] w-[90px] h-[90px]  border border-1  rounded-[20px] text-center '>
                    <div className='text-[54px] dark:text-customlightgraybg text-white  font-[600] tracking-[3px] mt-4'>{time.seconds.toString().padStart(2, '0')}</div>
                    <p className='text-[16px] dark:text-customlightgraybg text-white text-center mt-3 font-[600] leading-7'>S</p>
                </div>
            </div>

            <p className='text-[16px] text-white text-center my-3 font-[400] leading-normal '>{label}</p>
        </div>
    );
};

export default CountdownTimer