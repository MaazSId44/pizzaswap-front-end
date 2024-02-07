import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import referralbg from '../../../assets/Images/referralbg.png';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { IRootState } from '../../../store';
import WalletButton from '../../../components/Reuseable/WalletButton';
import CustomDialog from '../../../components/Reuseable/ConnectToWalletModal';
import connect1 from '../../../../public/assets/images/connect1.png';
import connect2 from '../../../../public/assets/images/connect2.png';
import connect3 from '../../../../public/assets/images/connect3.png';
import connect4 from '../../../../public/assets/images/connect4.png';
import connect5 from '../../../../public/assets/images/connect5.png';
import connect6 from '../../../../public/assets/images/connect6.png';
import connect7 from '../../../../public/assets/images/connect7.png';
import { buyPizzaData } from '../../../components/Constants/Constant';

const Referral = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        // GetUserDetail()

    }, []);
    const [connectWallet, setConnectWallet] = useState<any>(false);
    const theme = localStorage.getItem('theme');

    const backgroundLotryImageStyle = {
        backgroundImage: `url("${referralbg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 380,
        width: "100%",
        borderRadius: 30
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
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <div className='py-[30px] flex items-center justify-center ' style={backgroundLotryImageStyle}>
                <p className="text-[38px]  w-[850px] leading-normal text-white font-[500]  mt-[5px] text-center">{buyPizzaData.refraltext}</p>
            </div>
            <div className=' flex justify-center items-center pt-[40px]'>
                <div className='p-[20px]  w-[448px] bg-white dark:bg-[#1A1E1F] rounded-[50px] border-[1px] border-solid border-[#fff] dark:border-[#636E72] '>
                    <div className=" w-full">
                        <WalletButton onClick={() => setConnectWallet(true)} buttonText="Unlock Wallet" />
                    </div>
                </div>
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

export default Referral;
