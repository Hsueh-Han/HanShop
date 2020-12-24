<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" href="#" to="/admin"
          :class="{'active': $route.path == '/admin'}">
            ProductsList
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" href="#" to="/admin/addProducts"
          :class="{'active': $route.path == '/admin/addProducts'}">
            AddProducts
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" href="#" to="/admin/orderList"
          :class="{'active': $route.path == '/admin/orderList'}">
            OderList
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
