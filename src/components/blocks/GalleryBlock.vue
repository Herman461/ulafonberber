<template>
  <div @scroll="onScroll" ref="gallery" class="works" :class="{active: isActiveBlock}">
    <div :class="{'works_central': isCentral}" class="works__image image" v-for="image in images">
      <router-link to="/single" class="image__item">
        <img :src="image.src" alt="">
      </router-link>
      <div class="image__label">{{ image.name }}</div>
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
      type: Number
    },
    isCentral: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'gallery'
    }
  },
  data() {
    return {
      images: [],
      wasScrolled: false,
    }
  },
  async created() {
    this.images = await pageController.getGalleryImages(this.page)
  },
  methods: {
    onScroll() {
      // Если элемент еще не скроллился ни разу
      if (!this.wasScrolled && !this.isActiveBlock) {
        this.$refs.gallery.scrollTo(0, 0)
      }
      console.log('scroll')
      if (!this.isActiveBlock) {

        this.lockScroll = true
        setTimeout(function() {
          this.lockScroll = false
          this.wasScrolled = true
        }.bind(this), 600)


        this.$emit('expand-second-column')
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.gallery
        pageInstanceState.activeBlock = 'gallery'
      }
    },
  },

}
</script>
