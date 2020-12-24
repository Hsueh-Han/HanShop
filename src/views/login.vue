<template>
  <div class="row justify-content-center">
    <div class="col-8 py-4">
      <h4 class="text-center mb-4">管理員登入</h4>
      <form>
        <div class="form-group">
          <label for="useremail">Email address</label>
          <input type="email" class="form-control" id="useremail" v-model="user.username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password"
          v-model="user.password">
        </div>
        <button type="submit" class="btn btn-outline-secondary w-100 mt-3"
        @click="userLogin">Login</button>
      </form>
    </div>
    <alert/>
  </div>
</template>

<script>
import alert from '../components/alert.vue';

export default {
  name: 'login',
  components: {
    alert,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    userLogin() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          document.cookie = `hanCookie=${res.data.token}; expires=${new Date(res.data.expired)};`;
          vm.$router.push('/admin');
        } else {
          const message = '登入失敗 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
};
</script>

<style scoped lang="scss">

</style>
