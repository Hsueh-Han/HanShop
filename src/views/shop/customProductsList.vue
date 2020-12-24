<template>
  <div class="row">
    <div class="col-6 col-sm-4 col-lg-3 bg-light py-3 text-center"
    v-for="item in products" :key="item.id">
      <div class="d-flex flex-column justify-content-between h-100">
        <router-link class="text-decoration-none text-dark" :to="`/product/${item.id}`">
          <div class="product-img" :style="{backgroundImage: `url(${item.imgUrl})`}"></div>
          <h6>{{ item.title }}</h6>
        </router-link>
        <h6 class="font-weight-bold"
        :class="{'text-danger': item.origin_price && item.origin_price>item.price}">
          <small class="text-dark mr-2" style="text-decoration: line-through;"
          v-if="item.origin_price && item.origin_price>item.price">
            {{ item.origin_price | currency }}
          </small>
          {{ item.price | currency }}
        </h6>
        <button type="button" :disabled="item.is_enabled == 0"
        class="btn btn-light btn-sm border border-secondary w-100 text-secondary"
        @click="addToCart(item.id)">
          <span v-if="item.is_enabled == 1">
            <i v-if="cartLoadingItem === item.id" class="fas fa-spinner fa-pulse"></i>
            <i class="fas fa-shopping-cart"></i> Add to cart
          </span>
          <span v-if="item.is_enabled == 0">
            <i class="fas fa-shopping-cart"></i> Sold out
          </span>
        </button>
      </div>
    </div>
    <ul v-if="pageLength > 20" class="pagination w-100 justify-content-center my-4">
      <li class="page-item" v-if="focusPage != 1">
        <a class="page-link text-secondary" href="#" @click="shiftPage(focusPage-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="(page, i) in pages" :key="i" class="page-item"
      :class="{'cus-page-active': focusPage === page}">
        <a class="page-link text-secondary " href="#"
        @click="shiftPage(page)"
        >{{ page }}</a>
      </li>
      <li class="page-item" v-if="pages != focusPage">
        <a class="page-link text-secondary" href="#" @click="shiftPage(focusPage+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartLoadingItem: '',
    };
  },
  methods: {
    shiftPage(num) {
      this.$store.dispatch('sliceList', num);
    },
    addToCart(id) {
      this.cartLoadingItem = id;
      const obj = {
        product_id: id,
        qty: 1,
      };
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.post(api, { data: obj }).then((res) => {
        if (res.data.success) {
          const message = '商品已成功加入購物車 !';
          const status = 'secondary';
          vm.$store.dispatch('updateAlert', { message, status });
          vm.$store.dispatch('getCart');
        } else {
          const message = '加入購物車失敗，請稍後再試 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
        this.cartLoadingItem = '';
      });
    },
  },
  computed: {
    products() {
      return this.$store.state.sliceProductsList;
    },
    pages() {
      return this.$store.state.storePages;
    },
    pageLength() {
      return this.$store.state.filterProductsList.length;
    },
    focusPage() {
      return this.$store.state.staredPage;
    },
  },
};
</script>
