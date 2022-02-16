<template>
  <div class="w-full h-full py-4 flex flex-col items-center justify-center grow">
    <div
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
    ></div>
    <h2 v-if="text !== ''" class="text-center text-xl font-semibold">
      {{ text || $t('commonComponents.spinner.loading') }}
    </h2>
  </div>
</template>

<script>
  export default {
    name: 'CommonSpinner',
    components: {},
    props: {
      text: {
        type: String,
        default: null
      }
    }
  };
</script>

<style lang="scss" scoped>
  .loader {
    border-top-color: theme('colors.blue.300');
    animation: spinner 1.5s linear infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
