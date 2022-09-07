<template>
  <div @scroll="onScroll" ref="gallery" class="works" :class="{active: isActiveBlock, lock: isLockedPage}">
      <div :class="{'works_central': isCentral}" class="works__image image" v-for="image in images">
        <router-link @click="onImageClick(image.id)" :to='"/single/" + image.id' class="image__item">
          <el-image :src="image.preview_medium" alt="" lazy />
        </router-link>
        <div class="image__label" v-html="image.name"></div>
      </div>
    </div>
</template>

<script>
import pageController from "@/pageInstance/page-instance.controller";
import pageInstanceState from "@/pageInstance/page-instance.state";


export default {
  name: "GalleryBlock",
  props: {
    page: {

    },
    // orientation: {
    //   type: String
    // },
    isCentral: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'gallery'
    },
    lock() {
      return pageInstanceState.lock
    },
    images() {
      const length = pageInstanceState.works.length

      if (this.page === 1) {
        return pageInstanceState.works.slice(0, Math.floor(length / 2))
      } else {
        return pageInstanceState.works.slice(Math.floor(length / 2), -1)
      }
      // return pageInstanceState.works
      // if (this.orientation === 'horizontal') {
      //   return pageInstanceState.horizontalWorks
      // } else {
      //   return pageInstanceState.verticalWorks
      // }
    }
  },
  data() {
    return {

      wasScrolled: false,
      isLockedPage: false,
      fade: false
    }
  },
  methods: {
    async onImageClick(id) {
      await pageController.getWork(id)
    },
    onScroll() {
      // Исключаем страницы, на которых мы не будем расширять колонку галлереи
      if (this.$route.path.includes('/about') || this.$route.path.includes('/single')) return
      // Если элемент еще не скроллился ни разу
      // if (!this.wasScrolled && !this.isActiveBlock && !this.lock) {
      //   this.isLockedPage = true
      //   pageInstanceState.lock = true
      //   this.$refs.gallery.scrollTo(0, 0)
      //   setTimeout(() => {
      //     this.isLockedPage = false
      //     pageInstanceState.lock = false
      //   }, 600)
      //   this.wasScrolled = true
      // }

      // Если элемент еще не скроллился ни разу
      if (!this.wasScrolled && !this.isActiveBlock) {
        this.$refs.gallery.scrollTo(0, 0)
      }


      if (!this.isActiveBlock && !pageInstanceState.lock) {
        pageInstanceState.activeBlock = 'gallery'
        pageInstanceState.lock = true
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.gallery

        this.$router.push('gallery')

        this.$emit('expand-third-column')

        this.lockScroll = true
        setTimeout(function() {
          this.lockScroll = false

          // this.wasScrolled = true
          pageInstanceState.lock = false
        }.bind(this), 600)
      }
    },
  },

}
</script>
