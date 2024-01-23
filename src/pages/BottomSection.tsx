import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import person from '../assets/Images/person.png';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { setPageTitle } from '../store/themeConfigSlice';
import API_ENDPOINTS from '../Routes/API_routes';
import { IRootState } from '../store';
import TextInput from '../components/Reuseable/TextInput';
import { BiPlus } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import ReactModal from '../components/Reuseable/ReactModal';
import { showMessage } from '../components/Reuseable/Tostify';
import { Loader } from '../components/Reuseable/Loader';

interface TextInputProps {
    data: any;
    token: string;
    GetUserDetail: any;
}
const BottomSection: React.FC<TextInputProps> = ({ data, token, GetUserDetail }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (data?.length) {
            setId(data[0]?._id);
            setUserData(data[0]?.landingSection?.data);
            // setPreview(data[0]?.landingSection?.data[0]?.image?.url);
            // setDescription(data[0]?.landingSection?.data[0].description);
        }
    }, [data]);

    const [id, setId] = useState<any>();
    const [image, setImage] = useState<any>();
    const [subId, setSubId] = useState<string>('');
    const [userData, setUserData] = useState<any>();
    const [isPreviewOpen, setIsPreviewOpen] = useState<any>('');
    const [preview, setPreview] = useState<any>();
    const [loader, setLoader] = useState(false);
    const [description, setDescription] = useState<any>();

    const openPreviewModal = () => {
        setIsPreviewOpen(true);
    };
    const closePreviewModal = () => {
        setIsPreviewOpen(false);
    };

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setPreview(URL.createObjectURL(selectedImage));
            setImage(selectedImage);
        }
    };

    const handleUploadButtonClick = (val: number) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleEdit = (item: any) => {
        setDescription(item.description);
        setPreview(item.image.url);
        setSubId(item.subId);
    };
    const handleClick = () => {
        setLoader(true);
        if (description.trim() == '') {
            return showMessage('Description is required', 'error');
        }
        if (!subId && userData.length == 3) {
            showMessage("You cann't add more than three");
        }
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token);

        var formdata = new FormData();
        formdata.append('description', description);
        formdata.append('image', image);
        formdata.append('subId', subId);
        formdata.append('id', id);

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        fetch('https://ilmcircle.be/backend/api/admin/home/landing/section/update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 200) {
                    setDescription('');
                    setSubId('');
                    setPreview('');
                    showMessage(result.message);
                    GetUserDetail();
                }
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
                console.log('error', error);
            });
    };
    return (
        <div>
            {loader && (
                <Loader />
            )}
            <div className="md:flex gap-5">
                {subId && (
                    <div className="mb-4 w-1/2">
                        <h5 className="font-semibold text-lg dark:text-white-light">Description</h5>

                        <TextInput onChange={(e: any) => setDescription(e.target.value)} type="text" value={description} label="" Placeholder="Enter text" />
                    </div>
                )}
                {subId && (
                    <div className="w-1/2">
                        <h5 className="font-semibold text-lg dark:text-white-light">Upload Image</h5>

                        <div className="flex gap-x-2 items-center mt-2">
                            <div>
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                    onClick={() => handleUploadButtonClick(1)}
                                >
                                    Upload
                                </button>
                                <input type="file" id="image" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
                            </div>

                            {preview && (
                                <div>
                                    <AiOutlineEye className="cursor-pointer" onClick={openPreviewModal} size={25} color="rgb(67, 97, 238)" />
                                </div>
                            )}
                            {subId && preview && userData?.length && (
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md ms-auto md:me-5"
                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                    onClick={handleClick}
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-between grid grid-cols-3 gap-4">
                {userData &&
                    userData.map((item: any, index: number) => (
                        <div key={index} className="card-price price-body relative text-center ">
                            <img src={item.image.url} className="mx-auto rounded-md" style={{ width: 100, height: 100 }} />
                            <div className="price-list ps-2 pb-4 dark:text-white mt-2">{item.description}</div>
                            <div className="flex justify-center gap-5 items-center  bottom-3 mt-4">
                                <button
                                    className={`border border-primary text-primary hover:bg-indig-500 hover:text-white hover:bg-primary px-5 py-2 rounded-md transition duration-300`}
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {isPreviewOpen && <ReactModal imageUrl={preview} onClose={closePreviewModal} />}
        </div>
    );
};

export default BottomSection;
