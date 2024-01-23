import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../../assets/css/switch.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineEye } from 'react-icons/ai';
import { setPageTitle } from '../../../store/themeConfigSlice';
import TextInput from '../../../components/Reuseable/TextInput';
import API_ENDPOINTS from '../../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { showMessage } from '../../../components/Reuseable/Tostify';
import { Loader } from '../../../components/Reuseable/Loader';
import Select from 'react-select';
import CodeHighlight from '../../../components/Highlight';

const AddPricePlan = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [heading, setHeading] = useState('');

    const [title, setTitle] = useState('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<any>('');
    const [address, setAddress] = useState('');
    const [socail, setSocail] = useState<any>([]);
    const [description, setDescription] = useState('');
    const [settingId, setSettingId] = useState('');
    const navigate = useNavigate();

    const token = secureLocalStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    useEffect(() => {
        dispatch(setPageTitle('Settings'));
        const data = location?.state?.plan;
        GetSettingsData();
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
        if (data?._id) {
            setHeading(data?.name);
            setDescription(data?.features);
            setTitle(data?.price);
            setId(data?._id);
        }
    }, []);

    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const handleLinkChange = (name: any, link: any) => {
        const existingIndex = socail.findIndex((item: any) => item.name === name);
        if (existingIndex !== -1) {
            const updatedLinks = [...socail];
            updatedLinks[existingIndex].link = link;
            setSocail(updatedLinks);
        } else {
            setSocail([...socail, { name, link }]);
        }
    };

    const handleHeadingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        UpdateSettings();
    };

    const GetSettingsData = () => {
        setLoading(true);
        const apiUrl = API_ENDPOINTS.SETTINGS;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        // formdata.append('name', heading);
        // formdata.append('price', title);
        // formdata.append('features', description);

        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                // console.log(response);

                if (response.status == 200 || response.status == 201) {
                    // console.log('check', response.data.data[0]?.title);
                    setTitle(response.data.data[0]?.title);
                    setEmail(response.data?.data[0]?.email);
                    setPhone(response.data?.data[0].phone);
                    setAddress(response.data?.data[0]?.address);
                    setDescription(response.data?.data[0].description);
                    setSettingId(response.data?.data[0]._id);

                    setSocail(JSON.parse(response.data?.data[0].socialMedia));
                    // const data = response.data?.data;
                    // setHeading(data?.name);
                    // setDescription(data?.features);
                    // setTitle(data?.price);
                    // setId(data?._id);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                console.error('An error occurred:', error);
            });
    };
    // console.log(JSON.parse(socail));
    const UpdateSettings = () => {
        setLoading(true);
        const data: any = [
            { name: 'facebook', link: 'https://facebook.com' },
            { name: 'youtube', link: 'https://Youtube.com' },
            { name: 'Linkedin', link: 'https://Linkedin.com' },
            { name: 'instagram', link: 'https://Instagram.com' },
            { name: 'twitter', link: 'https://google.com' },
        ];

        const apiUrl = API_ENDPOINTS.SETTINGSUPDATE;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('phone', phone);
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('email', email);
        formdata.append('address', address);
        formdata.append('id', settingId);
        formdata.append('socialMedia', JSON.stringify(socail));

        // formdata.append('socialMedia', );

        axios
            .post<any>(apiUrl, formdata, { headers })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    const data = response.data?.data;
                    showMessage(response.data?.message);
                    // console.log(response , ">>>>>>>>>>>>>>>>>>>>>>>")
                    GetSettingsData();
                    // setHeading(data?.name);
                    // setDescription(data?.features);
                    // setTitle(data?.price);
                    // setId(data?._id);
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
            <h1 className="text-4xl dark:text-white font-bold mb-6 ms-5">Settings</h1>
            <div className="grid grid-cols-6">
                <div className="col-span-8 md:col-span-4 lg:col-span-4 xl:col-span-4 px-6 py-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextInput Placeholder="Enter Title" label="Title" type="text" value={title} onChange={handleHeadingChange} />
                        <TextInput Placeholder="Enter Email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextInput Placeholder="Enter Phone" label="Phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <TextInput Placeholder="Enter Address" label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                        <div className="mb-5">
                            <label className="block text-gray-700 font-bold text-xl mb-4">Social Media Links</label>

                            {socail.map((item: any) => {
                                return (
                                    <div className="flex items-center mb-4">
                                        <label className="block w-32 text-gray-500 font-semi text-lg mr-4 capitalize">{item?.name}</label>
                                        <input
                                            type="url"
                                            placeholder="Enter the link"
                                            value={item?.link}
                                            onChange={(e) => handleLinkChange(item?.name, e.target.value)}
                                            name={item?.name}
                                            className="w-full form-input bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                        />
                                    </div>
                                );
                            })}

                            {/* <div className="flex items-center mb-4">
                                <label className="block w-32 text-gray-500 font-semi text-lg mr-4">YouTube</label>
                                <input
                                    type="url"
                                    placeholder='Youtube link '
                                    onChange={(e) => handleLinkChange('youtube', e.target.value)}
                                    name='youtube'

                                    className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex items-center mb-4">
                                <label className="block w-32 text-gray-500 font-semi text-lg mr-4">Twitter</label>
                                <input

                                    placeholder='Twitter link '
                                    onChange={(e) => handleLinkChange('twitter', e.target.value)}
                                    name='twitter'
                                    type="url"
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex items-center mb-4">
                                <label className="block w-32 text-gray-500 font-semi text-lg mr-4">Instagram</label>
                                <input
                                    type="url"
                                    onChange={(e) => handleLinkChange('instagram', e.target.value)}
                                    name='instagram'
                                    placeholder='Instagram link '
                                    className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex items-center mb-4">
                                <label className="block w-32 text-gray-500 font-semi text-lg mr-4">LinkedIn</label>
                                <input
                                    type="url"
                                    placeholder='LinkedIn link '
                                    onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                                    name='linkedin'

                                    className="w-full bg-gray-100 border border-gray-300 rounded-md py-4 px-3 focus:ring-0 focus:border-blue-500"
                                />
                            </div> */}
                        </div>

                        <div>
                            <label htmlFor="Features" className="dark:text-white block  text-gray-700 font-bold text-xl  mb-1">
                                Description
                            </label>
                            <ReactQuill value={description} onChange={handleDescriptionChange} theme="snow" className="custom-quill-editor " style={{ minHeight: '200px', resize: 'none' }} />
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
