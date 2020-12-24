<template>
  <div class="py-2">
    <div style="overflow-x: auto;">
      <table class="table table-hover" style="min-width: 528px;">
        <thead>
          <tr class="text-center">
            <th scope="col">買家姓名</th>
            <th scope="col">聯絡電話</th>
            <th scope="col">寄件地址</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">商品內容</th>
          </tr>
        </thead>
        <tbody class="text-left">
          <tr v-for="item in orderList" :key="item.id">
            <td>{{ item.user.name}}</td>
            <td>{{ item.user.tel}}</td>
            <td>{{ item.user.address}}</td>
            <td class="text-right">{{ item.total | currency }}</td>
            <td class="text-center">
              <span class="text-success" v-if="item.is_paid">已付款</span>
              <span class="text-danger" v-else>尚未付款</span>
            </td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-dark"
              @click="modalShow(item.products)">查看</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pages="pagination"></pagination>
    <div class="modal fade" id="orderDetails" tabindex="-1"
    aria-labelledby="orderDetailsLabel" aria-hidden="true">
      <div class="modal-dialog" style="max-width: 800px;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="orderDetailsLabel">訂單商品詳情</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <order-details :products="staredOrder"></order-details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import pagination from '../../components/orderListPages.vue';
import orderDetails from '../../components/orderDetails.vue';

export default {
  components: {
    pagination,
    orderDetails,
  },
  data() {
    return {
      staredOrder: {},
    };
  },
  created() {
    this.$store.dispatch('getOrderList');
  },
  methods: {
    modalShow(item) {
      this.staredOrder = { ...item };
      $('#orderDetails').modal('show');
    },
  },
  computed: {
    orderList() {
      return this.$store.state.backstageOrderList;
    },
    pagination() {
      return this.$store.state.orderPagination;
    },
  },
};
</script>
