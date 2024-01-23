import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import '../assets/css/switch.css';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { Loader } from '../components/Reuseable/Loader';
const NotificationList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Organization'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>(initialRecords);
    const [loader, setLoader] = useState(false);

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
        setInitialRecords(sortStatus.direction === 'desc' ? data : data);
        setPage(1);
        GetContactData();
    }, [sortStatus]);
    const token = secureLocalStorage.getItem('token');
    useEffect(() => {
        // if (!token) {
        //     navigate('/auth/boxed-signin');
        // }
    }, []);
    const GetContactData = () => {
        setLoader(true);

        const headers = {
            Authorization: 'Bearer ' + token,
        };

        axios
            .get(API_ENDPOINTS.GETNOTIFICATION, { headers })
            .then((response) => {
                if (response.status == 200) {
                    const newData = response?.data?.data;
                    setInitialRecords(newData.reverse());
                    setLoader(false);
                } else {
                    setLoader(false);
                    showMessage(response?.data.message);
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                setLoader(false);
            });
    };

    const [search, setSearch] = useState<any>('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filteredData = initialRecords.filter(
                (item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.role.toLowerCase().includes(search.toLowerCase())
            );
            setRecordsData(filteredData);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

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
                <h2 className="text-xl">Notification List</h2>
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
                    columns={[
                        { accessor: 'name', title: 'Name', sortable: true },
                        { accessor: 'email', title: 'Email', sortable: true },
                        { accessor: 'role', title: 'Role', sortable: true },
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
        </div>
    );
};

export default NotificationList;
