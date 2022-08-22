<template>
  <div class="wrapper">
    <div class="container">
      <div class="page">
        <router-link to="/" :class="{top: !isLoading}" class="page__logo logo">
          <img src="@/assets/images/logo.svg" alt="">
        </router-link>
        <span class="page__line" :class="{showed: !isLoading}" :style="{left: columnWidth[0]}"></span>
        <span class="page__line" :class="{done: animationDone}" :style="{right: columnWidth[2]}"></span>
<!--        <template v-else>-->
<!--          <router-link to="/" :style="{right: `calc(${this.columnWidth[1]} - 32px)`}" class="page__logo logo">-->
<!--            <img src="@/assets/images/logo.svg" alt="">-->
<!--          </router-link>-->
<!--          <span class="page__line" :style="{right: columnWidth[1]}"></span>-->
<!--        </template>-->
        <base-page>
          <template v-slot:first-block>
            <about-block />
          </template>
          <template v-slot:second-block>
            <gallery-block :page="1"/>
          </template>
          <template v-slot:third-block>
            <gallery-block :is-central="true" :page="2"/>
          </template>
        </base-page>
      </div>
    </div>

  </div>

</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state.js"
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import BaseHeader from "@/components/common/BaseHeader";
export default {
  name: "App",
  watch: {
    '$route'(to, from) {
      if (to.path === '/') {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.home.slice()
        pageInstanceState.activeColumn = 1
      }
      if (to.path.includes('/single')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.single.slice()
        pageInstanceState.activeColumn = 2
      }
      if (to.path.includes('/about')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.about.slice()
        pageInstanceState.activeColumn = 1
      }
    }
  },
  mounted() {
    // искусственная задержка
    setTimeout(() => {
      pageInstanceState.isLoading = false

      // Завершение анимации
      setTimeout(() => {
        pageInstanceState.animation.done = true
      }, this.animationDelay)

    }, 1500)


  },
  computed: {
    columnWidth() {
      return pageInstanceState.currentColumnWidth
    },
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    windowWidth() {
      return pageInstanceState.windowWidth
    },
    isLoading() {
      return pageInstanceState.isLoading
    },
    animationDone() {
      return pageInstanceState.animation.done
    },
    animationDelay() {
      return pageInstanceState.animation.delay
    },
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
