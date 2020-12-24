<template>
  <div class="row" v-if="singleProduct">
    <div class="col-12 col-md-6">
      <div class="single-product-img"
      :style="{backgroundImage: `url(${singleProduct.imgUrl})`}">
      </div>
    </div>
    <div class="col-12 col-md-6">
      <h4 class="text-center my-3">{{singleProduct.title}}</h4>
      <div class="row h-50">
        <div class="col-12 col-md-6 d-flex flex-column justify-content-end">
          <div>
            <div class="d-flex justify-content-center
            justify-content-md-start align-items-center mb-4">
              <h6>售價：</h6>
              <h4 class="font-weight-bold"
                :class="{'text-danger': singleProduct.origin_price &&
                singleProduct.origin_price>singleProduct.price}">
                <small class="text-dark mr-2" style="text-decoration: line-through;"
                v-if="singleProduct.origin_price && singleProduct.origin_price>singleProduct.price">
                  {{ singleProduct.origin_price | currency }}
                </small>
                {{ singleProduct.price | currency }}
              </h4>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend" v-if="orderNumber > 1">
                <button class="btn btn-outline-secondary" @click="countOrderNumber(-1)">-</button>
              </div>
              <input type="number" class="form-control text-center" v-model="orderNumber" min="1">
              <div class="input-group-prepend">
                <span class="input-group-text">{{ singleProduct.unit }}</span>
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" @click="countOrderNumber(1)">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column justify-content-end">
          <button class="btn btn-outline-secondary w-100 mb-3"
          v-if="singleProduct.is_enabled === '1'"
          @click="addToCart(singleProduct.id)">
           <i v-if="cartLoading" class="fas fa-spinner fa-pulse"></i>
          加入購物車</button>
          <button class="btn btn-outline-danger w-100 mb-3" @click="quickBuy(singleProduct.id)"
          :disabled="singleProduct.is_enabled === '0'">
            <span v-if="singleProduct.is_enabled === '1'">立即購買</span>
            <span v-if="singleProduct.is_enabled === '0'">已完售</span>
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 py-3 text-center">
      <h6 class="bg-light py-2 border-bottom mb-4">商品說明</h6>
      <p>全商品為現貨出售，下單前務必詳閱購物須知及售後服務</p>
      <p v-html="singleProduct.description"></p>
      <p v-html="singleProduct.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: 1,
      cartLoading: false,
    };
  },
  created() {
    this.$store.dispatch('getSingelProduct', this.$route.params.id);
  },
  computed: {
    singleProduct() {
      if (this.$route.params.id === this.$store.state.singleProduct.id) {
        return this.$store.state.singleProduct;
      }
      return '';
    },
  },
  methods: {
    countOrderNumber(num) {
      this.orderNumber = Number(this.orderNumber) + num;
    },
    addToCart(id, isQuickBuy) {
      this.cartLoading = true;
      const obj = {
        product_id: id,
        qty: Number(this.orderNumber),
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
        this.cartLoading = false;
      }).finally(() => {
        if (isQuickBuy) {
          vm.$router.push('/cart');
        }
      });
    },
    quickBuy(id) {
      this.addToCart(id, true);
    },
  },
};
</script>
