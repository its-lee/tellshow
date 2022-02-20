<template>
  <div class="main-content h-screen flex-1 bg-gray-100 md:mt-0 pt-8 md:pt-0 md:pb-0 w-full">
    <div class="flex flex-col h-full">
      <div class="bg-gray-800">
        <input
          v-model="textFilter"
          type="text"
          class="shadow-sm rounded-lg m-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-center w-6/12"
          :placeholder="$t('app.textFilter.placeholder')"
        />
      </div>
      <common-spinner v-if="loading" />
      <common-list
        v-else
        class="overflow-y-auto grow overflow-x-hidden md:overflow-x-visible"
        :items="filteredItems"
      />
    </div>
  </div>
</template>

<script>
  import CommonList from './common/CommonList';
  import CommonSpinner from './common/CommonSpinner.vue';

  export default {
    name: 'TellshowContent',
    components: {
      CommonList,
      CommonSpinner
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      textFilter: ''
    }),
    computed: {
      filteredItems() {
        const textFilter = this.textFilter.toLowerCase();
        // Check in multiple fields for the presence of the text filter
        return this.items.filter(item => {
          return [item.title, item.content].some(field => field.toLowerCase().includes(textFilter));
        });
      }
    },
    watch: {
      items() {
        // If the underlying items change, then reset our local filter applied on them.
        this.textFilter = '';
      }
    }
  };
</script>

<style lang="scss" scoped></style>
