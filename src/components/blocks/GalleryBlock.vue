<template>
  <div class="works">
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
  data() {
    return {
      images: []
    }
  },
  async created() {
    this.images = await pageController.getGalleryImages(this.page)
  },
}
</script>
