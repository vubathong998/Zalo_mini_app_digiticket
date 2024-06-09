import CategoryPage from 'pages/category';
import NotificationPage from 'pages/notification';
import CartPage from 'pages/cart';
import ListCollection from 'pages/collections';
import DetailCollection from 'pages/collections/DetailCollection';
import GreetingPage from 'pages/greeting';
import AuthenticationPage from 'pages/greeting/Authentication';
import ListShop from 'pages/greeting/ListShop';
// import ListShop from 'pages/greeting/ListShop';
import PaymentPage from 'pages/payment';
import ProfilePage from 'pages/profile';
import MyBookingPage from 'pages/profile/MyBooking';
import UpdateProfilePage from 'pages/profile/UpdateProfile';
import SearchPage from 'pages/search';
import ShopPage from 'pages/shop';

export type HeaderInterface = {
    name: string;
    path: string;
};

export type RegionItemInterface = {
    name: string;
    routes: Array<RouteItemInterface>;
};

export type RouteInterface = Array<RouteItemInterface>;
export type RegionInterface = Array<RegionItemInterface>;

export type RouteItemInterface = {
    name: string;
    path: string;
    subRoutes?: Array<RouteItemInterface>;
    header?: Array<HeaderInterface>;
    exact?: boolean;
    component?: React.FunctionComponent<any>;
    isPrivate?: boolean;
    layout?: boolean;
    bottomNavigation?: boolean;
};

export const paths = {
    Greeting: '/',
    ListShop: '/list-shop',
    Authentication: '/authentication',
    Shop: '/home',
    Search: '/search',
    Category: '/category/:categoryId',
    ListCollection: '/collections',
    DetailCollection: '/collections/:collectionId',
    Notification: '/notification',
    Cart: '/cart',
    Profile: '/profile',
    UpdateProfile: '/profile/detail',
    MyBooking: '/profile/booking',
    Payment: '/booking/:orderCode/:signature',
};
export const routes: Array<RouteItemInterface> = [
    // {
    //     name: 'Greeting',
    //     path: paths.Greeting,
    //     component: PaymentPage,
    //     exact: true,
    //     isPrivate: true,
    //     layout: false,
    //     bottomNavigation: false,
    // },
    {
        name: 'Greeting',
        path: paths.Greeting,
        component: GreetingPage,
        exact: true,
        isPrivate: false,
        layout: false,
        bottomNavigation: false,
    },
    {
        name: 'ListShop',
        path: paths.ListShop,
        component: ListShop,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: false,
    },
    {
        name: 'Authentication',
        path: paths.Authentication,
        component: AuthenticationPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: false,
    },
    {
        name: 'ShopHomePage',
        path: paths.Shop,
        component: ShopPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'Search',
        path: paths.Search,
        component: SearchPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'Category',
        path: paths.Category,
        component: CategoryPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'Notification',
        path: paths.Notification,
        component: NotificationPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'Cart',
        path: paths.Cart,
        component: CartPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'ListCollection',
        path: paths.ListCollection,
        component: ListCollection,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'DetailCollection',
        path: paths.DetailCollection,
        component: DetailCollection,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'Profile',
        path: paths.Profile,
        component: ProfilePage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'UpdateProfile',
        path: paths.UpdateProfile,
        component: UpdateProfilePage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'MyBooking',
        path: paths.MyBooking,
        component: MyBookingPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
    {
        name: 'Payment',
        path: paths.Payment,
        component: PaymentPage,
        exact: true,
        isPrivate: true,
        layout: false,
        bottomNavigation: true,
    },
];
