<template>
  <div class="container py-3">
    <editProduct :product="{}" :isAdd="true"></editProduct>
  </div>
</template>

<script>
import editProduct from '../../components/editProductBoard.vue';

export default {
  name: 'addProducts',
  components: {
    editProduct,
  },
};
</script>
