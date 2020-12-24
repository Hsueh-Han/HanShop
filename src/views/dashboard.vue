<template>
<div>
  <navbar/>
  <div class="container-fluid">
    <div class="row">
      <sidebar/>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <alert/>
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import navbar from '../components/navbar.vue';
import sidebar from '../components/sidebar.vue';
import alert from '../components/alert.vue';

export default {
  name: 'dashboard',
  components: {
    navbar,
    sidebar,
    alert,
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hanCookie\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
