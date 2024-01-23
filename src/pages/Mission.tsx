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

const Mission = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        GetUserDetail();
        // if (data?.length) {
        //     setId(data[0]?._id);
        //     setUserData(data[0]?.landingSection?.data);
        //     // setPreview(data[0]?.landingSection?.data[0]?.image?.url);
        //     // setDescription(data[0]?.landingSection?.data[0].description);
        // }
    }, []);
    const token: any = secureLocalStorage.getItem('token');

    const GetUserDetail = () => {
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios
            .post(API_ENDPOINTS.GETHOMEPAGE, formData, { headers })
            .then((response) => {
                const get = response?.data?.data;
                if (response.status == 200) {
                    const customerData = get.filter((item: any) => item.key == 'customerData');
                    const customers = get.filter((item: any) => item.key == 'customerHeader');
                    setTitle(customers[0]?.ourCustomer.title);
                    setComment(customers[0]?.ourCustomer.description);
                    setCId(customers[0]?._id);
                    // console.log(customers);
                    setId(customerData[0]._id);
                    setUserData(customerData[0]?.customerData?.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                console.error('An error occurred:', error);
            });
    };

    const [id, setId] = useState<any>();
    const [cId, setCId] = useState<any>();
    const [image, setImage] = useState<any>();
    const [subId, setSubId] = useState<string>('');
    const [userData, setUserData] = useState<any>([]);
    const [role, setRole] = useState<any>('');
    const [rating, setRating] = useState<any>('');
    const [title, setTitle] = useState<any>('');
    const [comment, setComment] = useState<any>('');
    const [preview, setPreview] = useState<any>();

    const [loading, setLoading] = useState<Boolean>(false);
    const [description, setDescription] = useState<any>();
    const [name, setName] = useState<any>();

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setPreview(URL.createObjectURL(selectedImage));
            setImage(selectedImage);
        }
    };
    const handleHeader = () => {
        if (title.trim() == '') {
            return showMessage('Title is required', 'error')
        }
        if (description.trim() == '') {
            return showMessage('Description is required', 'error')
        }
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token);
        var formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', comment);
        formdata.append('id', cId);

        var requestOptions: Object = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        fetch('https://ilmcircle.be/backend/api/admin/home/customer/update', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 200) {
                    GetUserDetail();
                    showMessage(result.message);
                } else {
                    showMessage(result.message, 'error');
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error);
            });
    };
    const handleUploadButtonClick = (val: number) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleEdit = (item: any) => {
        setDescription(item.content);
        setPreview(item.image.url);
        setSubId(item.subId);
        setName(item?.name);
        setRating(item?.rating);
        setRole(item?.role);
    };
    const handleClick = () => {
        let url;
        if (subId) {
            url = 'https://ilmcircle.be/backend/api/admin/home/customer/data/update';
        } else {
            url = 'https://ilmcircle.be/backend/api/admin/home/customer/data/create';
        }
        if (!description) {
            showMessage('Comment are required.', 'error');
            return true;
        }

        if (!name) {
            showMessage('Name is required.', 'error');
            return true;
        }

        if (!rating) {
            showMessage('Rating text is required.', 'error');
            return true;
        }

        if (!role) {
            showMessage('Role link is required.', 'error');
            return true;
        }
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token);

        var formdata = new FormData();
        formdata.append('content', description);
        formdata.append('name', name);
        formdata.append('role', role);
        formdata.append('rating', rating);
        formdata.append('image', image);
        formdata.append('subId', subId);
        formdata.append('id', id);

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 200 || result.status == 201) {
                    setDescription('');
                    setPreview('');
                    setSubId('');
                    setName('');
                    setRating('');
                    setRole('');
                    GetUserDetail();
                    showMessage(result.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    };

    const handleDelete = (item: any) => {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGIxZjYzMzZkMGEyZTFiZDAyZDExMiIsImlhdCI6MTY5MjY5MDk0NCwiZXhwIjoxNjkzMjk1NzQ0fQ.gl7E-oNvElCM0rbWgxyGNZQiC3_z41TYG6m-OphRnz0'
        );

        var formdata = new FormData();
        formdata.append('id', id);
        formdata.append('subId', item.subId);

        var requestOptions: Object = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        fetch('https://ilmcircle.be/backend/api/admin/home/customer/data/delete', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 200) {
                    setDescription('');
                    setPreview('');
                    setSubId('');
                    setName('');
                    setRating('');
                    setRole('');
                    GetUserDetail();
                    showMessage(result.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log('error', error);
            });
    };
    return (
        <div className="mb-5">
            {loading && <Loader />}
            <div className="my-5 text-center text-2xl font-bold dark:text-white md:text-5xl">Our Customer Page</div>
            <div className=" gap-5 grid grid-cols-2 lg:grid-cols-3 gap-4 ">
                <div className="mb-4 w-full">
                    <TextInput onChange={(e: any) => setTitle(e.target.value)} type="text" value={title} label="Title" Placeholder="Enter title" />
                </div>
                <div className="mb-4 w-full">
                    <TextInput onChange={(e: any) => setComment(e.target.value)} type="text" value={comment} label="Description" Placeholder="Enter description" />
                </div>
                {title && comment && (
                    <div className="flex gap-5 items-center justify-between">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md "
                            style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                            onClick={handleHeader}
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
            {userData.length && (
                <div className="">
                    <div className="my-5 text-center text-2xl font-bold dark:text-white md:text-5xl">Customers</div>

                    <div className=" gap-5 grid grid-cols-2 lg:grid-cols-3 gap-4 ">
                        <div className="mb-4 w-full">
                            <TextInput onChange={(e: any) => setName(e.target.value)} type="text" value={name} label="Name" Placeholder="Enter name" />
                        </div>
                        <div className="mb-4 w-full">
                            <TextInput onChange={(e: any) => setRole(e.target.value)} type="text" value={role} label="Role" Placeholder="Enter role" />
                        </div>
                        <div className="mb-4 w-full">
                            <TextInput onChange={(e: any) => setDescription(e.target.value)} type="text" value={description} label="Comment" Placeholder="Enter comment" />
                        </div>
                        <div className="mb-4 w-full">
                            <TextInput onChange={(e: any) => setRating(e.target.value)} type="number" value={rating} label="Rating" Placeholder="Enter rating" />
                        </div>
                        <div className="mb-4 w-full ">
                            <label className="block dark:text-white font-bold text-xl mb-1 w-48">Upload image</label>

                            <div className="flex gap-5 items-center justify-between">
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                                    style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                    onClick={() => handleUploadButtonClick(1)}
                                >
                                    Upload
                                </button>
                                <input type="file" id="image" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
                                {preview && <img src={preview} alt="" className="w-10 h-10 object-cover rounded-full" />}
                                {preview && userData?.length && (
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md "
                                        style={{ backgroundColor: 'rgb(67, 97, 238)', minWidth: '120px' }}
                                        onClick={handleClick}
                                    >
                                        {!subId ? 'Add' : 'Update'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {userData?.length && (
                <div className="max-w-7xl mx-auto mt-20 dark:text-white-dark">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {userData?.map((item: any) => (
                            <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <p className="text-gray-700 font-semibold">{item?.content}</p>
                                    <div className="mt-4 flex items-center">
                                        <img className="w-10 h-10 object-cover rounded-full" src={item?.image?.url} alt="Person Avatar" />
                                        <div className="ml-3 ">
                                            <div>
                                                <p className="text-gray-800 font-semibold">{item.name}</p>
                                                <p className="text-gray-600">{item?.role}</p>
                                            </div>
                                            <p className="text-gray-600">Rating: {item.rating}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-5 items-center  bottom-3 mt-4">
                                        <button
                                            className={`border border-primary text-primary hover:bg-indig-500 hover:text-white hover:bg-primary px-5 py-2 rounded-md transition duration-300`}
                                            onClick={() => {
                                                handleEdit(item);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        {userData.length != 1 && (
                                            <button
                                                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md transition duration-300"
                                                onClick={() => handleDelete(item)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mission;
