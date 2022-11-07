<template>
  <base-header :is-languages-visible="true" />
  <div class="gallery">
    <!-- Первая колонка с работами -->
    <div class="gallery__column">
      <gallery-block :page="1" />
    </div>

    <!-- Декоративная линия по центру -->
    <div class="gallery__line"></div>

    <!-- Логотип -->
    <router-link to="/" class="gallery__logo">
      <img src="@/assets/images/logo.svg" alt="">
    </router-link>

    <!-- Вторая колонка с работами -->
    <div class="gallery__column">
      <gallery-block :page="2" />
    </div>
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
    // Отмечаем, что страница загружена и откатываем скролл
    pageInstanceState.isLoaded = true;
    $(window).scrollTop(0)
  },

}
</script>
