<template>
  <base-header />
  <div class="gallery">
    <template v-if="windowWidth > 767">

    </template>
    <template v-else>
      <div class="gallery__column">
        <gallery-block :page="1" />
      </div>
      <div class="gallery__line"></div>
      <router-link to="/" class="gallery__logo">
        <img src="@/assets/images/logo.svg" alt="">
      </router-link>
      <div class="gallery__column">
        <gallery-block :page="2" />
      </div>

    </template>
  </div>

</template>

<script>
import pageInstanceState, {pageStateInit} from "@/pageInstance/page-instance.state";
import GalleryBlock from "@/components/blocks/GalleryBlock";
import BaseHeader from "@/components/common/BaseHeader";
import $ from 'jquery'
export default {
  name: "gallery-page",
  components: {BaseHeader, GalleryBlock},
  created() {
    pageStateInit()
  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    },
  },
  mounted() {
    pageInstanceState.isLoaded = true;
    $(window).scrollTop(0)
  },

}
</script>


<style scoped lang="scss">

</style>
