import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import person from '../assets/Images/person.png';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

import { BiPlus } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { setPageTitle } from '../../store/themeConfigSlice';
import API_ENDPOINTS from '../../Routes/API_routes';
import { showMessage } from '../../components/Reuseable/Tostify';
import { IRootState } from '../../store';
import TextInput from '../../components/Reuseable/TextInput';
import ReactModal from '../../components/Reuseable/ReactModal';
import { Loader } from '../../components/Reuseable/Loader';

const HomeLandingSection = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Landing Page'));
        GetUserDetail();
    }, []);
    const [id, setId] = useState<any>();
    const [title, setTitle] = useState<string>('');
    const [btnText, setBtnText] = useState<string>('');
    const [btnLink, setBtnLink] = useState<string>('');
    const [btnText2, setBtnText2] = useState<string>('');
    const [btnLink2, setBtnLink2] = useState<string>('');
    const [leftImage, setLeftImage] = useState<any>('');
    const [rightImage, setRightImage] = useState<any>('');
    const [isPreviewOpen, setIsPreviewOpen] = useState<any>('');
    const [isPreviewOpen2, setIsPreviewOpen2] = useState<any>('');
    const [preview, setPreview] = useState<any>();
    const [check, setCheck] = useState<any>();
    const [preview1, setPreview1] = useState<any>();
    const [description, setDescription] = useState<string>('');
    const [data, setData] = useState<any>();
    const [loader, setLoader] = useState(false);

    const token: any = secureLocalStorage.getItem('token');
    const { state } = useLocation();

    const GetUserDetail = () => {
        setLoader(true)
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios
            .post(API_ENDPOINTS.GETHOMEPAGE, formData, { headers })
            .then((response) => {
                const get = response?.data?.data;
                if (response.status == 200) {
                    const landingData = get.filter((item: any) => item.key == 'banner');

                    setId(landingData[0]._id);
                    const userData = landingData[0].banner;
                    setTitle(userData.title);
                    setDescription(userData.description);
                    setBtnText(userData.firstBtnText);
                    setBtnText2(userData.secondBtnText);
                    setBtnLink(userData.firstBtnLink);
                    setBtnLink2(userData.secondBtnLink);
                    setPreview(userData?.leftImage?.url);
                    setPreview1(userData?.rightImage?.url);
                    setLoader(false)
                } else {
                    showMessage(response?.data?.message)
                    setLoader(false)

                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                setLoader(false)

            });
    };
    // const handleChange = (e: any) => {
    //     setTitle(e.target.value);
    // };
    const submitDetail = () => {

        if (title.trim() == '') {
            showMessage('Title is required.', 'error');
            return true;
        }

        if (description.trim() == '') {
            showMessage('Desription is required.', 'error');
            return true;
        }

        if (btnText.trim() == '') {
            showMessage('First button text is required.', 'error');
            return true;
        }

        if (btnLink.trim() == '') {
            showMessage('First button link is required.', 'error');
            return true;
        }

        if (btnText2.trim() == '') {
            showMessage('Second button text is required.', 'error');
            return true;
        }

        if (btnLink2.trim() == '') {
            showMessage('Second button link is required.', 'error');
            return true;
        }

        let checkImage;
        let images;
        if (leftImage && rightImage) {
            images = [leftImage, rightImage];
            setCheck(3);
            checkImage = 3;
        } else {
            if (leftImage) {
                images = leftImage;
                checkImage = check;
            } else if (rightImage) {
                images = rightImage;
                checkImage = check;
            }
        }
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('firstBtnText', btnText);
        formdata.append('firstBtnLink', btnLink);
        formdata.append('secondBtnText', btnText2);
        formdata.append('secondBtnLink', btnLink2);
        if (images?.length == 2) {
            images.forEach((file: any) => {
                formdata.append(`images`, file);
            });
        } else {
            formdata.append(`images`, images);
        }

        formdata.append('id', id);
        if (checkImage) {
            formdata.append('check', checkImage);
        }
        axios
            .post('https://ilmcircle.be/backend/api/admin/home/banner/update', formdata, { headers })
            .then((response) => {
                const get = response?.data?.data;
                if (response.status == 200) {

                    setLeftImage('');
                    setRightImage('');
                    GetUserDetail();
                    showMessage(response?.data?.message);
                } else {
                    showMessage(response?.data?.message);
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);

            });
    };
    const handleUploadButtonClick = (val: number) => {
        if (val == 1) {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        } else {
            if (fileInputRef2.current) {
                fileInputRef2.current.click();
            }
        }
    };

    const openPreviewModal = (val: any) => {
        if (val == 1) {
            setIsPreviewOpen(true);
        } else {
            setIsPreviewOpen2(true);
        }
    };
    const closePreviewModal = () => {
        setIsPreviewOpen(false);
        setIsPreviewOpen2(false);
    };
    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setPreview(URL.createObjectURL(selectedImage));
            setLeftImage(selectedImage);
            setCheck(1);
        }
    };
    const handleImageChange2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setPreview1(URL.createObjectURL(selectedImage));
            setRightImage(selectedImage);
            setCheck(2);
        }
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            {loader && (
                <Loader />
            )}
            <div className="panel">
                <div className="mb-5">
                    <h5 className="block dark:text-white font-bold text-xl mb-1">Banner Section</h5>
                </div>
                
            </div>
            {/* {isPreviewOpen && <ReactModal imageUrl={preview} onClose={closePreviewModal} />}
            {isPreviewOpen2 && <ReactModal imageUrl={preview1} onClose={closePreviewModal} />} */}
        </div>
    );
};

export default HomeLandingSection;
