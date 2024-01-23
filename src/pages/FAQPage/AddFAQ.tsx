import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../assets/css/switch.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineEye } from 'react-icons/ai';
import TextInput from '../../components/Reuseable/TextInput';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { showMessage } from '../../components/Reuseable/Tostify';
import { Loader } from '../../components/Reuseable/Loader';

const AddFAQ = () => {
    const token = secureLocalStorage.getItem('token');
    const [id, setId] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(setPageTitle('Add FAQ'));
        const data = location?.state?.faq;

        if (data?._id) {
            setHeading(data?.heading);
            setDescription(data?.description);
            setId(data?._id);
        }
    }, []);

    const handleHeadingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setHeading(e.target.value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (id) {
            updateFaq();
        } else {
            createFaq();
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);

    const createFaq = () => {
        if (heading.trim() == '') {
            return showMessage('Heading is required', 'error');
        }  
        if (description.trim() == '' || description === '<p><br></p>') {
            return showMessage('Description is required', 'error');
        }
        setLoading(true);
        const apiUrl = API_ENDPOINTS.CREATEFAQ;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('heading', heading);
        formdata.append('description', description);

        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    showMessage(response.data?.message);
                    const data = response.data?.data;
                    setHeading(data?.heading);
                    setDescription(data?.heading);
                    setId(data?._id);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
    };
    // console.log()
    const updateFaq = () => {
        if (heading.trim() == '') {
            return showMessage('Heading is required', 'error');
        } 
        if (description.trim() == '' || description === '<p><br></p>') {
            return showMessage('Description is required', 'error');
        }
        setLoading(true);
        const apiUrl = API_ENDPOINTS.UPDATEFAQ;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('heading', heading);
        formdata.append('description', description);
        formdata.append('id', id);

        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    showMessage(response.data?.message);
                    const data = response.data?.data;
                    setHeading(data?.heading);
                    setDescription(data?.description);
                    setId(data?._id);
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

            <h1 className="text-4xl font-bold mb-6 ms-5">Add FAQ's</h1>

            <div className="grid grid-cols-6">
                <div className="col-span-8 md:col-span-4 lg:col-span-4 xl:col-span-4 px-6 py-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextInput type="text" Placeholder="Enter heading" label="Heading " value={heading} onChange={handleHeadingChange} />
                        <label htmlFor="Description" className="block dark:text-white font-bold text-xl mb-1">
                            Description
                        </label>
                        <textarea
                            id="ctnTextarea"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                            placeholder="Enter Description"
                            // required
                        ></textarea>

                        <button type="submit" className="bg-blue-500 hover:bg-white-600 text-white px-6 py-2 rounded-md" style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFAQ;
