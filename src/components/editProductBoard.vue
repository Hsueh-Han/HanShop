<template>
  <div>
    <h5>
      <span>產品資訊</span>
    </h5>
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="image">輸入圖片網址</label>
          <input type="text" class="form-control" id="image"
            placeholder="請輸入圖片連結" v-model="newProduct.imgUrl">
        </div>
        <div class="form-group">
          <label for="customFile">或 上傳圖片
            <i v-if="fileUplodaing" class="fas fa-spinner fa-pulse"></i>
          </label>
          <input type="file" id="customFile" class="form-control"
            ref="fileInfo" @change="uploadFile">
        </div>
        <img :src="newProduct.imgUrl" class="img-fluid" alt="">
      </div>
      <div class="col-sm-8">
        <div class="form-group">
          <label for="title">標題</label>
          <input type="text" class="form-control" id="title"
            placeholder="請輸入標題" v-model="newProduct.title">
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="category">分類</label>
            <select class="custom-select" id="category" v-model="newProduct.category">
              <option selected disabled>請選擇商品分類</option>
              <option value="ring">RING</option>
              <option value="necklace">NECKLACE</option>
              <option value="earring">EARRING</option>
              <option value="bracelet">BRACELET</option>
              <option value="others">OTHERS</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="price">單位</label>
            <input type="unit" class="form-control" id="unit"
              placeholder="請輸入單位" v-model="newProduct.unit">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
          <label for="origin_price">原價</label>
            <input type="number" class="form-control" id="origin_price" min="0"
              placeholder="請輸入原價" v-model="newProduct.origin_price">
          </div>
          <div class="form-group col-md-6">
            <label for="price">售價</label>
            <input type="number" class="form-control" id="price" min="0"
              placeholder="請輸入售價" v-model="newProduct.price">
          </div>
        </div>
        <hr>

        <div class="form-group">
          <label for="description">產品描述</label>
          <textarea type="text" class="form-control" id="description"
            placeholder="請輸入產品描述" v-model="newProduct.description"></textarea>
        </div>
        <div class="form-group">
          <label for="content">說明內容</label>
          <textarea type="text" class="form-control" id="content"
            placeholder="請輸入產品說明內容" v-model="newProduct.content"></textarea>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="radio"
              id="is_enabled_true" v-model="newProduct.is_enabled" value="1">
            <label class="form-check-label" for="is_enabled_true">
              啟用
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio"
              id="is_enabled_false" v-model="newProduct.is_enabled" value="0">
            <label class="form-check-label text-danger" for="is_enabled_false">
              不啟用
            </label>
          </div>
        </div>
        <div class="w-100 text-right">
          <button type="button" class="btn btn-outline-success" @click="addNewProduct">確認送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'isAdd'],
  data() {
    return {
      newProduct: this.product,
      addStatus: this.isAdd,
      fileUplodaing: false,
    };
  },
  methods: {
    addNewProduct() {
      const productsObj = { ...this.newProduct };
      const isAdd = this.addStatus;
      this.$store.dispatch('updateProducts', { productsObj, isAdd });
      if (this.addStatus) {
        this.newProduct = {};
      }
    },
    uploadFile() {
      const imgFile = this.$refs.fileInfo.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', imgFile);

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      const vm = this;
      this.fileUplodaing = true;
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.fileUplodaing = false;
        if (res.data.success) {
          vm.$set(vm.newProduct, 'imgUrl', res.data.imageUrl);
          const message = '圖片上傳成功 !';
          const status = 'success';
          vm.$store.dispatch('updateAlert', { message, status });
        } else {
          const message = '圖片上傳失敗 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
      });
    },
  },
};
</script>
