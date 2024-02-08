import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home/Home'));
const BuyPizza = lazy(() => import('../pages/BuyPizza/BuyPizza'));
const Trade = lazy(() => import('../pages/Trade/Trade'));
const Staking = lazy(() => import('../pages/Staking/Staking'));
const Farms = lazy(() => import('../pages/Farms/Farms'));
const PageNotFound = lazy(() => import('../components/Reuseable/PageNotFound'));
const Lottery = lazy(() => import('../pages/Lottery/Lottery'));
const Referral = lazy(() => import('../pages/Referral/Referral'));



const routes = [
    {
        path: '/',
        element: <Home />,
    },

    {
        path: '/buy-pizzaswap',
        element: <BuyPizza />,
    },

    {
        path: '/trade',
        element: <Trade />,
    },

    {
        path: '/farms',
        element: <Farms />,
    },
    {
        path: '/referral',
        element: <Referral />,
    },
    {
        path: 'staking',
        element: <Staking />,
    },

    {
        path: 'lottery',
        element: <Lottery />,
    },

    {
        path: '*',
        element: <PageNotFound />,
    },
];

export { routes };
