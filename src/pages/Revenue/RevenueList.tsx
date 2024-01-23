import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import '../../assets/css/switch.css';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { Loader } from '../../components/Reuseable/Loader';
import ReactModal from '../../components/Reuseable/ReactModal';
import Modal from 'react-modal';

import nameIcon from '../../assets/Images/UserName.svg';
import emailIcon from '../../assets/Images/emailIcon.svg';
import phoneIcon from '../../assets/Images/phoneIcon.svg';
import locationIcon from '../../assets/Images/locationIcon.svg';
import autoRenewIcon from '../../assets/Images/autoRenewIcon.svg';
import dateIcon from '../../assets/Images/PaymentDate.svg';
import paymentCurrency from '../../assets/Images/paymentCurrency.svg';
import packageNameIcon from '../../assets/Images/packageNameIcon.svg';
import paymentMethodicon from '../../assets/Images/paymentMethodicon.svg';

const RevenueList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Organization'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: '',
    });
    const [subDetails, setSubDetails] = useState<any>('');

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>(initialRecords);
    const [loader, setLoader] = useState(false);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const openPreviewModal = (id: any) => {
        setIsPreviewOpen(true);
        GetSubscriptionDetails(id);
    };

    const closePreviewModal = () => {
        setIsPreviewOpen(false);
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const token = secureLocalStorage.getItem('token');
    useEffect(() => {
        GetSubscriptionData();
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);
    function getPaymentMethod(details:any) {
        if (details.includes("paypal")) {
          return "paypal";
        } else if (details.includes("visa")) {
          return "visa";
        } else {
          return "other";
        }
      }
    const GetSubscriptionData = () => {
        setLoader(true);

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios
            .post(API_ENDPOINTS.GetAllSubscription, formData, { headers })
            .then((response) => {
                if (response.status === 200) {
                    const dataArray = response?.data?.data;
                    setLoader(false);
                    const formattedData = dataArray.map((item: any) => {
                        const { userPlanId, renewAuto, _id } = item;
                        const myPayment = getPaymentMethod(item.details)
                        return {
                            packagename: userPlanId?.planId?.name,
                            _id: item?._id,
                            price:userPlanId?.planId?.price,
                            email: userPlanId.userId?.email,
                            registrationType: myPayment,
                            renewAuto: userPlanId?.renewAuto ? 'Yes' : 'No',
                            cancelSubscription: userPlanId?.cancelSubscription,
                          
                            
                        };
                    });
                    // console.log(formattedData)
                    //  console.log(dataArray)
                    setInitialRecords(sortBy(formattedData, 'email'));
                } else {
                    showMessage(response?.data.message);
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                setLoader(false);
            });
    };

      
   
  
     

    const GetSubscriptionDetails = (id: any) => {
        // setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token);

        var formdata = new FormData();
        formdata.append('id', id);

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        fetch(API_ENDPOINTS.GetSubscriptionDetails, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status == 200) {
                    
                    setSubDetails(result);
                    setLoader(false);
                    // showMessage(result?.message);
                    // GetSubscriptionData()
                } else {
                    setLoader(false);
                    showMessage(result?.data?.message);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const CancelSubscription = (id: any) => {
        // setLoader(true)
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();
        formData.append('id', id);
        axios
            .post(API_ENDPOINTS.CencelSubscription, formData, { headers })
            .then((response) => {
                if (response.status === 200) {
                    // const data = response?.data?.data;
                    GetSubscriptionData();
                    showMessage('Subscription cancelled successfully');
                } else {
                    showMessage(response?.data.message);
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                // setLoader(false)
            });
    };

    //

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');

    const [filteredItems, setFilteredItems] = useState<any>();

    useEffect(() => {
        // console.log(initialRecords);
        const data = initialRecords.filter(
            (item: any) =>
                item?.packagename?.toLowerCase()?.includes(search?.toLowerCase()) ||
                item?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
                item.registrationType.toLowerCase().includes(search.toLowerCase()) ||
                item?.renewAuto?.toLowerCase()?.includes(search?.toLowerCase()) 
                ||
                item.price?.includes(search) 
        );
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData(data.slice(from, to));
    }, [search]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         const filteredData = initialRecords.filter(
    //             (item) =>
    //                 item.packagename.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.email.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.registrationType.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.renewAuto.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.price.toLowerCase().includes(search.toLowerCase())
    //             // item?.cancelSubscription?.toLowerCase()?.includes(search.toLowerCase())
    //         );

    //         setRecordsData(filteredData);
    //     }, 300);

    //     return () => clearTimeout(delayDebounceFn);
    // }, [search]);

    const saveUser = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return true;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return true;
        }
        if (!params.role) {
            showMessage('Occupation is required.', 'error');
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.name = params.name;
            user.email = params.email;
            user.phone = params.adminVerified;
            user.role = params.role;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

            let user = {
                id: maxUserId + 1,
                path: 'profile-35.png',
                name: params.name,
                email: params.email,
                phone: params.adminVerified,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: '5K',
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchContacts();
        }

        showMessage('User has been saved successfully.');
        setAddContactModal(false);
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            {loader && <Loader />}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Report List</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3"></div>
                    <div className="relative">
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="datatables mt-5 panel overflow-hidden">
                <DataTable
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={recordsData}
                    // onRowClick={() =>}
                    // onRowClick={(data) => navigate('/users/orgprofile', { state: { id: data._id, } })}
                    // onRowClick={(data) => navigate('/users/revenue-details')}
                    onRowClick={(data) => openPreviewModal(data?._id)}
                    columns={[
                        // { accessor: 'name', title: 'Name', sortable: true },
                        { accessor: 'email', sortable: true },
                        { accessor: 'registrationType', title: 'Registration Type', sortable: true },
                        {
                            accessor: 'packagename', title: 'Package Name', sortable: true,
                            render: (data) => (
                                <div className="flex gap-4 items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                  {data?.packagename}
                          
                                </div>
                            ),
                        },
                        {
                            accessor: 'price', title: 'Amount', sortable: true,
                            render: (data) => (
                                <div className="flex gap-4 items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                   {data?.price}
                                </div>
                            )
                        },
                        // { accessor: 'paymentMethod ', title: 'Payment Method ', sortable: true },
                        { accessor: 'renewAuto', title: 'Auto Renew ', sortable: true },

                        {
                            accessor: 'cancelSubscription',
                            title: 'Cancel Subscription',
                            sortable: true,
                            render: (data) => (
                                <div className="flex gap-4 items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                    {data.cancelSubscription ? (
                                        <div>
                                            <p style={{ color: 'red' }}>Cancelled</p>
                                        </div>
                                    ) : (
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => CancelSubscription(data._id)}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            ),
                        },
                    ]}
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Organization' : 'Add Organization'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Name</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Phone Number</label>
                                                <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phone} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Occupation</label>
                                                <input id="role" type="text" placeholder="Enter Occupation" className="form-input" value={params.role} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="address">Address</label>
                                                <textarea
                                                    id="location"
                                                    rows={3}
                                                    placeholder="Enter Address"
                                                    className="form-textarea resize-none min-h-[130px]"
                                                    value={params.location}
                                                    onChange={(e) => changeValue(e)}
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div>
                {isPreviewOpen && (
                    <div>
                        <Modal
                            isOpen={true}
                            onRequestClose={closePreviewModal}
                            contentLabel="Image Preview"
                            className="modal_react"
                            overlayClassName="overlay"
                        // style={{ borderRadius: 200 }}
                        >
                            <div className="">
                                <h5 className="subDetailsMainHeading text-center my-5">User Subscription Details</h5>
                                <hr
                                    className="mt-5"
                                    style={{
                                        marginTop: '0.5rem',
                                        marginBottom: '0.5rem',
                                    }}
                                ></hr>
                                <div className="">
                                    <div className="flex items-center justify-between mb-3">
                                        <h5 className="userSubHeading">User Details</h5>
                                    </div>
                                    <div className="mb-5">
                                        {subDetails?.data?.userPlanId?.userId?.firstName && !subDetails?.data?.userPlanId?.userId?.lastName ? (
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={nameIcon} alt="nameIcon" />
                                                    <button className="flex items-center leftHeading">
                                                        <span className="text-black  truncate ">Name</span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="flex items-center rightHeading">
                                                        <span className="text-primary truncate">
                                                            {subDetails?.data?.userPlanId?.userId?.firstName && subDetails?.data?.userPlanId?.userId?.lastName
                                                                ? subDetails?.data?.userPlanId?.userId?.firstName + subDetails?.data?.userPlanId?.userId?.lastName
                                                                : 'Alex Zander'}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {subDetails?.data?.userPlanId?.userId?.email ? (
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={emailIcon} alt="nameIcon" />
                                                    <button className="flex items-center leftHeading">
                                                        <span className="text-black  truncate">Email</span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="flex items-center rightHeading">
                                                        <span className="text-primary truncate">{subDetails?.data?.userPlanId?.userId?.email}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {subDetails?.data?.userPlanId?.userId?.phoneNo ? (
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={phoneIcon} alt="nameIcon" />
                                                    <button className="flex items-center leftHeading">
                                                        <span className="text-black  truncate">Phone</span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="flex items-center gap-2 rightHeading">
                                                        <span className="text-primary truncate">
                                                            {subDetails?.data?.userPlanId?.userId?.phoneNo ? subDetails?.data?.userPlanId?.userId?.phoneNo : '03027129387'}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {subDetails?.data?.userPlanId?.userId?.address ? (
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={locationIcon} alt="nameIcon" />
                                                    <button className="flex items-center leftHeading">
                                                        <span className="text-black  truncate">Address</span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="flex items-center gap-2 rightHeading">
                                                        <span className="text-primary truncate">
                                                            {subDetails?.data?.userPlanId?.userId?.address ? subDetails?.data?.userPlanId?.userId?.address : 'USA'}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>

                                <hr
                                    className=""
                                    style={{
                                        marginTop: '1.5rem',
                                        marginBottom: '1.5rem',
                                    }}
                                ></hr>

                                <div className="">
                                    <div className="flex items-center justify-between">
                                        <h5 className="userSubHeading">Payment Details</h5>
                                    </div>
                                    <div className="mb-5">
                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex items-center gap-3">
                                                <img src={packageNameIcon} alt="packageNameIcon" />
                                                <button className="flex items-center leftHeading">
                                                    <span className="text-black  truncate">Package Name</span>
                                                </button>
                                            </div>
                                            <div>
                                                <button className="flex items-center gap-2 rightHeading">
                                                    <span className="text-primary truncate">{subDetails?.data?.userPlanId?.planId?.name}</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex items-center gap-3">
                                                <img src={paymentCurrency} alt="packageNameIcon" />
                                                <button className="flex items-center leftHeading">
                                                    <span className="text-black  truncate">Amount</span>
                                                </button>
                                            </div>

                                            <div>
                                                <button className="flex items-center gap-2 rightHeading">
                                                    <span className="text-primary truncate">{subDetails?.data?.userPlanId?.planId?.price}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {subDetails?.data?.userPlanId?.planId?.paymentMethod ? (
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={paymentMethodicon} alt="packageNameIcon" />
                                                    <button className="flex items-center leftHeading">
                                                        <span className="text-black  truncate">Payment Method</span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="flex items-center gap-2 rightHeading">
                                                        <span className="text-primary truncate">Paypal</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        <div className="flex items-center justify-between mt-5">
                                            <div className="flex items-center gap-3">
                                                <img src={autoRenewIcon} alt="packageNameIcon" />
                                                <button className="flex items-center leftHeading ">
                                                    <span className="text-black  truncate">Auto Renew</span>
                                                </button>
                                            </div>
                                            <div>
                                                <button className="flex items-center gap-2 rightHeading">
                                                    <span className="text-primary truncate">{subDetails?.data?.userPlanId?.renewAuto ? 'Yes' : 'No'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {subDetails?.data?.userPlanId?.planId?.date ? (
                                            <div className="flex items-center justify-between mt-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={dateIcon} alt="dateIcon" />
                                                    <button className="flex items-center leftHeading">
                                                        <span className="text-black  truncate">Date</span>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="flex items-center gap-2 rightHeading">
                                                        <span className="text-primary truncate">04/05/2023</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {/* <div className='flex items-center justify-between mt-3'>
                                            <div>
                                                <button className="flex items-center gap-2">
                                                    <span className="text-black truncate">Status</span>
                                                </button>
                                            </div>
                                            <div>
                                                <button className="flex items-center gap-2">
                                                    <span className="text-primary truncate">Paid</span>
                                                </button>
                                            </div>

                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueList;
