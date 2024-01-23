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
                <div className="mb-5">
                    <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                        <div className="md:w-5/6">
                            <div className="mb-4">
                                <h5 className="font-semibold text-lg dark:text-white-light">Title</h5>

                                <TextInput onChange={(e: any) => setTitle(e.target.value)} type="text" value={title} label="" Placeholder="Enter title" />
                            </div>
                            <div className="mb-4">
                                <h5 className="font-semibold text-lg dark:text-white-light">Description</h5>

                                <textarea
                                    id="ctnTextarea"
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                    placeholder="Enter Description"
                                // required
                                ></textarea>
                            </div>

                            <div className="md:flex gap-5">
                                <div className="mb-4 w-full">
                                    <h5 className="font-semibold text-lg dark:text-white-light">First button text</h5>

                                    <TextInput onChange={(e: any) => setBtnText(e.target.value)} type="text" value={btnText} label="" Placeholder="Enter text" />
                                </div>
                                <div className="mb-4 w-full">
                                    <h5 className="font-semibold text-lg dark:text-white-light">First button link</h5>
                                    <TextInput onChange={(e: any) => setBtnLink(e.target.value)} type="text" value={btnLink} label="" Placeholder="Enter link" />
                                </div>
                            </div>
                            <div className="md:flex gap-5">
                                <div className="mb-4 w-full">
                                    <h5 className="font-semibold text-lg dark:text-white-light">Second button text</h5>
                                    <TextInput onChange={(e: any) => setBtnText2(e.target.value)} type="text" value={btnText2} label="" Placeholder="Enter text" />
                                </div>
                                <div className="mb-4 w-full">
                                    <h5 className="font-semibold text-lg dark:text-white-light">Second button link</h5>

                                    <TextInput onChange={(e: any) => setBtnLink2(e.target.value)} type="text" value={btnLink2} label="" Placeholder="Enter link" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="xl:flex items-center gap-3 ">
                                    <div className="w-full">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Upload left Image</h5>


                                        <div className="flex gap-x-2 items-center mt-2">
                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                                style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                                onClick={() => handleUploadButtonClick(1)}
                                            >
                                                Upload
                                            </button>
                                            <input type="file" id="image" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
                                            {preview && (
                                                <div>
                                                    <AiOutlineEye className="cursor-pointer" onClick={() => openPreviewModal(1)} size={25} color="rgb(67, 97, 238)" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className=" mt-5 xl:mt-0 w-full">
                                        <h5 className="font-semibold text-lg dark:text-white-light float-right">Upload right image</h5>

                                        <div className="xl:w-fit xl:float-right mt-2">
                                            <div className="flex gap-x-2 items-center ">
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                                    onClick={() => handleUploadButtonClick(2)}
                                                >
                                                    Upload
                                                </button>
                                                <input type="file" id="image" onChange={handleImageChange2} className="hidden" ref={fileInputRef2} />
                                                {preview1 && (
                                                    <div>
                                                        <AiOutlineEye className="cursor-pointer" onClick={() => openPreviewModal(2)} size={25} color="rgb(67, 97, 238)" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 mt-8 text-center">
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                        style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                        onClick={() => submitDetail()}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isPreviewOpen && <ReactModal imageUrl={preview} onClose={closePreviewModal} />}
            {isPreviewOpen2 && <ReactModal imageUrl={preview1} onClose={closePreviewModal} />}
        </div>
    );
};

export default HomeLandingSection;
