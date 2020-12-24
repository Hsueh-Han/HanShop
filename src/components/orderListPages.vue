<template>
  <div>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled': !pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="toPage(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="(page, index) in pages.total_pages" :key="index"
      :class="{'active': page === pages.current_page}">
        <a class="page-link" href="#" @click.prevent="toPage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{'disabled': !pages.has_next}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="toPage(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    toPage(page) {
      this.$store.dispatch('getOrderList', page);
    },
  },
};
</script>
