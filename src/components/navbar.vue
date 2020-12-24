<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-2" href="#">
      <i class="far fa-gem"></i> SUNSET 後台系統
    </a>
    <button class="navbar-toggler position-absolute d-md-none collapsed"
    type="button" data-toggle="collapse" data-target="#sidebarMenu"
    aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click="signOut">Sign out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.$store.dispatch('updateLoading', false);
          vm.$router.push('login');
          const message = '您已成功登出 !';
          const status = 'secondary';
          vm.$store.dispatch('updateAlert', { message, status });
        } else {
          const message = '登出失敗 !';
          const status = 'danger';
          vm.$store.dispatch('updateAlert', { message, status });
        }
      });
    },
  },
};
</script>
