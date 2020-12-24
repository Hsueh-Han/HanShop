import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    backstageProducts: [],
    backstageOrderList: [],
    paginationObj: {},
    orderPagination: {},
    alertMessage: [],
    allProducts: [],
    singleProduct: {},
    filterProductsList: [],
    sliceProductsList: [],
    storePages: '',
    staredPage: '',
    customCart: [],
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
    updateAlert(context, payload) {
      const timestamp = Math.floor(new Date() / 1000);
      const obj = {
        message: payload.message,
        status: payload.status,
        timestamp,
      };
      context.commit('ALERT', obj);
      setTimeout(() => {
        context.commit('REMOVEALERT', timestamp);
      }, 5000);
    },
    // 後台 - 取得訂單列表
    getOrderList(context, page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      context.commit('LOADING', true);
      axios.get(api).then((res) => {
        context.commit('LOADING', false);
        if (res.data.success) {
          context.commit('ORDERLIST', res.data.orders);
          context.commit('ORDERPAGINATION', res.data.pagination);
        } else {
          const message = '取得訂單列表失敗 !';
          const status = 'danger';
          vm.dispatch('updateAlert', { message, status });
        }
      });
    },
    // 後台 - 取得商品列表
    getProducts(context, page = this.state.paginationObj.current_page || 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      context.commit('LOADING', true);
      axios.get(api).then((res) => {
        context.commit('LOADING', false);
        if (res.data.success) {
          context.commit('PRODUCTS', res.data.products);
          context.commit('PAGINATION', res.data.pagination);
        } else {
          const message = '取得產品列表失敗 !';
          const status = 'danger';
          vm.dispatch('updateAlert', { message, status });
        }
      });
    },
    // 後台 - 取得 更新/上傳 商品內容
    updateProducts(context, { productsObj, isAdd }) {
      context.commit('LOADING', true);
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethods = 'post';
      if (!isAdd) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${productsObj.id}`;
        httpMethods = 'put';
      }
      const vm = this;
      axios[httpMethods](api, { data: productsObj }).then((res) => {
        let message = '';
        let status = '';
        if (isAdd && res.data.success) {
          message = '新增產品成功 !';
          status = 'success';
          context.commit('LOADING', false);
        } else if (!isAdd && res.data.success) {
          message = '產品資訊更新成功 !';
          status = 'success';
          vm.dispatch('getProducts');
        } else {
          message = '產品資訊更新失敗 !';
          status = 'danger';
        }
        vm.dispatch('updateAlert', { message, status });
      });
    },
    getCustomProductsAll(context) {
      context.commit('LOADING', true);
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then((res) => {
        if (res.data.success) {
          context.commit('LOADING', false);
          context.commit('GETALLPRODUCTS', res.data.products);
          // 產品列表初始化(類別 -all)
          context.commit('FILTERLIST', 'all');
          // 商品筆數分割 及 pagination 初始化(focusPage = 1)
          context.commit('SLICELIST', 1);
        } else {
          context.commit('LOADING', false);
          const message = '取得產品資訊失敗，請稍後再試 !';
          const status = 'danger';
          vm.dispatch('updateAlert', { message, status });
        }
      });
    },
    getSingelProduct(context, payload) {
      context.commit('LOADING', true);
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${payload}`;
      axios.get(api).then((res) => {
        context.commit('LOADING', false);
        if (res.data.success) {
          context.commit('SINGELPRODUCTS', res.data.product);
        } else {
          const message = '取得產品資訊失敗，請稍後再試 !';
          const status = 'danger';
          vm.dispatch('updateAlert', { message, status });
        }
      });
    },
    getCart(context) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((res) => {
        if (res.data.success) {
          context.commit('GETCART', res.data.data);
        } else {
          const message = '取得購物車資訊失敗，請稍後再試 !';
          const status = 'danger';
          vm.dispatch('updateAlert', { message, status });
        }
      });
    },
    filterList(context, payload) {
      context.commit('FILTERLIST', payload);
      // 每次過濾分類時，將產品分頁初始化(page-1)
      context.commit('SLICELIST', 1);
    },
    sliceList(context, payload) {
      // pagination
      context.commit('SLICELIST', payload);
    },
    searchProduct(context, payload) {
      context.commit('SEARCHPRODUCT', payload);
      context.commit('SLICELIST', 1);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    PRODUCTS(state, payload) {
      state.backstageProducts = payload;
    },
    PAGINATION(state, payload) {
      state.paginationObj = payload;
    },
    ALERT(state, payload) {
      state.alertMessage.push(payload);
    },
    REMOVEALERT(state, payload) {
      state.alertMessage.forEach((item, i) => {
        if (item.timestamp === payload) {
          state.alertMessage.splice(i, 1);
        }
      });
    },
    ORDERLIST(state, payload) {
      state.backstageOrderList = payload;
    },
    ORDERPAGINATION(state, payload) {
      state.orderPagination = payload;
    },
    GETALLPRODUCTS(state, payload) {
      const arr = [...payload];
      // 此處隨機排序整個產品資料(稍微打散一下順序增加各個產品出現在第一個頁面的機率)
      for (let i = payload.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      state.allProducts = arr;
    },
    SINGELPRODUCTS(state, payload) {
      state.singleProduct = payload;
    },
    FILTERLIST(state, payload) {
      if (payload === 'all') {
        state.filterProductsList = state.allProducts;
      } else {
        state.filterProductsList = state.allProducts
          .filter((item) => item.category === payload);
      }
      // 每次的 filterList 任務，將計算 storePages 其數值為所需求的 pagination 長度
      state.storePages = Math.floor(state.filterProductsList.length / 20) + 1;
    },
    SLICELIST(state, payload) {
      // 由前端分割產品頁面數量(至多20筆)
      state.sliceProductsList = state.filterProductsList.slice((payload - 1) * 20, payload * 20);
      // 針對每次 filter/slice 時，維護 pagination focusPage 的狀態值
      // (由 getCustomProductsAll 或 filterList 任務進入時，focusPage初始化為 page-1)
      // (由 sliceList 任務進入時，focusPage 恆為 pagination 的傳入值)
      state.staredPage = payload;
    },
    SEARCHPRODUCT(state, payload) {
      const arr = state.allProducts.filter((item) => item.title.match(payload));
      state.filterProductsList = arr;
      state.storePages = Math.floor(state.filterProductsList.length / 20) + 1;
    },
    GETCART(state, payload) {
      state.customCart = payload;
    },
  },
});
