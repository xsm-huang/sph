/**
 * @author xsm 2022-04-13
 * @description 生成临时游客身份 使用uudi
 */
import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    // 先从本来存储中获取（判断是否已经存在）
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if (!uuid_token) {
        uuid_token = uuidv4();
        // 本地存储存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
};
