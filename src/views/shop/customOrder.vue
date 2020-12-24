<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-7 py-3">
      <h4 class="text-center mb-5">建立訂單資訊</h4>
      <form @submit.prevent="createOrder">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="user">訂購 / 收件人</label>
            <input type="text" class="form-control" id="user" placeholder="請輸入收件人姓名"
            v-validate="'required'" name="name" :class="{'is-invalid': errors.has('name')}"
            v-model.trim="form.user.name">
            <small class="text-danger" v-if="errors.has('name')">{{ '請輸入完整收件人姓名' }}</small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="useremail">電子信箱</label>
            <input type="email" class="form-control" id="useremail" placeholder="請輸入 Email 信箱"
            v-validate="'required|email'" name="email"
            :class="{'is-invalid': errors.first('email')}"
            v-model="form.user.email">
            <small class="text-danger">{{ errors.first('email') }}</small>
          </div>
          <div class="form-group col-md-6">
            <label for="tel">連絡電話</label>
            <input type="text" class="form-control" id="tel" placeholder="請輸入您的連絡電話"
            v-validate="'required'" name="tel" :class="{'is-invalid': errors.has('tel')}"
            v-model.trim="form.user.tel">
            <small class="text-danger" v-if="errors.has('tel')">{{ '請輸入您的連絡電話' }}</small>
          </div>
        </div>
        <div class="form-group">
          <label for="address">收件地址</label>
          <input type="text" class="form-control" id="address" placeholder="請輸入收件地址"
          v-validate="'required'" name="address" :class="{'is-invalid': errors.has('address')}"
          v-model.trim="form.user.address">
          <small class="text-danger" v-if="errors.has('address')">{{ '請輸入您的收件地址' }}</small>
        </div>
        <div class="form-group">
          <label for="ordermessage">備註留言</label>
          <textarea class="form-control" id="ordermessage" rows="3"
          v-validate="'required'" name="message" :class="{'is-invalid': errors.has('message')}"
          v-model.trim="form.message"></textarea>
          <small class="text-danger" v-if="errors.has('message')">{{ '請輸入備註資料' }}</small>
        </div>
        <button type="submit" class="btn btn-outline-success d-block ml-auto">
          送出訂單
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    createOrder() {
      const obj = this.form;
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$store.dispatch('updateLoading', true);
          this.$http.post(api, { data: obj }).then((res) => {
            vm.$store.dispatch('updateLoading', false);
            if (res.data.success) {
              const message = '訂單資訊已成功送出 !';
              const status = 'success';
              vm.$store.dispatch('updateAlert', { message, status });
              vm.$store.dispatch('getCart');
              vm.$router.push(`/checkout/${res.data.orderId}`);
            } else {
              const message = '訂單送出失敗，請重新確認送出內容或者稍後再試 !';
              const status = 'danger';
              vm.$store.dispatch('updateAlert', { message, status });
            }
          });
        } else {
          const message = '請填寫完整表單內容 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
      });
    },
  },
};
</script>
