<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/all.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
