<template>
  <base-header />
  <div class="about-page">
    <template v-if="windowWidth > 767">
      <base-page>
        <template v-slot:first-block>
          <about-block />
        </template>
        <template v-slot:second-block>
          <collection-block />
        </template>
      </base-page>
    </template>
    <template v-else>
      <div class="about-page__main">
        <about-block />
      </div>

      <router-link to="/" class="about-page__link link">Вернуться</router-link>
    </template>
  </div>
</template>

<script>
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import CollectionBlock from "@/components/blocks/CollectionBlock";
import BaseHeader from "@/components/common/BaseHeader";
import pageInstanceState, {pageStateInit} from "@/pageInstance/page-instance.state";
import $ from "jquery";
export default {
  name: 'AboutPage',
  components: {BaseHeader, CollectionBlock, BasePage, AboutBlock},
  created() {
    pageStateInit()
  },
  mounted() {
    pageInstanceState.isLoaded = true;
    $(window).scrollTop(0)
  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    }
  }
}
</script>
