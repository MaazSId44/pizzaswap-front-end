import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import { useFormik } from "formik";
import { LoginSchema } from "../../Schemas/LoginScheme";
import axios from 'axios';
import API_ENDPOINTS from '../../Routes/API_routes';
import secureLocalStorage from 'react-secure-storage';
import { showMessage } from '../../components/Reuseable/Tostify';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    const token = secureLocalStorage.getItem('token')
    // alert(token)
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])
    const [flag, setFlag] = useState(themeConfig.locale);
    const initialValues = {
        email: "",
        password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: LoginSchema,
            validateOnChange: true,
            validateOnBlur: false,
            onSubmit: (values, action) => {
                const apiUrl = API_ENDPOINTS.LOGIN;
                const formData = new FormData();
                formData.append("email", values.email);
                formData.append("password", values.password);

                axios.post<any>(apiUrl, formData)
                    .then(response => {
                        if (response.status == 200) {
                            // console.log(response)
                            secureLocalStorage.setItem('token', response.data?.data?.accessToken)
                            secureLocalStorage.setItem('email', response.data?.data?.data?.email)
                            secureLocalStorage.setItem('role', response.data?.data?.data?.role)
                            showMessage(response.data?.message)
                            navigate('/');
                            // } else {
                        } else {
                            showMessage(response.data?.data?.message)

                        }


                    })
                    .catch(error => {
                        // console.error('An error occurred:', error);
                        showMessage(error?.response?.data?.message, 'error')

                    });

            },
        });

    // const submitForm = () => {
    //     navigate('/');
    // };

    return (
        <div>
            {/* <div className="absolute inset-0">
                <img src="/assets/images/signInBackground.png" alt="image" className="h-full w-full object-cover" />
            </div> */}

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/signInBackground.png)] bg-cover bg-center bg-no-repeat px-6 py-10  sm:px-16">
                {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
                <div className="relative w-full max-w-[700px] rounded-md ">
                    <div className="relative flex flex-col justify-center rounded-[20px] bg-[#fcfcfc] backdrop-blur-lg dark:bg-black/50 px-6 h-[500px] ">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className='flex justify-center'>
                                <svg width="250" height="58" viewBox="0 0 600 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.06396 12.4367H29.456V107.637H6.06396V12.4367ZM258.203 60.0368C258.203 65.8392 259.517 70.8712 262.147 75.1328C264.776 79.3032 268.221 82.4768 272.483 84.6528C276.835 86.8288 281.595 87.9168 286.763 87.9168C291.296 87.9168 295.285 87.3272 298.731 86.1488C302.176 84.97 305.259 83.4288 307.979 81.5248C310.699 79.6208 313.101 77.5808 315.187 75.4048V100.157C311.379 103.149 307.208 105.506 302.675 107.229C298.141 108.951 292.384 109.813 285.403 109.813C277.787 109.813 270.76 108.634 264.323 106.277C257.885 103.919 252.355 100.519 247.731 96.0768C243.107 91.634 239.525 86.3752 236.987 80.3008C234.448 74.226 233.179 67.4712 233.179 60.0368C233.179 52.602 234.448 45.8472 236.987 39.7727C239.525 33.6981 243.107 28.4394 247.731 23.9967C252.355 19.5541 257.885 16.1541 264.323 13.7967C270.76 11.4394 277.787 10.2607 285.403 10.2607C292.384 10.2607 298.141 11.1221 302.675 12.8447C307.208 14.5674 311.379 16.9247 315.187 19.9167V44.6688C313.101 42.4928 310.699 40.4528 307.979 38.5487C305.259 36.5541 302.176 35.0127 298.731 33.9247C295.285 32.7461 291.296 32.1567 286.763 32.1567C281.595 32.1567 276.835 33.2447 272.483 35.4207C268.221 37.5967 264.776 40.77 262.147 44.9408C259.517 49.1112 258.203 54.1432 258.203 60.0368Z" fill="#FF8E00" />
                                    <path d="M47.5864 1.55664H68.2584V107.637H47.5864V1.55664ZM179.715 67.3807V107.637H159.043V69.5567C159.043 65.7487 158.408 62.8927 157.139 60.9887C155.96 58.9939 153.966 57.9967 151.155 57.9967C149.342 57.9967 147.71 58.4499 146.259 59.3567C144.899 60.1727 143.811 61.4419 142.995 63.1647C142.27 64.8871 141.907 67.0179 141.907 69.5567V107.637H121.235V69.5567C121.235 65.7487 120.6 62.8927 119.331 60.9887C118.152 58.9939 116.158 57.9967 113.347 57.9967C111.534 57.9967 109.902 58.4499 108.451 59.3567C107.091 60.1727 106.003 61.4419 105.187 63.1647C104.462 64.8871 104.099 67.0179 104.099 69.5567V107.637H84.2428V45.0767H104.099V54.3247C105.822 50.9699 108.179 48.3407 111.171 46.4367C114.254 44.5327 117.926 43.5807 122.187 43.5807C127.083 43.5807 130.982 44.4871 133.883 46.3007C136.784 48.0231 138.87 50.5619 140.139 53.9167C142.406 50.6527 145.216 48.1139 148.571 46.3007C151.926 44.4871 155.734 43.5807 159.995 43.5807C164.891 43.5807 168.744 44.5327 171.555 46.4367C174.456 48.2499 176.542 50.9247 177.811 54.4607C179.08 57.9967 179.715 62.3031 179.715 67.3807ZM330.714 21.5486C330.714 18.2846 331.893 15.6553 334.25 13.6606C336.607 11.5753 339.418 10.5326 342.682 10.5326C346.037 10.5326 348.847 11.5753 351.114 13.6606C353.471 15.6553 354.65 18.2846 354.65 21.5486C354.65 24.8126 353.471 27.4873 351.114 29.5726C348.847 31.658 346.037 32.7006 342.682 32.7006C339.418 32.7006 336.607 31.658 334.25 29.5726C331.893 27.4873 330.714 24.8126 330.714 21.5486ZM332.754 45.0767H352.61V107.637H332.754V45.0767ZM389.788 45.0767V107.637H369.524V45.0767H389.788ZM407.876 66.2927C406.788 65.2047 405.608 64.3431 404.34 63.7087C403.161 63.0739 401.665 62.7567 399.852 62.7567C397.857 62.7567 396.089 63.3007 394.548 64.3887C393.007 65.4767 391.828 67.0631 391.012 69.1487C390.196 71.2339 389.788 73.7727 389.788 76.7647L384.892 69.5567C384.892 64.5699 385.844 60.1271 387.748 56.2287C389.743 52.3299 392.327 49.2471 395.5 46.9807C398.673 44.7139 401.983 43.5807 405.428 43.5807C407.696 43.5807 409.872 44.0339 411.956 44.9407C414.04 45.8471 415.628 47.1167 416.716 48.7487L407.876 66.2927ZM440.716 76.3567C440.716 79.7111 441.444 82.6127 442.892 85.0607C444.344 87.4179 446.34 89.2767 448.876 90.6367C451.508 91.9967 454.316 92.6767 457.308 92.6767C459.848 92.6767 462.252 92.3139 464.516 91.5887C466.876 90.7727 469.004 89.6847 470.908 88.3247C472.904 86.9647 474.536 85.2871 475.804 83.2927V103.285C473.628 105.007 470.908 106.413 467.644 107.501C464.38 108.498 460.392 108.997 455.676 108.997C448.788 108.997 442.576 107.637 437.044 104.917C431.604 102.197 427.3 98.3887 424.124 93.4927C421.044 88.5967 419.5 82.8847 419.5 76.3567C419.5 69.7379 421.044 64.0259 424.124 59.2207C427.3 54.3247 431.604 50.5167 437.044 47.7967C442.576 45.0767 448.788 43.7167 455.676 43.7167C460.392 43.7167 464.38 44.2607 467.644 45.3487C470.908 46.3459 473.628 47.6151 475.804 49.1567V69.2847C474.536 67.2899 472.86 65.6127 470.772 64.2527C468.78 62.8927 466.604 61.8499 464.244 61.1247C461.888 60.3991 459.576 60.0367 457.308 60.0367C454.316 60.0367 451.508 60.7619 448.876 62.2127C446.34 63.6631 444.344 65.6127 442.892 68.0607C441.444 70.5087 440.716 73.2739 440.716 76.3567ZM490.648 1.55664H511.32V107.637H490.648V1.55664ZM559.128 108.997C551.876 108.997 545.576 107.682 540.224 105.053C534.968 102.333 530.888 98.5247 527.984 93.6287C525.084 88.7327 523.632 82.9751 523.632 76.3567C523.632 69.6471 525.04 63.8447 527.848 58.9487C530.66 54.0527 534.696 50.2899 539.952 47.6607C545.304 45.0311 551.604 43.7167 558.856 43.7167C566.112 43.7167 572.232 44.9859 577.216 47.5247C582.204 49.9727 586.012 53.5539 588.64 58.2687C591.272 62.9831 592.584 68.6951 592.584 75.4047C592.584 76.4019 592.584 77.3991 592.584 78.3967C592.584 79.3031 592.496 80.0739 592.312 80.7087H535.192V69.2847H573.816L568.92 75.5407C569.376 74.9059 569.736 74.1351 570.008 73.2287C570.372 72.2311 570.552 71.4151 570.552 70.7807C570.552 68.0607 570.056 65.7031 569.056 63.7087C568.06 61.7139 566.656 60.1727 564.84 59.0847C563.028 57.9967 560.896 57.4527 558.448 57.4527C555.368 57.4527 552.784 58.1327 550.696 59.4927C548.612 60.8527 547.024 62.9379 545.936 65.7487C544.94 68.4687 544.396 71.9139 544.304 76.0847C544.304 79.8927 544.848 83.1567 545.936 85.8767C547.024 88.5967 548.656 90.6819 550.832 92.1327C553.008 93.4927 555.684 94.1727 558.856 94.1727C562.484 94.1727 565.568 93.4927 568.104 92.1327C570.736 90.7727 572.82 88.7327 574.36 86.0127L592.72 90.5007C589.456 96.6659 585.016 101.29 579.392 104.373C573.864 107.455 567.108 108.997 559.128 108.997Z" fill="black" />
                                </svg>

                            </div>
                            <div className="mb-5 mt-5">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-[#272d37] md:text-3xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <div>
                                            <input
                                                id="Email"
                                                type="email"
                                                placeholder="Enter Email"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}

                                            />
                                        </div>

                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    opacity="0.5"
                                                    d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    {errors.email && touched.email ? (
                                        <p className="form-error">{errors.email}</p>
                                    ) : null}
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            type="password"
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    opacity="0.5"
                                                    d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    {errors.password && touched.password ? (
                                        <p className="form-error">{errors.password}</p>
                                    ) : null}
                                </div>
                                <button type="submit" className="bg-[#ffb962] h-[38px] rounded-[0.375rem] text-[#404040] !mt-6 w-full font-[700] border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
