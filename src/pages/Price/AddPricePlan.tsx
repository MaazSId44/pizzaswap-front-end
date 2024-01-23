import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/switch.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineEye } from 'react-icons/ai';
import { setPageTitle } from '../../store/themeConfigSlice';
import TextInput from '../../components/Reuseable/TextInput';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { showMessage } from '../../components/Reuseable/Tostify';
import { Loader } from '../../components/Reuseable/Loader';

const AddPricePlan = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [plantime, setPlantime] = useState('');
    const [discount, setDiscount] = useState('');

    const token = secureLocalStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    useEffect(() => {
        dispatch(setPageTitle('Add Price Plan'));
        const data = location?.state?.plan;

        if (data?._id) {

            console.log('data', data)
            setHeading(data?.name);
            setDescription(data?.features);
            setTitle(data?.price);
            setPlantime(data?.planTime)
            setDiscount(data?.planDiscount)
            setId(data?._id);
        }
    }, []);

    const navigate = useNavigate();
    const handleHeadingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setHeading(e.target.value);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (id) {
            updatePlan();
        } else {
            createPlan();
        }
    };

    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);

    const createPlan = () => {
        if (heading.trim() == '') {
            return showMessage('Name is required', 'error');
        }
        if (title.trim() == '') {
            return showMessage('Price is required', 'error');
        }

        if (discount.trim() == '') {
            return showMessage('discount is required', 'error');
        }
        if (plantime.trim() == '') {
            return showMessage('Time is required', 'error');
        }
        if (description.trim() == '' || description === '<p><br></p>') {
            return showMessage('Features are required', 'error');
        }
        const formattedPrice = formatPrice(title);
        setLoading(true);
        const apiUrl = API_ENDPOINTS.CREATEPLAN;

        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('name', heading);
        formdata.append('price', title);
        formdata.append('planTime', plantime);
        formdata.append('features', description);
        formdata.append('planDiscount', discount);


        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                // console.log(response);

                if (response.status == 200 || response.status == 201) {
                    showMessage(response.data?.message);
                    const data = response.data?.data;
                    setHeading(data?.name);
                    setDescription(data?.features);
                    setTitle(data?.price);
                    setId(data?._id);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                console.error('An error occurred:', error);
            });
    };
    const updatePlan = () => {
        if (heading.trim() == '') {
            return showMessage('Name is required', 'error');
        }
        if (title.trim() == '') {
            return showMessage('Price is required', 'error');
        }

        if (discount == '') {
            return showMessage('discount is required', 'error');
        }
        if (plantime == '') {
            return showMessage('Time is required', 'error');
        }
        if (description.trim() == '' || description === '<p><br></p>') {
            return showMessage('Features are required', 'error');
        }
        const formattedPrice = formatPrice(title);
        const apiUrl = API_ENDPOINTS.UPDATEPLAN;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('name', heading);
        formdata.append('price', title);
        formdata.append('features', description);
        formdata.append('planDiscount', discount);
        formdata.append('id', id);

        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                // console.log(response);

                if (response.status == 200 || response.status == 201) {
                    const data = response.data?.data;
                    showMessage(response.data?.message);
                    setHeading(data?.name);
                    setDescription(data?.features);
                    setTitle(data?.price);
                    setId(data?._id);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                console.error('An error occurred:', error);
            });
    };

    const formatPrice = (value: any) => {
        if (isNaN(value) || value === '') {
            return '';
        }
        const formattedValue = parseFloat(value).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD', // You can change the currency code as needed
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formattedValue;
    };


    return (
        <div>
            {loading && <Loader />}
            <h1 className="text-4xl dark:text-white font-bold mb-6 ms-5">Add Price Plan</h1>

            <div className="grid grid-cols-6">
                <div className="col-span-8 md:col-span-4 lg:col-span-4 xl:col-span-4 px-6 py-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextInput type="text" Placeholder="Enter name" label="Name " value={heading} onChange={handleHeadingChange} />
                        <div className="mb-4">
                            <label htmlFor={'Price'} className="block dark:text-white font-bold text-xl mb-1">
                                Price
                            </label>
                            <input
                                className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                type="text"
                                placeholder="Enter price"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor={'Price'} className="block dark:text-white font-bold text-xl mb-1">
                                Discount
                            </label>
                            <input
                                className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                type="text"
                                placeholder="Enter Discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor={'Price'} className="block dark:text-white font-bold text-xl mb-1">
                                Time
                            </label>
                            <input
                                className="w-full bg-gray-100 border border-gray-300 rounded-md ro py-4 px-3 form-input ltr:pr-11 rtl:pl-11 peer focus:ring-0 dark:text-white focus:border-blue-500"
                                type="number"
                                placeholder="Enter plan time in days"
                                value={plantime}
                                onChange={(e) => setPlantime(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="Features" className="dark:text-white block text-gray-700 font-bold text-xl  mb-1">
                                Features
                            </label>
                            <ReactQuill value={description} onChange={handleDescriptionChange} theme="snow" className="custom-quill-editor" style={{ minHeight: '200px', resize: 'none' }} />
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md" style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPricePlan;
