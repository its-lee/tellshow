<template>
  <Transition name="fade">
    <div
      v-if="showing"
      class="fixed inset-0 w-full h-screen flex items-center justify-center z-20"
      @click.self="close"
    >
      <div class="relative w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <button
          aria-label="close"
          class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
          @click.prevent="close"
        >
          ×
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script>
  export default {
    name: 'CommonModal',
    props: {
      showing: {
        required: true,
        type: Boolean
      }
    },
    watch: {
      showing(value) {
        // While the modal is open, don't permit the body to be scrollable - as
        // when the modal is open, it's jarring to the user if things can happen
        // in the background.
        const body = document.querySelector('body');
        if (value) {
          body.classList.add('overflow-hidden');
        } else {
          body.classList.remove('overflow-hidden');
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
