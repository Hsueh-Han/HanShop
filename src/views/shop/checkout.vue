<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 py-3" v-if="orderItem">
      <h4 class="text-center mb-5">付款頁面</h4>
      <h5 class="font-weight-bold text-center">買家資訊</h5>
      <table class="table table-hover">
        <tbody>
          <tr>
            <th>收件人</th>
            <td>{{orderItem.user.name}}</td>
          </tr>
          <tr>
            <th>電子信箱</th>
            <td>{{orderItem.user.email}}</td>
          </tr>
          <tr>
            <th>連絡電話</th>
            <td>{{orderItem.user.tel}}</td>
          </tr>
          <tr>
            <th>收件地址</th>
            <td>{{orderItem.user.address}}</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <h5 class="font-weight-bold text-center">商品明細</h5>
      <table class="table table-hover">
        <thead class="text-center">
          <tr>
            <th class="text-left" scope="col">品項</th>
            <th scope="col">單價</th>
            <th scope="col">數量</th>
            <th scope="col">總價</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in orderItem.products">
            <tr :key="item.product_id" class="text-right">
              <td class="text-left">{{item.product.title}}</td>
              <td>{{item.product.price | currency}}</td>
              <td class="text-center">{{item.qty}}</td>
              <td>{{item.total | currency}}</td>
            </tr>
         </template>
        </tbody>
      </table>
      <h5 class="font-weight-bold text-right">消費金額：{{ orderItem.total | currency}}</h5>
      <hr>
      <h5 class="font-weight-bold text-center">模擬付款</h5>
      <div class="input-group mb-5 text-right ml-auto">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ orderItem.total | currency}}</span>
        </div>
        <input type="text" class="form-control text-center" placeholder="請輸入與左方相同金額"
        v-model="pay" @keyup.enter="payOrder(orderItem.id)" :disabled="completed"
        :class="{'is-invalid': !payStatus}">
        <div class="input-group-append">
          <button class="btn" @click="payOrder(orderItem.id)"
          :class="{'btn-outline-danger': !completed, 'btn-success': completed}"
          :disabled="completed">
          <span v-if="!completed">確認付款</span>
          <span v-if="completed">已完成付款</span>
          </button>
        </div>
      </div>
      <div class="card" v-if="completed">
        <div class="card-header">
          已付款完成 ! 感謝您的購買 !
        </div>
        <div class="card-body">
          <p class="card-text">全商品付款後，大約 3 ~ 7 個工作日內收到哦。</p>
          <p class="card-text">若商品於取件後發現品質瑕疵，請於七天內與我們聯絡，即可更換其他商品。</p>
          <router-link class="btn btn-outline-success" to="/">繼續逛逛其他好物</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderItem: '',
      pay: '',
      payStatus: true,
      completed: false,
    };
  },
  created() {
    const id = this.$route.params.orderId;
    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
    this.getOrder(api);
  },
  methods: {
    getOrder(api) {
      const vm = this;
      this.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((res) => {
        vm.$store.dispatch('updateLoading', false);
        if (res.data.success) {
          vm.orderItem = res.data.order;
        } else {
          const message = '付款頁面載入失敗，請重試一次 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
      });
    },
    payOrder(id) {
      if (Number(this.pay) === this.orderItem.total) {
        this.payStatus = true;
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
        this.$store.dispatch('updateLoading', true);
        this.$http.post(api).then((res) => {
          vm.$store.dispatch('updateLoading', false);
          if (res.data.success) {
            const message = '已付款成功 !';
            const status = 'success';
            vm.$store.dispatch('updateAlert', { message, status });
            vm.completed = true;
          } else {
            const message = '付款失敗，請稍後重試 !';
            const status = 'danger';
            vm.$store.dispatch('updateAlert', { message, status });
          }
        });
      } else {
        this.payStatus = false;
      }
    },
  },
};
</script>
