<template>
  <div @click="navbarToggle = false">
    <header class="text-center pt-3 sticky-top header-style">
      <button class="navbar-store-btn" @click.stop="navbarToggle = !navbarToggle">
        <i class="fas fa-bars"></i>
      </button>
      <h1 class="index-title mx-auto d-inline-block">
        <router-link to="/"><i class="far fa-gem"></i> S U N S E T</router-link>
      </h1>
      <ul class="top-bar list-style-none mb-0">
        <li class="topbar-item">
          <a href="#" @click="isSearch = !isSearch"><i class="fas fa-search"></i></a>
        </li>
        <li class="topbar-item">
          <router-link to="/login"><i class="far fa-user"></i></router-link>
        </li>
        <li class="topbar-item">
          <router-link to="/cart">
            <i class="fas fa-shopping-cart"></i>
            <div class="rounded-circle bg-danger d-inline-block text-white position-absolute"
            v-if="cartLength && cartLength.length > 0"
            style="font-size: 0.5rem; width: 18px; height: 18px; right: -3px;">
              {{cartLength.length}}
            </div>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-store list-style-none" :class="{'navbar-store-out': navbarToggle}"
      @click="checkProducts">
        <li class="navbar-store-item">
          <router-link to="/" :class="{'active': isStared ==='ALL'}">ALL</router-link>
        </li>
        <li class="navbar-store-item">
          <router-link to="/" :class="{'active': isStared ==='RING'}">RING</router-link>
        </li>
        <li class="navbar-store-item">
          <router-link to="/" :class="{'active': isStared ==='NECKLACE'}">NECKLACE</router-link>
        </li>
        <li class="navbar-store-item">
          <router-link to="/" :class="{'active': isStared ==='EARRING'}">EARRING</router-link>
        </li>
        <li class="navbar-store-item">
          <router-link to="/" :class="{'active': isStared ==='BRACELET'}">BRACELET</router-link>
        </li>
        <li class="navbar-store-item">
          <router-link to="/" :class="{'active': isStared ==='OTHERS'}">OTHERS</router-link>
        </li>
      </ul>
    </header>
    <div class="container py-3">
      <div class="input-group mb-3 w-75 ml-auto" v-if="isSearch">
        <input type="text" class="form-control"
        placeholder="請輸入商品關鍵字，(如：金、銀、編織 ...等)"
        @keyup.enter="search" v-focus v-model.trim="searchStr">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" @click="search">
            <i class="fas fa-search"></i>
            Search
          </button>
        </div>
      </div>
      <alert/>
      <router-view></router-view>
    </div>
    <footer class="bg-footer">
      <div class="container py-3">
        <div class="row border-bottom border-white">
          <div class="col-12 col-lg-6 order-lg-last py-3 border-bottom-md">
            <h2 class="index-title text-center">
              <router-link to="/"><i class="far fa-gem"></i> S U N S E T</router-link>
            </h2>
            <div class="text-center">
              <a class="footer-link h2 d-inline-block" href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="footer-link h2 d-inline-block" href="#">
                <i class="fab fa-facebook-square m-3"></i>
              </a>
              <a class="footer-link h2 d-inline-block" href="#">
                <i class="fab fa-twitter-square"></i>
              </a>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4 text-color py-3">
            <h5 class="font-weight-bold">關於我們</h5>
            <ul class="list-style-none ml-3 p-0">
              <li>
                <i class="fas fa-phone"></i> 公司電話｜+886-2-22221234
              </li>
              <li>
                <a class="footer-link" href="mailto:cookie5year@gmail.com.tw">
                  <i class="far fa-envelope"></i> 電子信箱｜cookie5year@gmail.com.tw
                </a>
              </li>
              <li>
                <p class="mb-0"><i class="far fa-clock"></i> 營業時間｜平日09:00-18:00</p>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-6 col-lg-2 text-color py-3">
            <h5 class="font-weight-bold">服務內容</h5>
            <ul class="list-style-none ml-3 p-0">
              <li>
                <a href="#" class="footer-link">購物須知</a>
              </li>
              <li>
                <a href="#" class="footer-link">售後服務</a>
              </li>
              <li>
                <a href="#" class="footer-link">海外訂購</a>
              </li>
              <li>
                <a href="#" class="footer-link">165 防詐騙</a>
              </li>
            </ul>
          </div>
        </div>
        <p class="my-3 text-color">Image Resource:
          <a target="_blank" href="https://unsplash.com/">unsplash</a>
          <br>
          Work by: Hsueh
        </p>
      </div>
    </footer>
    <div class="toTopBtn" v-if="toTopBtn" @click="scrollTop">
      <i class="fas fa-angle-double-up"></i>
    </div>
  </div>
</template>

<script>
import alert from '../components/alert.vue';

export default {
  components: {
    alert,
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      isSearch: false,
      searchStr: '',
      navbarToggle: false,
      toTopBtn: false,
      isStared: '',
    };
  },
  methods: {
    search() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
      this.$store.dispatch('searchProduct', this.searchStr);
    },
    checkTopBtn() {
      if (window.scrollY > 280) {
        this.toTopBtn = true;
      } else {
        this.toTopBtn = false;
      }
    },
    scrollTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    checkProducts(event) {
      if (event.target.nodeName === 'A') {
        this.isStared = event.target.innerText;
        this.$store.dispatch('filterList', this.isStared.toLowerCase());
        this.scrollTop();
      }
    },
  },
  computed: {
    cartLength() {
      return this.$store.state.customCart.carts;
    },
  },
  created() {
    this.$store.dispatch('getCustomProductsAll');
    this.$store.dispatch('getCart');
  },
  mounted() {
    window.addEventListener('scroll', this.checkTopBtn, false);
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkTopBtn);
  },
};
</script>
