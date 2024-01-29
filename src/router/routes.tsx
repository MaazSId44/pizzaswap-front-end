import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));

const BuyPizza = lazy(() => import('../pages/Apps/BuyPizza'));

const Profile = lazy(() => import('../pages/Users/Profile'));
const RevenueDetails = lazy(() => import('../pages/Users/RevenueDetails'));
const Landing = lazy(() => import('../pages/LandingPage'));
const NotificationList = lazy(() => import('../pages/Notifications'));

const OrgProfile = lazy(() => import('../pages/Users/OrgDetail'));
const Trade = lazy(() => import('../pages/Trade/Trade'));
const Staking = lazy(() => import('../pages/Staking/Staking'));

const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const About = lazy(() => import('../pages/About'));

const Contact = lazy(() => import('../pages/ContactUs'));
const ContactUsList = lazy(() => import('../pages/ContactUsList'));
const Settings = lazy(() => import('../pages/Apps/Settings/Settings'));

const Farms = lazy(() => import('../pages/Farms/Farms'));
const Farms3 = lazy(() => import('../pages/Farms/Farms3'));
const AddFaq = lazy(() => import('../pages/FAQPage/AddFAQ'));
const FAQ = lazy(() => import('../pages/FAQPage/FAQ'));
const Pricing = lazy(() => import('../pages/Price/PricePlan'));
const AddPlan = lazy(() => import('../pages/Price/AddPricePlan'));

const PageNotFound = lazy(() => import('../components/Reuseable/PageNotFound'));

// homePages
const HomePage = lazy(() => import('../pages/Home/HomePage'));



const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/apps/buy-pizzaswap',
        element: <BuyPizza />,
    },
    {
        path: '/trade',
        element: <Trade />,
    },
    {
        path: '/addfaq',
        element: <AddFaq />,
    },
    {
        path: '/faq',
        element: <FAQ />,
    },
    {
        path: '/addpriceplan',
        element: <AddPlan />,
    },
    {
        path: '/priceplan',
        element: <Pricing />,
    },
    {
        path: '/farms',
        element: <Farms />,
    },
    // {
    //     path: '/eventdetail',
    //     element: <Farms />,
    // },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/contact-us',
        element: <Contact />,
    },
    {
        path: '/notification',
        element: <NotificationList />,
    },

    {
        path: '/contact-us-list',
        element: <ContactUsList />,
    },

    {
        path: '/settings',
        element: <Settings />,
    },
    {
        path: '/landing',
        element: <Landing />,
    },

    // Users page
    {
        path: '/users/profile',
        element: <Profile />,
    },
    {
        path: '/users/revenue-details',
        element: <RevenueDetails />,
    },
    {
        path: '/users/orgprofile',
        element: <OrgProfile />,
    },

    {
        path: 'staking',
        element: <Staking />,
    },

    {
        path: 'homepage',
        element: <HomePage />,
    },

    //Authentication
    {
        // path: '/auth/boxed-signin',
        // element: <LoginBoxed />,
        layout: 'blank',
    },
    
    {
        path: '*',
        element: <PageNotFound />,
        // layout: 'blank',
    },
];

export { routes };
