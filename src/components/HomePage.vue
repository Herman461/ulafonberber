<template>
  <base-header v-if="wasPageScrolled" ref="header" />
  <div class="home">
    <template v-if="windowWidth > 767">
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
    </template>
    <template v-else>
      <div :style="{'min-height': !wasPageScrolled ? '450px' : 'auto', height: !wasPageScrolled ? '100vh' : 'auto'}" :class="{scrolled: wasPageScrolled}" class="home__main main-home" ref="mainScreen">
        <div :class="{hidden: isHiddenLogo}" class="main-home__logo">
          <svg :style="{width: logo.width, height: logo.height, top: logo.top + '%'} ">
            <use xlink:href="@/assets/images/logo.svg#logo"></use>
          </svg>
        </div>
      </div>
      <div class="line"></div>
      <div ref="gallery" class="gallery">
        <div class="gallery__column">
          <gallery-block :page="1" />
        </div>
        <div class="gallery__column">
          <gallery-block :page="2" />
        </div>
      </div>
      <div ref="about" class="home__about">
        <about-block />
      </div>
    </template>
  </div>
</template>

<script>
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import pageInstanceState from "@/pageInstance/page-instance.state";
import {pageStateInit} from "@/pageInstance/page-instance.state";
import BaseHeader from "@/components/common/BaseHeader";

export default {
  name: 'HomePage',
  data() {
    return {
      wasMainBlockScrolled: false,
      isHiddenLogo: false,
      wasPageScrolled: false,
      logo: {
        top: 50,
        height: 360,
        width: 160,
      }
    }
  },
  mounted() {
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
      this.$refs.gallery.scrollIntoView({ behavior: "smooth" });
    })
    .then(() => {
      setTimeout(() => {
        document.body.style.overflow = 'auto'
        this.wasPageScrolled = true
        window.scrollTo(0, 0)
      }, 1000)
    })

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
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
      console.log(this.logo.top)
    })

    window.addEventListener('scroll', () => {
      const aboutBlockTopPos = this.$refs.about.getBoundingClientRect().top
      if (aboutBlockTopPos - 150 <= 0 && !this.isHiddenLogo) {
        this.isHiddenLogo = true
      } else if (aboutBlockTopPos - 150 >= 0 && this.isHiddenLogo) {
        this.isHiddenLogo = false
      }
    })

  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    }
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
