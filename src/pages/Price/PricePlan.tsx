import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import '../../assets/css/prices.css';
import dot from '../../assets/Images/dot.svg';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { showMessage } from '../../components/Reuseable/Tostify';
import { Loader } from '../../components/Reuseable/Loader';
import { IRootState } from '../../store';
const PricePlan = () => {
    const dispatch = useDispatch();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    useEffect(() => {
        dispatch(setPageTitle('Price-plan'));

        getPlans();
    }, []);
    const navigate = useNavigate();
    const token = secureLocalStorage.getItem('token');

    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin')
        // }
    }, [])
    const getPlans = () => {
        setLoading(true);
        const apiUrl = API_ENDPOINTS.GETPLAN;
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formData = new FormData();
        axios
            .post<any>(apiUrl, formData, { headers })
            .then((response) => {
                if (response.status == 200) {
                    const data = response.data?.data;

                    setPlans(data);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);

                console.error('An error occurred:', error);
            });
    };

    const deletePlan = (id: any) => {
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + token,
        };
        const formdata = new FormData();
        formdata.append('id', id);

        axios
            .delete(API_ENDPOINTS.DELETEPLAN, {
                headers: headers,
                data: formdata,
            })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    showMessage(response.data?.message);
                    getPlans()
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
            });
    };
    // console.log(plans)
    return (
        <div className="mb-5">
            {loading && <Loader />}
            <div className="my-5 text-center text-2xl font-bold dark:text-white md:text-5xl">Price Plans</div>
            <div className="max-w-7xl mx-auto mt-20 dark:text-white-dark">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((props: any) => (
                        <div className="card-price price-body relative " style={{background:"none"}}>
                            <div className="badge-main">
                                <span>
                                    <h1 className='dark:text-white'>
                                        {props?.price}
                                        <small className="dark:text-white"> /{props?.name}</small>{' '}
                                    </h1>
                                </span>
                            </div>

                            <div className="line"></div>
                            <div className="price-list ps-2 pb-4 dark:text-white" dangerouslySetInnerHTML={{ __html: props?.features }}>
                                {/* <li>
                                            <img src={dot} className="me-2" /> Find and connect with 'ilm buddies
                                        </li> */}
                            </div>
                            <div className="flex justify-center gap-5 items-center  bottom-3 mt-4">
                                <button
                                    className={`border border-primary text-primary hover:bg-indig-500 hover:text-white hover:bg-primary px-5 py-2 rounded-md transition duration-300`}
                                    onClick={() => navigate('/addpriceplan', { state: { plan: props } })}
                                >
                                    Edit
                                </button>
                                {/* <button
                                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md transition duration-300"
                                    onClick={() => deletePlan(props._id)}
                                >
                                    Delete
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricePlan;
