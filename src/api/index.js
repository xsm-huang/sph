/**
 * @author xsm 2022-04-09
 * @description 对所有api接口统一管理
 */
import request from './ajax';
import mockRequest from './mockAjax';
// 三级联动接口，/api/product/getBaseCategoryList GEt 无参数
export const reqCategoryList = () =>
    request({ url: '/product/getBaseCategoryList', method: 'GET' });

//-----------------------------mock
// 获取banner
// export const reqBannerList = () => mockRequest.get('/banner');
export const reqBannerList = () => mockRequest({ url: '/banner', method: 'GET' });

// 获取floor
export const reqFloorList = () => mockRequest.get('/floor');
//-----------------------------mock

/**
 *  @function 获取search模块数据,至少要传递一个空对象
 */
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'POST', data: params });

// 获取detail模块数据
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'GET' });
