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
        path: '/detail/:skuid',
        component: Detail,
        meta: {
            showFooter: true,
        },
    },
];
