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

// 获取search模块数据,至少要传递一个空对象
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'POST', data: params });

// 获取detail模块数据
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'GET' });

// 添加到购物车 / 获取更新某一个产品的个数 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddorUpdateShopCart = (skuId, skuNum) =>
    request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' });

// 获取购物车列表 /api/cart/cartList
export const reqCartList = () => request({ url: '/cart/cartList', method: 'GET' });

// 删除购物车产品数量 /api/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) =>
    request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' });

// 修改商品选中状态 /cart/checkCart/{skuID}/{isChecked}
export const reqUpdateChecked = (skuId, isChecked) =>
    request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' });

// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) =>
    request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

// 注册 /api/user/passport/register
export const reqUserRegister = (data) =>
    request({
        url: `/user/passport/register`,
        method: 'post',
        data,
    });

// 登陆 /api/user/passport/login
export const reqUserLogin = (data) =>
    request({ url: `/user/passport/login`, method: 'POST', data });

// 获取用户信息 (携带 token 向服务端请求)
export const reqUserInfo = () => request({ url: `/user/passport/auth/getUserInfo`, method: 'GET' });
