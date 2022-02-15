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
    <common-modal :showing="modalShowing" @close="modalShowing = false">
      <h2 class="text-xl font-bold text-gray-900 mb-5">
        {{ $t('app.error') }}
      </h2>
      <p class="text-gray-500 mb-2">{{ $t('app.proxy.help') }}</p>
      <a :href="proxyAccessUrl" target="_blank" class="text-gray-500">{{ proxyAccessUrl }}</a>
    </common-modal>
  </div>
</template>

<script>
  import TellshowMenu from './TellshowMenu.vue';
  import TellshowContent from './TellshowContent.vue';
  import CommonModal from './common/CommonModal.vue';
  import { feeds, requestFeed } from '@/helpers/feeds';
  import { name as packageName } from '@/../package.json';

  export default {
    name: 'TellshowContainer',
    components: {
      TellshowMenu,
      TellshowContent,
      CommonModal
    },
    props: {},
    data() {
      return {
        loading: true,
        feed: Object.keys(feeds)[0],
        feedItems: [],
        modalShowing: false
      };
    },
    computed: {
      menuItems() {
        return Object.keys(feeds).map(feed => ({
          id: feed,
          label: this.$t(`app.feeds.${feed}`)
        }));
      },
      appName() {
        return packageName.charAt(0).toUpperCase() + packageName.slice(1);
      },
      proxyAccessUrl() {
        return process.env.VUE_APP_RSS_PROXY_ACCESS;
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
          this.feedItems = feed.items.map(item => {
            const content = [
              item.contentSnippet || this.$t('app.feed.noDescription'),
              item.pubDate ? this.$t('app.feed.metadata', { date: item.pubDate }) : ''
            ]
              .filter(s => s)
              .join('\n\n');

            return {
              id: item.guid,
              title: item.title,
              content,
              url: item.link,
              preFormatted: true
            };
          });
        } catch (e) {
          console.error(e);
          this.feedItems = [];
          this.modalShowing = true;
        } finally {
          this.loading = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped></style>
