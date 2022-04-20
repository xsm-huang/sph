/**
 * @author xsm 2022-04-12
 * @description 路由配置信息
 */

// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOreder';
import GroupOrder from '@/pages/Center/GroupOrder';
export default [
    // 重定向，在项目运行时，访问时定向到 /home
    {
        path: '*',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
        meta: {
            showFooter: true,
        },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/login',
        component: Login,
        meta: {
            showFooter: false,
        },
    },
    {
        path: '/register',
        component: Register,
        meta: {
            showFooter: false,
        },
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/trade',
        component: Trade,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            showFooter: true,
        },
    },
    {
        path: '/center',
        component: Center,
        meta: {
            showFooter: true,
        },
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
        ],
        // 重定位
        redirect: '/center/myorder',
    },
];
