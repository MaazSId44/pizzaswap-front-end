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
import { Loader } from '../../components/Reuseable/Loader';
const HomeOurMissionSection = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profile'));
        // GetStudentData()
    });

    const [data, setData] = useState<any>();

    const token = secureLocalStorage.getItem('token');
    const { state } = useLocation();

    const [heading, setHeading] = useState('');

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
    const [allSteps, setAllSteps] = useState([]);

    const [preIcon, setPreIcon] = useState('');

    const [preImage, setPreImage] = useState('');

    const [allStudentData, setAllStudentData] = useState<[]>([]);

    const [stepOneTitle, setStepOneTitle] = useState<any>();
    const [stepOneDescription, setStepOneDescription] = useState<any>();
    const [stepTwoTitle, setStepTwoTitle] = useState<any>();
    const [stepTwoDescription, setStepTwoDescription] = useState<any>();
    const [stepTheeTitle, setStepTheeTitle] = useState<any>();
    const [stepThreeDescription, setStepThreeDescription] = useState<any>();

    const navigate = useNavigate();
    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);

    const handleImageChange2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
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

    const fileInputRef2 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        GetStudentData();
    }, []);

    const GetStudentData = () => {
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios
            .post(API_ENDPOINTS.GETHOMEPAGE, formData, { headers })
            .then((response: any) => {
                const data = response?.data?.data;

                const ourMission = data.filter((item: any) => item.key === 'missionSection');

                setStudId(ourMission[0]?._id);
                setStudTitle(ourMission[0]?.ourMission?.title);
                setStudButtonText(ourMission[0]?.ourMission?.btnText);
                setStudDescription(ourMission[0]?.ourMission?.description);
                setPreviewImageUrl2(ourMission[0]?.ourMission?.image?.url);
                setImage(ourMission[0]?.ourMission?.image);
                setAllSteps(JSON.parse(ourMission[0]?.ourMission?.steps));
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
    };
    // console.log(allSteps);

    const UpdateHomeData = (e: any) => {
        e.preventDefault();

        if (studTitle.trim() == '') {
            return showMessage('Title is required', 'error');
        }
        if (studDescription.trim() == '') {
            return showMessage('Description is required', 'error');
        }
        if (!allSteps) {
            return showMessage('allSteps are required', 'error');
        }
        if (!previewImageUrl2) {
            return showMessage('image is required', 'error');
        }
        // setLoading(true);
        const myHeaders = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('title', studTitle);
        formdata.append('description', studDescription);
        formdata.append('steps', JSON.stringify(allSteps));
        formdata.append('image', image);
        formdata.append('id', studId);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            data: formdata,
            redirect: 'follow',
        };
        axios
            .post('https://ilmcircle.be/backend/api/admin/home/mission/update', formdata, requestOptions)
            .then((response) => response.data)
            .then((result) => {
                setLoading(false);

                if (result.status == 200) {
                    showMessage(result?.message);
                } else {
                    showMessage(result?.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error);
            });
    };

    const handleStepTitleChange = (index: number, newTitle: string) => {
        setAllSteps((prevSteps) => {
            const updatedSteps: any = [...prevSteps];
            updatedSteps[index] = { ...updatedSteps[index], title: newTitle };
            return updatedSteps;
        });
    };

    const handleStepDescriptionChange = (index: any, newDescription: any) => {
        setAllSteps((prevSteps) => {
            const updatedSteps: any = [...prevSteps];
            updatedSteps[index] = { ...updatedSteps[index], description: newDescription };
            return updatedSteps;
        });
    };

    return (
        <div className="panel">
            {loading && <Loader />}
            <div className="mb-5">
                <h5 className="block dark:text-white font-bold text-xl mb-1">Our Mission Section</h5>
            </div>
            <div className="mb-5">
                <form onSubmit={UpdateHomeData}>
                    <div className="text-[#515365] dark:text-white-light font-semibold  flex justify-center">
                        <div className="md:w-5/6">
                            <div className="mb-4">
                                <h5 className="font-semibold text-lg dark:text-white-light">Title</h5>
                                <TextInput type="text" label="" Placeholder="Enter Title" value={studTitle} onChange={(e) => setStudTitle(e.target.value)} />
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

                            {allSteps?.map((item: any, index: any) => {
                                return (
                                    <div className="py-4">
                                        <h5 className="block dark:text-white font-bold text-xl mb-1">{index == 0 ? 'Step One' : index == 1 ? 'Step Two' : index == 2 ? 'Step Three' : null}</h5>

                                        <div className="mb-4">
                                            <label className="block w-32 dark:text-white  font-semi text-lg mr-4 capitalize">Title</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Title"
                                                value={item?.title}
                                                onChange={(e) => handleStepTitleChange(index, e.target.value)}
                                                // name={item?.title}
                                                className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block w-32 dark:text-white font-semi text-lg mr-4 capitalize">Description</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Description"
                                                value={item?.description}
                                                onChange={(e) => handleStepDescriptionChange(index, e.target.value)}
                                                // name={item?.description}
                                                className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div className="py-4">
                                <h5 className="block dark:text-white font-bold text-xl mb-1">Step Two</h5>

                                <div className="mb-4">
                                    <label className="block w-32 text-gray-500 font-semi text-lg mr-4 capitalize">Title</label>
                                    <input
                                        type="url"
                                        placeholder='Enter Title'
                                        value={studButtonText}

                                        onChange={(e) => setStudButtonText(e.target.value)}
                                        name={studButtonText}
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block w-32 text-gray-500 font-semi text-lg mr-4 capitalize">Description</label>
                                    <input
                                        type="url"
                                        placeholder='Enter Description'
                                        value={studButtonText}

                                        onChange={(e) => setStudButtonText(e.target.value)}
                                        name={studButtonText}
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                    />
                                </div>

                            </div>

                            <div className="py-4" >
                                <h5 className="block dark:text-white font-bold text-xl mb-1">Step Three</h5>

                                <div className="mb-4">
                                    <label className="block w-32 text-gray-500 font-semi text-lg mr-4 capitalize">Title</label>
                                    <input
                                        type="url"
                                        placeholder='Enter Title'
                                        value={studButtonText}

                                        onChange={(e) => setStudButtonText(e.target.value)}
                                        name={studButtonText}
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block w-32 text-gray-500 font-semi text-lg mr-4 capitalize">Description</label>
                                    <input
                                        type="url"
                                        placeholder='Enter Description'
                                        value={studButtonText}

                                        onChange={(e) => setStudButtonText(e.target.value)}
                                        name={studButtonText}
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                    />
                                </div>

                            </div> */}

                            <div className="mb-4">
                                <div className="xl:flex items-center justify-between">
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

            {isPreviewOpen2 && <ReactModal imageUrl={previewImageUrl2} onClose={closePreviewModal2} />}
        </div>
    );
};

export default HomeOurMissionSection;
