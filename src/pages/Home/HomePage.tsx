import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect, useRef, useState } from 'react';
import person from '../../assets/Images/person.png';
import secureLocalStorage from 'react-secure-storage';
import API_ENDPOINTS from '../../Routes/API_routes';
import axios from 'axios';
import TextInput from '../../components/Reuseable/TextInput';
import { AiOutlineEye } from 'react-icons/ai';
import ReactModal from '../../components/Reuseable/ReactModal';
import HomeOrganizationSection from './HomeOrganizationSection';
import HomeTeacherSection from './HomeTeacherSection';
import HomeStudentSection from './HomeStudentSection';
import HomeLandingSection from './HomeLandingSection';
import HomeOurMissionSection from './HomeOurMissionSection';

const HomeSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Profile'));
    // GetUserDetail()
    GetStudentData()

  }, []);
  const [data, setData] = useState<any>();

  const token = secureLocalStorage.getItem('token')
  const { state } = useLocation();


  const GetUserDetail = () => {

    const headers = {
      Authorization: 'Bearer ' + token,
    };

    const formData = new FormData();

    axios.post(API_ENDPOINTS.stuDetails + state?.id, formData, { headers })
      .then(response => {
        setData(response?.data?.data)


      })
      .catch(error => {
        console.error('An error :', error);
      });
  }




  const [heading, setHeading] = useState('');

  const [image2, setImage2] = useState<any>(null);
  const [title, setTitle] = useState('');

  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);



  //Student states
  const [studTitle, setStudTitle] = useState('');
  const [studButtonText, setStudButtonText] = useState('');
  const [studButtonLink, setStudButtonLink] = useState('');
  const [studDescription, setStudDescription] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [image, setImage] = useState<any>(null);
  const [isPreviewOpen2, setIsPreviewOpen2] = useState(false);
  const [previewImageUrl2, setPreviewImageUrl2] = useState('');


  const [allLandingData, setAllLandingData] = useState<any>("");
  const [allStudentsData, setAllStudentsData] = useState<any>("");
  const [allOrganizationsData, setAllOrganizationsData] = useState<any>("");
  const [allTeachersData, setAllTeachersData] = useState<any>("");



  const [allOurMissionData, setAllOurMissionData] = useState<any>("");



  const navigate = useNavigate()
  useEffect(() => {
    // if (!token) {
    //   navigate('/auth/boxed-signin')
    // }
  }, [])


  const handleDescriptionChange = (value: string) => {
    setStudDescription(value);
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setPreviewImageUrl(URL.createObjectURL(selectedImage));
    }
  };



  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const openPreviewModal = () => {
    setIsPreviewOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewOpen(false);
  };




  const handleImageChange2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage2(selectedImage);
      setPreviewImageUrl2(URL.createObjectURL(selectedImage));
    }
  };



  const handleUploadButtonClick2 = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };
  const openPreviewModal2 = () => {
    setIsPreviewOpen2(true);
  };

  const closePreviewModal2 = () => {
    setIsPreviewOpen2(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const GetStudentData = () => {

    const headers = {
      Authorization: 'Bearer ' + token,
    };

    const formData = new FormData();

    axios.post(API_ENDPOINTS.GETHOMEPAGE, formData, { headers })
      .then((response: any) => {

        const data = response?.data?.data

        const landingData = data.filter((item: any) => item.key === "landingBanner");
        if (landingData.length > 0) {
          setAllLandingData(landingData[0]);
        }

        const stuData = data.filter((item: any) => item.key === "studentData");
        // console.log('stuData', stuData)
        if (stuData.length > 0) {
          setAllStudentsData(stuData[0]);
        }
        const teacherData = data.filter((item: any) => item.key === "teacherData");
        if (teacherData.length > 0) {
          setAllTeachersData(teacherData[0]);
        }
        // console.log('StudData===>', stuData)


        const orgData = data.filter((item: any) => item.key === "organizationData");
        if (orgData.length > 0) {
          setAllOrganizationsData(orgData[0]);
        }


        const ourMission = data.filter((item: any) => item.key === "missionSection");
        if (ourMission.length > 0) {
          setAllOurMissionData(ourMission[0]);
        }




      })
      .catch(error => {
        console.error('An error occurred22323234:', error);
      });
  }


  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  return (
    <div>

      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="#" className="text-primary hover:underline">
            Home Management
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Home Pages</span>
        </li>
      </ul>
      <div className="pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <HomeLandingSection />
          <HomeStudentSection data={allStudentsData} />
          <HomeOrganizationSection data={allOrganizationsData} />
          <HomeTeacherSection data={allTeachersData} />
          <HomeOurMissionSection data={allOurMissionData} />
        </div>
      </div>
      {isPreviewOpen && <ReactModal imageUrl={previewImageUrl} onClose={closePreviewModal} />}
      {isPreviewOpen2 && <ReactModal imageUrl={previewImageUrl2} onClose={closePreviewModal2} />}


    </div>
  );
};

export default HomeSection;
