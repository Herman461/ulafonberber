<template>
  <div class="wrapper">
    <div class="container">
      <div class="page" :class="{init: init}">
        <div class="preloader" :class="{hidden: !isLoading}"></div>
        <router-link to="/" :class="{top: !isLoading, shifted: showOneLine, fixed: fixedLogo}" :style="mainLineStyle" class="page__logo logo">
          <img src="@/assets/images/logo.svg" alt="">
        </router-link>
        <span class="page__line" :class="{showed: !isLoading}" :style="mainLineStyle"></span>
        <span class="page__line" v-if="!showOneLine" :class="{done: animationDone}" :style="{right: columnWidth[2]}"></span>
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

      // Прячем вторую линию, если выводим две колонки
      // if (pageInstanceState.currentColumnWidth.length === 2) {
      //   console.log(pageInstanceState.currentColumnWidth)
      //   this.showOneLine = true
      //   this.mainLineStyle.right = this.columnWidth[1]
      // } else {
      //
      //   this.mainLineStyle.left = this.columnWidth[0]
      //
      // }
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
    // Начальное состояние главной
    init() {
      return !pageInstanceState.activeBlock
    },
    columnWidth() {
      return pageInstanceState.currentColumnWidth
    },
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    windowWidth() {
      return pageInstanceState.windowWidth
    },
    showOneLine() {
      return pageInstanceState.currentColumnWidth.length === 2
    },
    fixedLogo() {
      return this.isLoading && pageInstanceState.currentColumnWidth.length === 2
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
    mainLineStyle() {
      return {
        left: this.columnWidth[0] !== 'auto' ? this.columnWidth[0] : 'auto',
        right: this.columnWidth[0] === 'auto' ? this.columnWidth[1] : 'auto'
      }
    }
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
