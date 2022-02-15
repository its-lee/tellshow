<template>
  <div id="app">
    <tellshow-container />
  </div>
</template>

<script>
  import TellshowContainer from './components/TellshowContainer.vue';

  export default {
    name: 'App',
    components: {
      TellshowContainer
    },
    mounted() {
      // Vue is against making raw DOM manipulations, but there's no better way to manipulate the
      // body classes (which are outside of the attached Vue instance's remit anyway)
      document.body.classList.add(
        ...'bg-gray-800 font-sans leading-normal tracking-normal'.split(' ')
      );
    }
  };
</script>

<style lang="scss">
  // Change the body colour to white so that ios safari issue with extended area after scrolling with
  // keyboard open doesn't look too amiss
  body {
    background-color: #ffffff !important;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
