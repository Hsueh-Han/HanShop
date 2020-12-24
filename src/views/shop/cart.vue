<template>
  <div class="row justify-content-center">
    <h6 class="my-5" v-if="cartData.total === 0">
      目前還尚未有購物車內容哦，趕快去逛逛吧 !
    </h6>
    <div class="col-12 col-md-10" v-if="cartData.total > 0">
      <table class="table table-hover">
        <tbody>
          <template v-for="item in cartData.carts">
            <tr :key="item.id">
              <td>
                <div class="single-product-img" style="width: 100px; height: 100px;"
                :style="{backgroundImage: `url(${item.product.imgUrl})`}">
                </div>
              </td>
              <td>
                <h6 class="mt-0">{{item.product.title}}</h6>
              </td>
              <td>{{item.qty + item.product.unit }}</td>
              <td>{{item.product.price | currency}}</td>
              <td>
                <button type="button" class="btn btn-outline-danger"
                @click="removeCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                  <i v-if="removeLoading" class="fas fa-spinner fa-pulse ml-1"></i>
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <hr>
      <h6 class="text-right mb-3">總金額：<strong>{{cartData.total | currency}}</strong></h6>
      <div class="text-right">
        <router-link class="btn btn-outline-success ml-auto"
        to="/order">結帳付款去
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      removeLoading: false,
    };
  },
  methods: {
    removeCart(id) {
      this.removeLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        vm.removeLoading = false;
        if (res.data.success) {
          const message = '商品已成功移除購物車 !';
          const status = 'secondary';
          vm.$store.dispatch('updateAlert', { message, status });
          vm.$store.dispatch('getCart');
        } else {
          const message = '商品移除購物車失敗，請稍後再試 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
      });
    },
  },
  computed: {
    cartData() {
      return this.$store.state.customCart;
    },
  },
};
</script>
