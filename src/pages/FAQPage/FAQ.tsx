import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import axios from 'axios';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import { showMessage } from '../../components/Reuseable/Tostify';
import { Loader } from '../../components/Reuseable/Loader';

const FAQ = () => {
    const dispatch = useDispatch();
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(setPageTitle('FAQ'));
        getFAQ();
    }, []);



    const [active, setActive] = useState<Number>();
    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [showDropdown, setShowDropdown] = useState<any>(null);
    const [active1, setActive1] = useState<any>(null);

    const navigate = useNavigate();
    const token = secureLocalStorage.getItem('token');
    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin')
        // }
    }, [])
    const getFAQ = () => {
        setLoading(true);
        const apiUrl = API_ENDPOINTS.GETFAQ;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formData = new FormData();
        axios
            .post<any>(apiUrl, formData, { headers })
            .then((response) => {
                if (response.status == 200) {
                    const data = response.data?.data;
                    setFaqs(data);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
    };

    const deleteFaq = (id: any) => {
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('id', id);
        axios
            .delete(API_ENDPOINTS.DELETEFAQ, {
                headers: headers,
                data: formdata,
            })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    showMessage(response.data?.message);
                    getFAQ()
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
            <div className="my-10 text-center text-2xl font-bold dark:text-white md:text-5xl">
                Frequently asked <span className="text-primary">questions</span>
            </div>

            <div className="flex items-center justify-center">
                <div className="max-w-xxl w-full rounded-md bg-white dark:bg-black mx-20">
                    <div className="divide-y divide-white-light px-6 py-4.5 dark:divide-dark">
                        {faqs.map((item: any, index) => (
                            <div className="relative" key={index}>
                                <div
                                    className={`flex cursor-pointer items-center justify-between gap-10 px-2.5 py-2 text-base font-semibold hover:bg-primary-light hover:text-primary dark:text-white dark:hover:bg-[#1B2E4B] dark:hover:text-primary
                            ${active1 === index ? 'bg-primary-light dark:bg-[#1B2E4B] !text-primary' : ''}`}
                                    onClick={() => setActive1(active1 === index ? null : index)}
                                    onMouseEnter={() => setShowDropdown(index)}
                                    onMouseLeave={() => setShowDropdown(null)}
                                >
                                    <span>{item.heading}</span>
                                    {active1 !== index ? (
                                        <span className="shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    ) : (
                                        <span className="shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                    {showDropdown == index && (
                                        <div className="absolute right-0 top-0 mt-2 bg-white dark:bg-gray-800 rounded shadow-md z-10">
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate('/addfaq', { state: { faq: item } })}>
                                                Edit
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100  text-danger dark:hover:bg-gray-700" onClick={() => deleteFaq(item._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <AnimateHeight duration={300} height={active1 === index ? 'auto' : 0}>
                                    <div className="px-1 py-3 font-semibold text-white-dark">
                                        <p>{item.description}</p>
                                    </div>
                                </AnimateHeight>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
