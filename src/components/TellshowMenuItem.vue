<template>
  <a
    href="#"
    class="block py-1 md:py-2 align-middle text-white no-underline hover:text-white border-b-2"
    :class="selected ? 'border-blue-600 pl-1' : 'border-gray-800 hover:border-red-500 pl-0 md:pl-1'"
    @click.prevent="$emit('click')"
  >
    <span
      class="pb-1 md:pb-0 text-xs md:text-base block md:inline-block truncate"
      :class="selected ? 'text-white md:text-white' : 'text-gray-600 md:text-gray-400'"
      >{{ label }}</span
    >
  </a>
</template>

<script>
  export default {
    name: 'TellshowMenuItem',
    props: {
      label: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped></style>
