import { useState, Fragment, useEffect, ChangeEvent, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { BiArrowToTop, BiPlus } from 'react-icons/bi';
import sortBy from 'lodash/sortBy';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import img1 from '../assets/Images/FAQ.svg';
import { format, set } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';
import { Loader } from '../../components/Reuseable/Loader';
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { FaRegMap } from "react-icons/fa";
import "./mycss.css"

interface Params {
    startingTime: Date | null;
    endTime: Date | null;
}

interface Location {
    lat: number;
    lng: number;
}
const EventsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Events-list'));
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
        entranceFee: '',
        eventDetail: '',
        gender: '',
        startingTime: '',
        endTime: '',
        eventTime: "",
    });

    const formatTime = (time24: any) => {
        const [hours, minutes] = time24.split(":");
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour > 12 ? hour - 12 : hour;
        const formattedTime = `${formattedHour}:${minutes} ${period}`;
        return formattedTime;
    };
    const parseTime = (formattedTime: string) => {
        const [timePart, period] = formattedTime.split(" ");
        const [hours, minutes] = timePart.split(":");
        const isPM = period.toUpperCase() === "PM";
        const formattedHours = isPM ? parseInt(hours, 10) + 12 : parseInt(hours, 10);

        const paddedHours = formattedHours.toString().padStart(2, "0");
        const paddedMinutes = minutes.padStart(2, "0");

        return `${paddedHours}:${paddedMinutes}`;
    };

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [deletedImages, setDeletedImages] = useState<Object[]>([]);
    const [previousImages, setPreviousImages] = useState<string[]>([]);
    const [dataImages, setDataImages] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const maxImages = 10;

    const token = secureLocalStorage.getItem('token');
    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin')
        // }
    }, [])

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedImageArray = Array.from(files).slice(0, maxImages - selectedImages.length);
            setSelectedImages(selectedImageArray);

            const imagePreviewArray = selectedImageArray.map((image) => URL.createObjectURL(image));
            setImagePreviews(imagePreviewArray);

            // Clear the input value to allow selecting the same file again
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };




    const handleDeleteImage = (imageId: number, old: boolean) => {
        const newSelectedImages = selectedImages.filter((image, index: number) => index !== imageId);
        const newImagePreviews = imagePreviews.filter((previewUrl, index: number) => index !== imageId);
        setSelectedImages(newSelectedImages);
        setImagePreviews(newImagePreviews);

        if (old) {
            const del = dataImages.filter((image: any) => image.id == imageId);
            const set = dataImages.filter((image: any) => image.id != imageId);
            setDeletedImages([...deletedImages, ...del]);
            setDataImages(set);
        }
    };

    const handlePlusIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin')
        // }
    }, [])

    const [search, setSearch] = useState<any>('');

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    const saveUser = (): any => {

        if (!selectedImages.length && !previousImages.length) {
            showMessage('Images are required.', 'error');
            return true;
        }

        if (!params.eventName) {
            showMessage('Event name is required.', 'error');
            return true;
        }

        if (!params.entranceFee) {
            showMessage('EntranceFee is required.', 'error');
            return true;
        }

        if (!params.gender) {
            showMessage('Gender is required.', 'error');
            return true;
        }
        if (!params.contactInfo) {
            showMessage('Phone number is required.', 'error');
            return true;
        }


        if (!params.eventDetail) {
            showMessage('Event Details is required.', 'error');
            return true;
        }

        if (!params.startingTime) {
            showMessage('Starting time is required.', 'error');
            return true;
        }

        if (!params.endTime) {
            showMessage('End time is required.', 'error');
            return true;
        }
        if (!params.endTime) {
            showMessage('End time is required.', 'error');
            return true;
        }
        if (!params.location?.location && (!selectedLocation?.lat && !selectedLocation?.lng && !inputValue)) {
            showMessage('Location is required.', 'error');
            return true;
        }

        setLoading(true);
        if (params._id) {
            //update
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const formattedTime = formatTime(params.eventTime);

            const data = new FormData();

            const locationData = {
                location: inputValue,
                lat: selectedLocation?.lat,
                long: selectedLocation?.lng,
            };
            const updateLocation = JSON.stringify(locationData)
            params.location = updateLocation;
            data.append('eventName', params?.eventName);
            data.append('startingTime', params?.startingTime ? format(params?.startingTime, 'MM/dd/yyyy') : '');
            data.append('endTime', params?.endTime ? format(params?.endTime, 'MM/dd/yyyy') : '');
            data.append('location', params?.location);
            data.append('entranceFee', params?.entranceFee);
            data.append('eventDetail', params?.eventDetail);
            data.append('gender', params?.gender);
            data.append('eventTime', formattedTime);
            data.append('contactInfo', params?.contactInfo);
            data.append('id', params?._id);
            selectedImages.forEach((file) => {
                data.append(`images`, file);
            });
            data.append('deleteImages', JSON.stringify(deletedImages));
            data.append('previousImages', JSON.stringify(previousImages));
            axios
                .post(API_ENDPOINTS.UpdateEvents, data, { headers })
                .then((response) => {
                    if (response.status == 200) {
                        showMessage(response?.data?.message);
                        setAddContactModal(false);
                        setLoading(false);
                        GetEventsData();
                        setTime("")
                    } else {
                        showMessage(response?.data?.message);
                        setLoading(false);

                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log('error', error);
                });

        }
        else {
            // add
            const formattedTime = formatTime(params.eventTime);

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const data = new FormData();
            const locationData = {
                location: inputValue,
                lat: selectedLocation?.lat,
                long: selectedLocation?.lng,
            };
            const updateLocation = JSON.stringify(locationData)

            params.location = updateLocation;
            data.append('eventName', params?.eventName);
            data.append('startingTime', params?.startingTime ? format(params?.startingTime, 'MM/dd/yyyy') : '');
            data.append('endTime', params?.endTime ? format(params?.endTime, 'MM/dd/yyyy') : '');
            data.append('location', params?.location);
            data.append('entranceFee', params?.entranceFee);
            data.append('eventDetail', params?.eventDetail);
            data.append('gender', params?.gender);
            data.append('eventTime', formattedTime);
            data.append('contactInfo', params?.contactInfo);
            selectedImages.forEach((image, index) => {
                // console.log('images-->', image)
                data.append('images', image);
            });
            // data.append("images", FileInput.files[0], "/C:/Users/MaaZU/Desktop/download.jpg");

            axios
                .post(API_ENDPOINTS.CreateEvents, data, { headers })
                .then((response) => {
                    if (response.status == 200 || response.status == 201) {
                        showMessage(response?.data?.message);
                        setAddContactModal(false);
                        setLoading(false);
                        GetEventsData();
                        setTime("")
                    } else {
                        showMessage(response?.data?.message);
                        setLoading(false);

                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log('error', error);
                });


        }
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setDeletedImages([]);
        setSelectedImages([]);
        setImagePreviews([]);
        if (user) {
            setPreviousImages(user.images);
            setDataImages(user.images);
            const editedUser = { ...user };
            editedUser.startingTime = user.startingTime ? new Date(user.startingTime) : null;
            editedUser.endTime = user.endTime ? new Date(user.endTime) : null;
            setParams(editedUser);
        } else {
            setPreviousImages([]);
            setDataImages([]);
            setParams(json);
        }
        setAddContactModal(true);
    };

    const deleteUser = (userId: any = null) => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        const data = initialRecords.filter((d: any) => d.id !== userId);
        setInitialRecords(data);
        setRecordsData(data.slice(from, to));
        showMessage('User has been deleted successfully.');
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
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>(initialRecords);
    const [loading, setLoading] = useState(false);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

    //
    useEffect(() => {
        GetEventsData();
    }, []);

    //Getting All Events Data
    const GetEventsData = () => {
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();

        axios
            .post(API_ENDPOINTS.AllEvents, formData, { headers })
            .then((response) => {
                if (response.status == 200) {

                    const newData = response?.data?.data;

                    const parsedData = newData?.map((item: any) => {
                        if (item?.location && item?.location !== '[object Object]') {
                            try {
                                const locationString = item?.location?.replace(/^"(.*)"$/, "$1");
                                item.location = JSON.parse(locationString);
                            } catch (error) {
                                console.error(`Error parsing location --->:`, error);
                            }
                        }
                        if (item?.eventTime) {
                            item.eventTime = parseTime(item.eventTime);
                        }

                        return item;
                    });

                    setInitialRecords(sortBy(parsedData.reverse(), 'firstName'));
                    setLoading(false);
                } else {
                    setLoading(false);
                    showMessage(response?.data.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error('An error occurred:', error);
                // setLoader(false)
            });
    };

    //Delete Orgnization
    const DeleteEvent = (id: any) => {
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + token,
        };

        const formData = new FormData();
        formData.append('isDeleted', 'true');
        formData.append('id', id);

        axios
            .delete(API_ENDPOINTS.EVENTDELETE, {
                headers: headers,
                data: formData,
            })
            .then((response) => {
                if (response.status == 200) {
                    setLoading(false);
                    showMessage(response?.data?.message);
                    GetEventsData();
                } else {
                    setLoading(false);
                    showMessage(response?.data?.message);
                }
            })
            .catch((error) => {
                setLoading(false);

                console.error('An error occurred:', error);
            });
    };

    useEffect(() => {
        // console.log(initialRecords)
        const data = initialRecords.filter(
            (item: any) =>
                item.eventName.toLowerCase().includes(search.toLowerCase()) ||
                item.gender.toLowerCase().includes(search.toLowerCase()) ||
                item.eventDetail.toLowerCase().includes(search.toLowerCase()) ||
                item.location?.locaion?.toLowerCase().includes(search.toLowerCase()) ||
                item.startingTime.toLowerCase().includes(search.toLowerCase()) ||
                item.endTime.toLowerCase().includes(search.toLowerCase()) ||
                item.endTime.toLowerCase().includes(search.toLowerCase()) ||
                item.contactInfo.toLowerCase().includes(search.toLowerCase()) ||
                item.entranceFee.toLowerCase().includes(search.toLowerCase())
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

    const changeValue2 = (fieldName: keyof Params, value: Date | null) => {
        setParams((prevParams: any) => ({
            ...prevParams,
            [fieldName]: value
        }));
    };
    const apiKey = "AIzaSyC5ESP8Wjb2mmTJmHdg3M6Kpmt765jPE44";
    const [inputValue, setInputValue] = useState<any>('');
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 0,
        lng: 0,
    });

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const [showMap, setShowMap] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [fullAddress, setFullAddress] = useState('');
    const [location, setLocation] = useState("");
    const [time, setTime] = useState<any>("");
    const [selectedTime, setSelectedTime] = useState<any>(null);

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place && place.geometry && place.geometry.location) {
                const location: Location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setSelectedLocation(location);
                setInputValue(place?.formatted_address)
            }
        }
    };

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {

        setAutocomplete(autocomplete);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const myLocation: Location = {
        lat: params?.location?.lat || 0,
        lng: params?.location?.long || 0,
    };

    useEffect(() => {
        setSelectedLocation({
            lat: params?.location?.lat,
            lng: params?.location?.long,
        })
        setInputValue(params?.location?.location)
    }, [params])
    useEffect(() => {
        setSelectedLocation({
            lat: params?.location?.lat,
            lng: params?.location?.long
        })
    }, [navigator.geolocation, params])


    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    return (
        <div>
            {loading && <Loader />}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Events List</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <svg className="ltr:mr-2 rtl:ml-2" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 8.51852C8.05682 8.51852 6.48148 10.0939 6.48148 12.037C6.48148 13.9802 8.05682 15.5556 10 15.5556C11.9432 15.5556 13.5185 13.9802 13.5185 12.037C13.5185 10.0939 11.9435 8.51852 10 8.51852ZM10 9.47811C10.1766 9.47811 10.3199 9.62141 10.3199 9.79798V11.7172H12.2391C12.4156 11.7172 12.5589 11.8605 12.5589 12.037C12.5589 12.2136 12.4156 12.3569 12.2391 12.3569H10.3199V14.2761C10.3199 14.4527 10.1766 14.596 10 14.596C9.82343 14.596 9.68013 14.4527 9.68013 14.2761V12.3569H7.76094C7.58438 12.3569 7.44108 12.2136 7.44108 12.037C7.44108 11.8605 7.58438 11.7172 7.76094 11.7172H9.68013V9.79798C9.68013 9.62141 9.82343 9.47811 10 9.47811Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M3.61111 0C1.6267 0 0 1.6267 0 3.61111V16.3889C0 18.3733 1.6267 20 3.61111 20H16.3889C18.3733 20 20 18.3733 20 16.3889V3.61111C20 1.6267 18.3733 0 16.3889 0H3.61111ZM3.61111 1.66667H16.3889C17.4723 1.66667 18.3333 2.52774 18.3333 3.61111V4.44444H1.66667V3.61111C1.66667 2.52774 2.52774 1.66667 3.61111 1.66667ZM1.66667 6.11111H18.3333V16.3889C18.3333 17.4723 17.4723 18.3333 16.3889 18.3333H3.61111C2.52774 18.3333 1.66667 17.4723 1.66667 16.3889V6.11111Z"
                                        fill="white"
                                    />
                                </svg>
                                Add Events
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Events" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="datatables mt-5 panel overflow-hidden">
                <DataTable
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    onRowClick={(data) => navigate('/eventdetail', { state: { id: data._id } })}
                    records={recordsData}
                    columns={[
                        {
                            accessor: 'path',
                            title: 'Event Images',
                            sortable: true,
                            render: (event) => (
                                <div className="flex items-center w-max space-x-[-1.5rem]">
                                    {event?.images.slice(0, 3).map((item: any, index: number) => (
                                        <div key={index}>
                                            <img key={index} className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover" src={item?.url} alt={`event-image-${index}`} />
                                        </div>
                                    ))}
                                    {event?.images.length > 3 && (
                                        <div className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 bg-gray-300 flex items-center justify-center">
                                            <span className="text-xs">{`+${event?.images.length - 3}`}</span>
                                        </div>
                                    )}
                                </div>
                            ),
                        },

                        {
                            accessor: 'eventName', title: 'Event Name', sortable: true,
                            render: (event) => (
                                <div>
                                    
                                    {event?.eventName.length > 40 ?
                                        `${event?.eventName.substring(0, 40)}...` :
                                        event?.eventName
                                    }
                                </div>
                            ),

                        },
                        { accessor: 'gender', title: 'Gender', sortable: true },
                        { accessor: 'eventTime', title: 'Event Time', sortable: true },

                        { accessor: 'contactInfo', title: 'Phone', sortable: true },
                        {
                            accessor: 'eventDetail', title: 'Event details', sortable: true,
                            render: (event) => (
                                <div>
                                    {event?.eventDetail.length > 40 ?
                                        `${event?.eventDetail.substring(0, 40)}...` :
                                        event?.eventDetail
                                    }
                                </div>
                            ),


                        },
                        {
                            accessor: 'location',
                            title: 'Location',
                            sortable: true,
                            render: (event) => (
                                <div>
                                    {event?.location?.location.length > 40 ?
                                        `${event?.location?.location.substring(0, 40)}...` :
                                        event?.location?.location
                                    }
                                </div>
                            ),
                        },
                        { accessor: 'entranceFee', title: 'Entrance fee', sortable: true },
                        { accessor: 'startingTime', title: 'Start date', sortable: true },
                        { accessor: 'endTime', title: 'End data', sortable: true },
                        {
                            accessor: 'actions',
                            title: 'Actions',
                            sortable: true,
                            render: (contact) => (
                                <div className="flex gap-4 items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => DeleteEvent(contact._id)}>
                                        Delete
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    // onRowClick={() => navigate('/eventdetail')}
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
                <Dialog style={{ height: 300 }} as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
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

                                <Dialog.Panel style={{ height: '80vh', overflowY: 'scroll' }} className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
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
                                        {params._id ? 'Edit Events' : 'Add Events'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div>
                                                <label
                                                    htmlFor="upload-button"
                                                    className="eventUploadFile w-100 text-center point bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-5"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <div className="selected-images-container flex justify-center flex-wrap gap-3">
                                                        {dataImages.map((item: any) => (
                                                            <div key={item.id} className="selected-image-container relative">
                                                                <img src={item.url} alt={`Selected`} className="selected-image" style={{ width: 100, height: 80 }} />
                                                                <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 21, background: '#fff' }}>
                                                                    <button className="delete-button mb-0" style={{}} onClick={() => handleDeleteImage(item.id, true)}>
                                                                        X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {imagePreviews.map((previewUrl, index) => (
                                                            <div key={previewUrl} className="selected-image-container relative">
                                                                <img src={previewUrl} alt={`Selected`} className="selected-image" style={{ width: 100, height: 80 }} />
                                                                <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 21, background: '#fff' }}>
                                                                    <button className="delete-button mb-0" style={{}} onClick={() => handleDeleteImage(index, false)}>
                                                                        X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {selectedImages.length < maxImages && (
                                                            <div
                                                                style={{ width: 90, height: 90 }}
                                                                className="add-more-icon border-4 cursor-pointer flex justify-center items-center"
                                                                onClick={handlePlusIconClick}
                                                            >
                                                                <BiPlus color="black" className="text-4xl" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h3 className="mt-3 text-xl">Upload your file* here</h3>
                                                    <h4 className="text-base">*Available format: Jpg, Png, jpeg</h4>
                                                </label>

                                                <input
                                                    type="file"
                                                    id="upload-button"
                                                    accept="image/png, image/gif, image/jpeg"
                                                    className="hidden"
                                                    multiple
                                                    ref={fileInputRef}
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="name">Event name</label>
                                                <input id="eventName" type="text" placeholder="Event Name" className="form-input" value={params.eventName} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="event">Entrance fee</label>
                                                <select id="entranceFee" className="form-select" value={params.entranceFee} onChange={(e) => changeValue(e)}>
                                                    <option disabled value="">
                                                        Select entrance fee
                                                    </option>
                                                    <option value="Fee entrance">Fee entrance</option>
                                                    <option value="Paid entrance">Paid entrance</option>
                                                </select>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Contact information</label>
                                                <input
                                                    id="contactInfo"
                                                    type="number"
                                                    placeholder="Enter Phone Number"
                                                    className="form-input"
                                                    value={params.contactInfo}
                                                    onChange={(e) => changeValue(e)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'e' || e.key === 'E') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    pattern="[0-9]*"
                                                    inputMode="numeric"
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="occupation">Event details</label>
                                                <input
                                                    id="eventDetail"
                                                    type="text"
                                                    placeholder="Enter event details"
                                                    className="form-input"
                                                    value={params.eventDetail}
                                                    onChange={(e) => changeValue(e)}
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label>Select Time</label>
                                                <input
                                                    type="time"
                                                    id="eventTime"
                                                    className="form-input"
                                                    onChange={(e) => changeValue(e)}
                                                    value={params.eventTime}

                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="gender">Gender</label>
                                                <select id="gender" className="form-select" value={params.gender} onChange={(e) => changeValue(e)}>
                                                    <option disabled value="">
                                                        Select gender
                                                    </option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="male and female">Male and Female</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="mb-5">
                                                    <label htmlFor="startingTime">Start Date</label>
                                                    <DatePicker
                                                        id="startingTime"
                                                        selected={params.startingTime ? params.startingTime : null}
                                                        onChange={date => changeValue2('startingTime', date)}
                                                        timeIntervals={15}
                                                        dateFormat="MM/dd/yyyy"
                                                        minDate={moment().toDate()}
                                                        maxDate={params.endTime ? moment(params.endTime).toDate() : null}
                                                        className="form-input"
                                                        placeholderText="Select start date"
                                                    />
                                                </div>

                                                <div className="mb-5">
                                                    <label htmlFor="endTime">End Date</label>
                                                    <DatePicker
                                                        id="endTime"
                                                        selected={params.endTime ? params.endTime : ''}
                                                        onChange={date => changeValue2('endTime', date)}
                                                        timeIntervals={15}
                                                        minDate={params.startingTime ? moment(params.startingTime).toDate() : moment().toDate()}
                                                        dateFormat="MM/dd/yyyy"
                                                        className="form-input"
                                                        placeholderText="Select end date"
                                                    />
                                                </div>
                                            </div>
                                            <div className="position-relative">
                                                <label htmlFor="address">Location</label>
                                                <LoadScript googleMapsApiKey={apiKey} libraries={["places", "geometry", "visualization"]}>
                                                    <Autocomplete
                                                        onLoad={onLoad}
                                                        onPlaceChanged={handlePlaceSelect}
                                                    >
                                                        <input className="inputFields form-input w-100"
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={handleInputChange}
                                                            placeholder="Seclect the location "

                                                        />
                                                    </Autocomplete>
                                                    <div className='position-relative'>

                                                        <FaRegMap
                                                            onClick={() => setShowMap(!showMap)}
                                                            className="map-icon"

                                                        />
                                                    </div>
                                                    {showMap &&
                                                        <div style={{ height: "400px", width: "100%" }}>
                                                            <GoogleMap
                                                                center={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                                                                zoom={15}
                                                                options={options}
                                                                mapContainerStyle={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                }}
                                                            ><Marker
                                                                    key={`${selectedLocation.lat}-${selectedLocation.lng}`}
                                                                    position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />

                                                            </GoogleMap>
                                                        </div>
                                                    }
                                                </LoadScript>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params._id ? 'Update' : 'Add'}
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
        </div>
    );
};

export default EventsList;







