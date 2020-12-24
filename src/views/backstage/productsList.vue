<template>
  <div class="py-2">
    <div style="overflow-x: auto;">
      <table class="table table-hover" style="min-width: 528px;">
        <thead class="text-center">
          <tr>
            <th scope="col" class="text-left" style="width: 250px;">產品名稱</th>
            <th scope="col">分類</th>
            <th scope="col">原價</th>
            <th scope="col">售價</th>
            <th scope="col">啟用</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in products" :key="item.id">
            <td class="text-left">{{ item.title }}</td>
            <td>{{ item.category}}</td>
            <td class="text-right">{{ item.origin_price | currency }}</td>
            <td class="text-right">{{ item.price | currency }}</td>
            <td>
              <span class="text-success" v-if="item.is_enabled == 1">是</span>
              <span class="text-danger" v-else>否</span>
            </td>
            <td>
              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-success"
                @click="editProduct(item)">編輯</button>
                <button type="button" class="btn btn-outline-secondary"
                @click="showDelModal(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pages="paginationObj"></pagination>

    <div class="modal fade" id="productModal" data-backdrop="static" data-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog" style="max-width: 800px;">
        <div class="modal-content">
          <div class="modal-header p-2">
            <button type="button" class="btn btn-sm btn-outline-secondary ml-auto"
            @click="hideMoldal">close</button>
          </div>
          <div class="modal-body">
            <editProduct v-if="editItem" :product="editItem" :isAdd="false"></editProduct>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="removeProductModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            操作提示：<br>
            此刪除動作將無法復原，請再次確認是否要刪除 "{{removeItem.title}}" ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-outline-danger"
            @click="removeProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import editProduct from '../../components/editProductBoard.vue';
import pagination from '../../components/pagination.vue';

export default {
  components: {
    editProduct,
    pagination,
  },
  data() {
    return {
      editItem: '',
      removeItem: '',
    };
  },
  created() {
    this.$store.dispatch('getProducts');
  },
  methods: {
    getProducts() {
      this.$store.dispatch('getProducts');
    },
    editProduct(item) {
      this.editItem = { ...item };
      $('#productModal').modal('show');
    },
    hideMoldal() {
      $('#productModal').modal('hide');
      this.editItem = '';
    },
    showDelModal(key) {
      $('#removeProductModal').modal('show');
      this.removeItem = key;
    },
    removeProduct() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.removeItem.id}`;
      const vm = this;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          $('#removeProductModal').modal('hide');
          vm.getProducts();
          const message = '刪除產品成功 !';
          const status = 'success';
          vm.$store.dispatch('updateAlert', { message, status });
        } else {
          $('#removeProductModal').modal('hide');
          vm.$store.dispatch('updateLoading', false);
          const message = '刪除產品失敗 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
      });
    },
  },
  computed: {
    products() {
      return this.$store.state.backstageProducts;
    },
    paginationObj() {
      return this.$store.state.paginationObj;
    },
  },
};
</script>
