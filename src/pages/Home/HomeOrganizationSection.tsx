import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useRef, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';
import TextInput from '../../components/Reuseable/TextInput';
import { AiOutlineEye } from 'react-icons/ai';
import ReactModal from '../../components/Reuseable/ReactModal';
import { showMessage } from '../../components/Reuseable/Tostify';
const HomeOrganizationSection = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        // GetStudentData()
    });

    const [data, setData] = useState<any>();

    const token = secureLocalStorage.getItem('token');
    const { state } = useLocation();

    const GetData = props?.data?.organizationData;
    // console.log('idT--->', props?.data?._id)
    useEffect(() => {
        setStudId(props?.data?._id);
        setStudTitle(GetData?.title);
        setStudButtonText(GetData?.btnText);
        setStudButtonText(GetData?.btnText);
        setStudButtonLink(GetData?.btnLink);
        setStudDescription(GetData?.description);
        setPreviewImageUrl(GetData?.icon?.url);
        setPreviewImageUrl2(GetData?.image?.url);

        setPreIcon(GetData?.icon);
        setPreImage(GetData?.image);
    }, [GetData]);

    const UpdateHomeData = (e: any) => {
        e.preventDefault();
        if (studTitle.trim() == '') {
            return showMessage('Title is required', 'error');
        }
        if (studButtonText.trim() == '') {
            return showMessage('Button Text is required', 'error');
        }
        if (studButtonLink.trim() == '') {
            return showMessage('Button link is required', 'error');
        }
        if (studDescription.trim() == '') {
            return showMessage('Description is required', 'error');
        }
        var myHeaders = new Headers();

        myHeaders.append('Authorization', 'Bearer ' + token);

        let check: any;
        let images;

        if (image && image2) {
            images = [image, image2];
            check = 3;
        } else if (image) {
            images = image;
            check = 1;
        } else if (image2) {
            images = image2;
            check = 2;
        }

        const formData = new FormData();
        formData.append('btnText', studButtonText);
        formData.append('title', studTitle);
        formData.append('description', studDescription);
        formData.append('btnLink', studButtonLink);
        formData.append('check', '3');
        formData.append('imgCheck', check);
        formData.append('id', studId);

        if (images?.length) {
            images?.forEach((e: any) => {
                formData.append('images', e);
            });
        } else {
            formData.append('images', images);
        }
        if (!images) {
            formData.append('icon', preIcon);
            formData.append('image', preImage);
        }

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow',
        };

        fetch(API_ENDPOINTS.UPDATEHOMEDATA, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 200) {
                    showMessage('Organization section updated successfully');
                } else {
                    showMessage(result?.message);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const [heading, setHeading] = useState('');

    const [image2, setImage2] = useState<any>(null);
    const [title, setTitle] = useState('');

    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);

    //Student states
    const [studId, setStudId] = useState<any>('');

    const [studTitle, setStudTitle] = useState<any>('');
    const [studButtonText, setStudButtonText] = useState('');
    const [studButtonLink, setStudButtonLink] = useState('');
    const [studDescription, setStudDescription] = useState('');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [image, setImage] = useState<any>(null);
    const [isPreviewOpen2, setIsPreviewOpen2] = useState(false);
    const [previewImageUrl2, setPreviewImageUrl2] = useState('');

    const [preIcon, setPreIcon] = useState('');

    const [preImage, setPreImage] = useState('');

    const [allStudentData, setAllStudentData] = useState<[]>([]);

    const navigate = useNavigate();
    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);

    const handleDescriptionChange = (value: string) => {
        setStudDescription(value);
    };

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setPreviewImageUrl(URL.createObjectURL(selectedImage));
        }
    };

    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const openPreviewModal = () => {
        setIsPreviewOpen(true);
    };

    const closePreviewModal = () => {
        setIsPreviewOpen(false);
    };

    const handleImageChange2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage2(selectedImage);
            setPreviewImageUrl2(URL.createObjectURL(selectedImage));
        }
    };

    const handleUploadButtonClick2 = () => {
        if (fileInputRef2.current) {
            fileInputRef2.current.click();
        }
    };
    const openPreviewModal2 = () => {
        setIsPreviewOpen2(true);
    };

    const closePreviewModal2 = () => {
        setIsPreviewOpen2(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);

    return (
        <div className="panel">
            <div className="mb-5">
                <h5 className="block dark:text-white font-bold text-xl mb-1">Organization Section</h5>
            </div>
            <div className="mb-5">
                <form onSubmit={UpdateHomeData}>
                    <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                        <div className="md:w-5/6">
                            <div className="mb-4">
                                <h5 className="font-semibold text-lg dark:text-white-light">Title</h5>
                                <TextInput type="text" label="" Placeholder="Enter Title" value={studTitle} onChange={(e) => setStudTitle(e.target.value)} />

                                <h5 className="font-semibold text-lg dark:text-white-light">Button Text</h5>
                                <TextInput type="text" label="" Placeholder="Enter button text" value={studButtonText} onChange={(e) => setStudButtonText(e.target.value)} />

                                <h5 className="font-semibold text-lg dark:text-white-light">Button link</h5>
                                <TextInput type="link" label="" Placeholder="Enter button link" value={studButtonLink} onChange={(e) => setStudButtonLink(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Description" className="font-semibold text-lg dark:text-white-light">
                                    Description
                                </label>
                                <textarea
                                    id="ctnTextarea"
                                    rows={5}
                                    value={studDescription}
                                    onChange={(e) => setStudDescription(e.target.value)}
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                    placeholder="Enter Description"
                                    // required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <div className="xl:flex items-center justify-between">
                                    <div>
                                        <label htmlFor="Description" className="font-semibold text-lg dark:text-white-light">
                                            Upload Icon
                                        </label>
                                        <div className="flex gap-x-2 items-center">
                                            <button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                                style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                                onClick={handleUploadButtonClick}
                                            >
                                                Upload
                                            </button>
                                            <input type="file" id="image" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
                                            {previewImageUrl && (
                                                <div>
                                                    <AiOutlineEye className="cursor-pointer" onClick={() => openPreviewModal()} size={25} color="rgb(67, 97, 238)" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className=" mt-5 xl:mt-0">
                                        <label htmlFor="Description" className="font-semibold text-lg dark:text-white-light">
                                            Upload Image
                                        </label>
                                        <div className="xl:w-fit xl:float-right">
                                            <div className="flex gap-x-2 items-center">
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                                    onClick={handleUploadButtonClick2}
                                                >
                                                    Upload
                                                </button>
                                                <input type="file" id="image" onChange={handleImageChange2} className="hidden" ref={fileInputRef2} />
                                                {previewImageUrl2 && (
                                                    <div>
                                                        <AiOutlineEye className="cursor-pointer" onClick={() => openPreviewModal2()} size={25} color="rgb(67, 97, 238)" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 text-center">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md" style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {isPreviewOpen && <ReactModal imageUrl={previewImageUrl} onClose={closePreviewModal} />}
            {isPreviewOpen2 && <ReactModal imageUrl={previewImageUrl2} onClose={closePreviewModal2} />}
        </div>
    );
};

export default HomeOrganizationSection;
