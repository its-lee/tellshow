<template>
  <div
    class="
      -menu flex flex-col bg-gray-800 shadow-xl h-8 fixed md:bottom-0 md:top-0 md:relative md:h-screen z-10 w-full
      md:w-48 cursor-grab md:cursor-default overflow-x-auto md:overflow-x-hidden
      "
  >
    <div class="flex-none hidden md:block md:left-0 md:top-0 md:py-4 content-center">
      <img v-if="iconUrl" :src="iconUrl" class="inline-block w-6 h-6 mr-3 mb-1" />
      <h1 v-if="title" class="inline-block text-white">{{ title }}</h1>
    </div>

    <div
      class="flex-none md:mt-0 md:w-48 md:left-0 md:top-0 content-center md:content-start text-left justify-between"
    >
      <ul class="list-reset flex flex-row md:flex-col py-0 px-1 md:px-2 text-center md:text-left">
        <li v-for="item in items" :key="item.id" class="mr-3 flex-1">
          <tellshow-menu-item
            :selected="selection === item.id"
            :label="item.label"
            @click="itemClick(item.id)"
          />
        </li>
      </ul>
    </div>

    <div class="flex-none hidden md:block py-3 px-3 text-left">
      <a :href="homepage" target="_blank" class="block text-gray-500 border-t-2 py-3">{{
        $t('app.homepage')
      }}</a>
    </div>
  </div>
</template>

<script>
  import TellshowMenuItem from './TellshowMenuItem';
  import { homepage } from '@/../package.json';

  export default {
    name: 'TellshowMenu',
    components: {
      TellshowMenuItem
    },
    props: {
      title: {
        type: String,
        default: null
      },
      iconUrl: {
        type: String,
        default: null
      },
      items: {
        type: Array,
        required: true
      },
      selected: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        selection: this.selected,
        homepage
      };
    },
    methods: {
      itemClick(id) {
        this.selection = id;
        this.$emit('itemClick', id);
      }
    }
  };
</script>

<style lang="scss" scoped>
  // This ensures that the last contained flex item (whichever it is) gets placed at the bottom of
  // the container (https://stackoverflow.com/questions/33924655/position-last-flex-item-at-the-end-of-container)
  //   It's much better to use a flexbox to achieve this rather than positioning the last item
  // using absolute as otherwise that item will over/underlap the rest of the content if the screen
  // is shrunk down, as absolute means the item is treated as not present during the layout.
  .-menu div:last-of-type {
    margin-top: auto;
  }
</style>
