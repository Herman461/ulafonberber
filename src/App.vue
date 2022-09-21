<template>
  <div :class="{home: isHomePage, 'single-page': isSinglePage, 'gallery-page': isGalleryPage, 'about-page': isAboutPage}" class="wrapper">
    <div class="container">
      <div class="page">
        <template v-if="windowWidth > 767">
          <base-header />
          <div class="preloader" :class="{hidden: !isLoading}"></div>
          <router-link to="/" :class="{top: !isLoading, shifted: showOneLine, fixed: fixedLogo, center: isLogoCentered}" :style="mainLineStyle" class="page__logo logo">
            <img src="@/assets/images/logo.png" alt="">
          </router-link>
          <span class="page__line page__line_first" :class="{showed: !isLoading}" :style="mainLineStyle"></span>
          <span class="page__line" v-if="!showOneLine" :class="{done: animationDone}" :style="{right: columnWidth[2]}"></span>
          <base-page></base-page>
        </template>
        <template v-else>
          <router-view />
        </template>
      </div>
    </div>

  </div>

</template>
<script>
import pageInstanceState, {aboutTextChangePosition, pageStateInit} from "@/pageInstance/page-instance.state.js"
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import BaseHeader from "@/components/common/BaseHeader";
import pageInstanceController from "@/pageInstance/page-instance.controller";
export default {
  name: "App",
  watch: {
    '$route'(to, from) {
      document.body.classList.add('anim')
      setTimeout(() => {
        document.body.classList.remove('anim')
      }, 900)

      if (to.path === '/') {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.home.slice()
        pageInstanceState.activeColumn = 1
        pageInstanceState.activeBlock = null
      }
      if (to.path.includes('/single')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.single.slice()
        pageInstanceState.activeColumn = 2
        pageInstanceState.activeBlock = 'single'
      }
      if (to.path.includes('/about')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.about.slice()
        pageInstanceState.activeColumn = 1
        pageInstanceState.activeBlock = 'about'
      }

      if (to.path.includes('/gallery')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.gallery.slice()
        pageInstanceState.activeColumn = 2
        pageInstanceState.activeBlock = 'gallery'
      }
      // Очищаем работу после того как пользователь покинул её
      if (from.path.includes('/single')) {
        pageInstanceState.activeWork = []
      }
    }
  },
  data() {
    return {
      isLogoCentered: false
    }
  },
  async created() {
    await pageInstanceController.getLocalization()
    console.log(pageInstanceState.content)
    if (window.location.pathname.includes('/single')) {
      this.isLogoCentered = true
    }
  },
  mounted() {
    pageStateInit()
    // искусственная задержка
    setTimeout(() => {
      pageInstanceState.isLoading = false
      this.isLogoCentered = false
      // Завершение анимации
      setTimeout(() => {
        pageInstanceState.animation.done = true
        if (this.isSinglePage || this.isGalleryPage) {
          aboutTextChangePosition()
        }

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
    showOneLine() {
      return pageInstanceState.currentColumnWidth.length === 2
    },
    fixedLogo() {
      return (this.isLoading && pageInstanceState.currentColumnWidth.length === 2)
    },
    isLoading() {
      return pageInstanceState.isLoading
    },
    isHomePage() {
      return this.$route.path === '/'
    },
    isSinglePage() {
      return this.$route.path.includes('/single')
    },

    isAboutPage() {
      return this.$route.path.includes('/about')
    },
    isGalleryPage() {
      return this.$route.path.includes('/gallery')
    },
    animationDone() {
      return pageInstanceState.animation.done
    },
    animationDelay() {
      return pageInstanceState.animation.delay
    },
    mainLineStyle() {
      return {
        left: this.columnWidth[0] !== 'auto' ? this.columnWidth[0] : 'calc(100% - ' + this.columnWidth[1] + ')',
        // right: this.columnWidth[0] === 'auto' ? this.columnWidth[1] : 'auto'
      }
    }
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
