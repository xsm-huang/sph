/**
 * @author xsm 2022-04-09
 * @description 对所有api接口统一管理
 */
import request from './ajax';
import mockRequest from './mockAjax';
// 三级联动接口，/api/product/getBaseCategoryList GEt 无参数
export const reqCategoryList = () =>
    request({ url: '/product/getBaseCategoryList', method: 'GET' });

// 获取banner
// export const reqBannerList = () => mockRequest.get('/banner');
export const reqBannerList = () => mockRequest({ url: '/banner', method: 'GET' });
