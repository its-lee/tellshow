<template>
  <div class="bg-gradient-to-r from-gray-400 to-gray-200 m-1 shadow-md b-1 border-gray-500">
    <a v-if="url" :href="url" target="_blank" class="float-right pr-2 pt-2 font-bold uppercase">{{
      $t('commonComponents.listItem.view')
    }}</a>
    <h3 v-if="title !== null" class="pl-2 pt-2 text-left font-bold uppercase text-gray-600">
      {{ title }}
    </h3>
    <p class="pt-2 pl-2 pb-2 text-left text-gray-700 whitespace-pre">
      {{ content }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'CommonListItem',
    props: {
      // eslint-disable-next-line vue/no-unused-properties
      id: {
        type: [Number, String],
        required: true
      },
      title: {
        type: String,
        default: null,
        validator: prop => typeof prop === 'string' || prop === null
      },
      content: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped></style>
