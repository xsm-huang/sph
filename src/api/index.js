/**
 * @author xsm 2022-04-09
 * @description 对所有api接口统一管理
 */
import request from './request';

// 三级联动接口，/api/product/getBaseCategoryList GEt 无参数
export const reqCategoryList = () =>
    request({ url: '/product/getBaseCategoryList', method: 'GET' });
