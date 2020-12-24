<template>
  <div class="position-fixed" style="right: 20px; z-index:1500;">
    <div class="alert border alert-dismissible fade show" role="alert"
    :class="'alert-'+item.status"
    v-for="(item) in alertMessage" :key="item.timestamp">
      {{ item.message }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    alertMessage() {
      return this.$store.state.alertMessage;
    },
  },

};
</script>
