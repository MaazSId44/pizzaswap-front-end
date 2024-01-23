import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import TextInput from '../components/Reuseable/TextInput';
import '../assets/css/switch.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactModal from '../components/Reuseable/ReactModal';
import { AiOutlineEye } from 'react-icons/ai';
import API_ENDPOINTS from '../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { showMessage } from '../components/Reuseable/Tostify';
import { Loader } from '../components/Reuseable/Loader';

const About = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('About'));
    });
    const token = secureLocalStorage.getItem('token');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);
    const handleHeadingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setHeading(e.target.value);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setPreviewImageUrl(URL.createObjectURL(selectedImage));
        }
    };
// console.log(description)
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (heading.trim() == '') {
            return showMessage('Heading is required', 'error');
        }
        if (title.trim() == '') {
            return showMessage('Title is required', 'error');
        }
        if (description.trim() == '' || description === '<p><br></p>') {
            return showMessage('Description is required', 'error');
        }
        if (!image) {
            return showMessage('Image is required', 'error');
        }

        setLoading(true);

        const apiUrl = API_ENDPOINTS.UPDATEABOUT;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('heading', heading);
        formdata.append('description', description);
        formdata.append('image', image);
        formdata.append('title', title);
        formdata.append('id', id);
        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    showMessage(response.data?.message);
                    const data = response.data?.data;
                    // console.log('check', response)
                    setDescription(data?.description);
                    setTitle(data?.title);
                    setHeading(data?.heading);
                    setPreviewImageUrl(data?.image?.url);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
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

    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        getAbout();
    }, []);

    const getAbout = () => {
        setLoading(true);
        const apiUrl = API_ENDPOINTS.GETABOUT;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formData = new FormData();
        axios
            .post<any>(apiUrl, formData, { headers })
            .then((response) => {
                if (response.status == 200) {
                    const data = response.data?.data[0];
                    setDescription(data?.description);
                    setTitle(data?.title);
                    setHeading(data?.heading);
                    setPreviewImageUrl(data?.image?.url);
                    setImage(data?.image?.url);
                    setId(data._id);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
    };
    return (
        <div>
            {loading && <Loader />}

            <h1 className="text-4xl font-bold mb-6 ms-5">About Us</h1>

            <div className="grid grid-cols-6">
                <div className="col-span-8 md:col-span-4 lg:col-span-4 xl:col-span-4 px-6 py-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextInput type="text" Placeholder="Enter heading" label="Heading " value={heading} onChange={handleHeadingChange} />
                        <TextInput type="text" Placeholder="Enter title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <div>
                            <label htmlFor="description" className="block dark:text-white font-bold text-xl  mb-1">
                                Description
                            </label>
                            <ReactQuill value={description} onChange={handleDescriptionChange} theme="snow" className="custom-quill-editor" style={{ minHeight: '200px', resize: 'none' }} />
                        </div>
                        <div>
                            <label className="block dark:text-white font-bold text-xl mb-1 w-48">Image</label>
                            <div className="flex gap-x-2 items-center">
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                    onClick={handleUploadButtonClick}
                                >
                                    Upload Image
                                </button>
                                <input type="file" id="image" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
                                {previewImageUrl && (
                                    // <img
                                    //     src={URL.createObjectURL(image)}
                                    //     alt="Selected"
                                    //     className="max-h-32 rounded-lg mr-4 cursor-pointer"

                                    // />
                                    <div>
                                        <AiOutlineEye className="cursor-pointer" onClick={() => openPreviewModal()} size={25} color="rgb(67, 97, 238)" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md" style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {isPreviewOpen && <ReactModal imageUrl={previewImageUrl} onClose={closePreviewModal} />}
        </div>
    );
};

export default About;
