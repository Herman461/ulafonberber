<template>
  <base-header v-if="wasPageScrolled" ref="header" />
  <div class="home">
      <div
          :style="{height: !wasPageScrolled ? '100vh' : 'auto'}"
          :class="{scrolled: wasPageScrolled}"
          class="home__main main-home" ref="mainScreen"
      >
        <div :class="{hidden: isHiddenTop, fixed: isLogoFixed}" class="main-home__logo">
          <svg :style="{width: logo.width, height: logo.height, top: logo.top + '%'} ">
            <use xlink:href="@/assets/images/logo.svg#logo"></use>
          </svg>
        </div>
      </div>
      <div class="line"></div>
      <div ref="gallery" class="gallery" :class="{hidden: isHiddenTop}">
        <div class="gallery__column">
          <gallery-block :page="1" />
        </div>
        <div class="gallery__column">
          <gallery-block :page="2" :count="6" />
        </div>
      </div>
      <div ref="about" class="home__about">
        <about-block />
      </div>
  </div>
</template>

<script>
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import pageInstanceState from "@/pageInstance/page-instance.state";
import {pageStateInit} from "@/pageInstance/page-instance.state";
import BaseHeader from "@/components/common/BaseHeader";
import $ from 'jquery'

export default {
  name: 'HomePage',
  data() {
    return {
      wasMainBlockScrolled: false,
      isHiddenTop: false,
      wasPageScrolled: false,
      isLogoFixed: false,
      logo: {
        top: 50,
        height: 360,
        width: 160,
      }
    }
  },
  created() {
    $(window).scrollTop(0)
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const aboutBlockTopPos = this.$refs.about.getBoundingClientRect().top
      if (aboutBlockTopPos - 150 <= 0 && !this.isHiddenTop) {
        this.isHiddenTop = true
      } else if (aboutBlockTopPos - 150 >= 0 && this.isHiddenTop) {
        this.isHiddenTop = false
      }
    })
    if (this.isLoaded) {
      this.isLogoFixed = true
      this.wasPageScrolled = true
      return
    }
    document.body.style.overflow = 'hidden'
    const initialTopValue = this.logo.top
    const finalLogoWidth = 43
    const finalLogoHeight = 90

    pageStateInit()

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
    .then(() => {
          $('html, body').animate({
            scrollTop: this.$refs.mainScreen.clientHeight
          }, 900, null)
      // $(window).animate({
      //   duration: 900,
      //   behavior: 'smooth',
      //   scrollTop: $(window).height()
      // })
      // this.$refs.gallery.scrollIntoView({ behavior: "smooth" });
    })
    .then(() => {
      setTimeout(() => {
        document.body.style.overflow = 'auto'
        this.wasPageScrolled = true
        $(window).scrollTop(0, 0)
        // window.scrollTo(0, 0)
      }, 1100)
    })

    window.onbeforeunload = function () {
      $(window).scrollTop(0);
    }
    window.addEventListener('scroll', () => {
      const mainScreenHeight  = this.$refs.mainScreen.offsetHeight
      const scrollTop = document.documentElement.scrollTop

      const offset = (scrollTop / mainScreenHeight)
      const percent = ((1 - offset) * 4).toFixed(2)

      if (percent < 1) return
      this.logo.height = percent * finalLogoHeight
      this.logo.width = percent * finalLogoWidth

      this.logo.top = ((1 - offset) * initialTopValue).toFixed(2)
    })



  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    },
    isLoaded() {
      return pageInstanceState.isLoaded
    }
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
