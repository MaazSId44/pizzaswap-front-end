// const BASE_URL = 'https://ilmcircle.be/backend/';
const BASE_URL = 'https://ilmcircle.be/backend/';



type API_ENDPOINTS = {
    LOGIN: string;

    //Organization Api Routes
    AllOrganizations: string;
    orgDetails: string;
    ORGDELETE: string;
    ORG_STATUS_UPDATE: string;
    ORG_VERIFY: string;

    //Student Api Routes
    AllStudents: string;
    Stu_Status_UPDATE: string;
    STUDELETE: string;
    stuDetails: string;

    //Events Api Routes
    AllEvents: string;
    CreateEvents: string;
    UpdateEvents: string;
    EventsDetails: string;
    EVENTDELETE: string;

    //Reports Mangement Api Routes
    GetAllSubscription: string;
    GetSubscriptionDetails: string;
    CencelSubscription: string;

    //Contact us
    ContactUsList: string;

    //referral
    SETTINGS: string;
    SETTINGSUPDATE: string;

    //HomPage module
    GETHOMEPAGE: string;
    LANDINGBANNER: string;
    UPDATEHOMEDATA: string;
    UPDATEMISSIONDATA: string;
    LANDINGSECTION: string;
    HOMEPAGEBANNER: string;

    LOGOUT: string;
    FORGETPASSWORD: string;
    PROFILEUPDATE: string;
    STATUS: string;
    GETABOUT: string;
    UPDATEABOUT: string;
    GETCONTACT: string;
    UPDATECONTACT: string;
    UPDATEPLAN: string;
    CREATEPLAN: string;
    GETPLAN: string;
    DELETEPLAN: string;
    UPDATEFAQ: string;
    CREATEFAQ: string;
    GETFAQ: string;
    DELETEFAQ: string;
    GETNOTIFICATION: string;
};

const API_ENDPOINTS: API_ENDPOINTS = {
    LOGIN: BASE_URL + 'api/user/adminlogin',
    //Student Api Routes
    AllOrganizations: BASE_URL + 'api/user/admin/allorganization',
    orgDetails: BASE_URL + 'api/user/admin/organization/',
    ORGDELETE: BASE_URL + 'api/user/admin/organization/delete',
    ORG_STATUS_UPDATE: BASE_URL + 'api/user/admin/organization/update/status',
    ORG_VERIFY: BASE_URL + 'api/user/admin/organization/update/verify',
    //Student Api Routes
    AllStudents: BASE_URL + 'api/user/admin/allstudents',
    Stu_Status_UPDATE: BASE_URL + 'api/user/admin/student/update/status',
    STUDELETE: BASE_URL + 'api/user/admin/student/delete',
    stuDetails: BASE_URL + 'api/user/admin/student/',

    //HomPage module
    GETHOMEPAGE: BASE_URL + 'api/admin/home/get',
    LANDINGBANNER: BASE_URL + 'api/admin/home/landing/banner/update',
    UPDATEHOMEDATA: BASE_URL + 'api/admin/home/section/update',
    UPDATEMISSIONDATA: BASE_URL + 'api/admin/home/mission/update',
    LANDINGSECTION: BASE_URL + 'api/admin/home/landing/banner/update',
    HOMEPAGEBANNER: BASE_URL + 'api/admin/home/banner/update',

    //Events Api Routes
    AllEvents: BASE_URL + 'api/admin/event/allevents',
    CreateEvents: BASE_URL + 'api/admin/event/create',
    UpdateEvents: BASE_URL + 'api/admin/event/update',
    EventsDetails: BASE_URL + 'api/admin/event/',
    EVENTDELETE: BASE_URL + 'api/admin/event/delete',

    //Contact us
    ContactUsList: BASE_URL + 'api/admin/contactus/allmessage',
    //Notification
    GETNOTIFICATION: BASE_URL + 'api/admin/notify/get',

    //Reports Mangement Api Routes
    GetAllSubscription: BASE_URL + 'api/admin/subscription/all',
    GetSubscriptionDetails: BASE_URL + 'api/admin/subscription/detail',
    CencelSubscription: BASE_URL + 'api/admin/subscription/cancel',

    //referral
    SETTINGS: BASE_URL + 'api/admin/setting',
    SETTINGSUPDATE: BASE_URL + 'api/admin/setting/update',

    LOGOUT: BASE_URL + '',
    FORGETPASSWORD: BASE_URL + '',
    PROFILEUPDATE: BASE_URL + '',
    STATUS: BASE_URL + '',
    GETABOUT: BASE_URL + 'api/admin/about/all',
    UPDATEABOUT: BASE_URL + 'api/admin/about/update',
    GETCONTACT: BASE_URL + 'api/admin/contactus/all',
    UPDATECONTACT: BASE_URL + 'api/admin/contactus/update',
    UPDATEPLAN: BASE_URL + 'api/admin/package/update',
    CREATEPLAN: BASE_URL + 'api/admin/package/create',
    GETPLAN: BASE_URL + 'api/admin/package/all',
    DELETEPLAN: BASE_URL + 'api/admin/package/delete',
    UPDATEFAQ: BASE_URL + 'api/admin/faq/update',
    CREATEFAQ: BASE_URL + 'api/admin/faq/create',
    GETFAQ: BASE_URL + 'api/admin/faq/all',
    DELETEFAQ: BASE_URL + 'api/admin/faq/delete',
};

export default API_ENDPOINTS;
