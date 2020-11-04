import { post, get, del } from "../untils/request";

/**
 * 加入购物车
 * @param {*} product   商品id
 * @param {*} amount    数量
 */
export function addToCart(product, amount) {
    return post("http://localhost:3009/api/v1/shop_carts", {
        product,
        quantity: amount,
    });
}

/**
 * 加载购物车数据
 */
export function loadCarts() {
    return get("http://localhost:3009/api/v1/shop_carts");
}
/* 删除数据 */
export function detCarts(id) {
    return del("http://localhost:3009/api/v1/shop_carts/" + id);
}
/* 获取用户信息 */
export function loadUser() {
    return get("http://localhost:3009/api/v1/users/info");
}