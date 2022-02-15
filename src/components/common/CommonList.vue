<template>
  <ul class="list-reset py-0 pr-0">
    <li v-for="(item, index) in items" :key="item.id + '-' + index">
      <common-list-item v-bind="item" />
    </li>
  </ul>
</template>

<script>
  import CommonListItem from './CommonListItem.vue';

  export default {
    name: 'CommonList',
    components: {
      CommonListItem
    },
    props: {
      items: {
        type: Array,
        default: () => []
      }
    }
  };
</script>

<style lang="scss" scoped></style>
