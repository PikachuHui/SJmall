import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug,
    state: {
        items: [],
        checkoutStatus: null
    },
    mutations: {
        // 新增商品条目
        pushItem: (state, params) => {
            // 检查指定ID的商品是否已存在于购物车中
            let flag = false;
            state.items.forEach(item => {
                if (params.id == item.id) {
                    flag = true;
                }
            });
            if (!flag) {
                // 添加商品
                state.items.push({
                    id: params.id,
                    price: params.price,
                    total: params.total
                })
            }

        },
        // 删除指定商品条目
        popItem: (state, params) => {
            state.items.forEach((item, index) => {
                if (item.id === params.id) {
                    state.items.splice(index, 1)
                }
            })
        },
        // 增加指定商品数量
        incrementItem: (state, id) => {
            state.items.forEach(item => {
                if (item.id === id) {
                    item.total++
                }
            })
        },
        // 减少指定商品数量
        decrementItem: (state, id) => {
            state.items.forEach(item => {
                if (item.id === id) {
                    item.total--
                }
            })
        },
        // 清空购物车
        emptyShopcart: (state) => {
            state.items = []
        }
    },
    getters: {
        // 获取指定商品条目数量
        getItemTotal: (state, id) => {
            const item = state.items.find(item => { item.id === id })
            return item.total
        },
        // 获取购物车中商品条目总数
        getAllItemTotal: (state) => {
            return state.items.length
        },
        // 统计已选中商品总价
        getSelectedItemPrice: (state) => {
            return state.items.reduce((total, item) => {
                return total + item.price * item.total
            }, 0)
        }
    }
});