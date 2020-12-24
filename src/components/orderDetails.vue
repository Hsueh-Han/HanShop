<template>
  <div>
    <table class="table table-hover">
      <tbody>
        <template v-for="item in products">
          <tr :key="item.product.id">
            <td>
              <div class="single-product-img" style="width: 100px; height: 100px;"
              :style="{backgroundImage: `url(${item.product.imgUrl})`}">
              </div>
            </td>
            <td>
              <h6 class="mt-0">{{item.product.title}}</h6>
            </td>
            <td>數量：{{item.qty}}</td>
            <td>{{item.product.price | currency}}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['products'],
};
</script>
