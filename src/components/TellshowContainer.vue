<template>
  <div class="flex flex-row">
    <tellshow-menu
      :title="appName"
      :icon-url="require('@/assets/logo.png')"
      :items="menuItems"
      :selected="feed"
      @itemClick="onItemClick"
    />
    <tellshow-content :items="feedItems" :loading="loading" />
  </div>
</template>

<script>
  import TellshowMenu from './TellshowMenu.vue';
  import TellshowContent from './TellshowContent.vue';
  import { feeds, requestFeed } from '@/helpers/feeds';
  import { name as packageName } from '@/../package.json';

  export default {
    name: 'TellshowContainer',
    components: {
      TellshowMenu,
      TellshowContent
    },
    props: {},
    data() {
      return {
        loading: true,
        feed: Object.keys(feeds)[0],
        feedItems: []
      };
    },
    computed: {
      menuItems() {
        return Object.keys(feeds).map(feed => ({
          id: feed,
          label: this.$t(`feed.feeds.${feed}`)
        }));
      },
      appName() {
        return packageName.charAt(0).toUpperCase() + packageName.slice(1);
      }
    },
    async created() {
      await this.refreshFeedItems();
    },
    methods: {
      async onItemClick(feed) {
        this.feed = feed;
        await this.refreshFeedItems();
      },
      async refreshFeedItems() {
        this.loading = true;
        try {
          const feed = await requestFeed(this.feed);
          this.feedItems = feed.items.map(item => ({
            id: item.guid,
            title: item.title,
            content: this.$t('feed.description', { date: item.pubDate, url: item.link }),
            url: item.link
          }));
        } catch (e) {
          console.error(e);
          this.feedItems = [];
        } finally {
          this.loading = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped></style>
