<template>

  <div class="work">

    <div v-if="activeImageSrc" class="work__viewer work-viewer">
      <div class="work-viewer__body">
        <button @click="closeImage" type="button" class="work-viewer__close"><span></span></button>
        <img :src="activeImageSrc" alt="">
      </div>
    </div>
    <div class="work__body">
      <div class="work__images">
        <swiper
            :space-between="29"
            :slides-per-view="1.3"
        >

          <swiper-slide v-for="image in work.gallary">
            <el-image
                :src="image"
                :preview-src-list="work.gallary"
                :initial-index="4"
                fit="cover"
                @click="onImageClick"
                @close="onImageClose"
            />
          </swiper-slide>
        </swiper>

      </div>
      <div class="work__content">
        <div class="work__title title" v-html="work.name"></div>
        <div class="work__text" v-html="work.description">
        </div>
        <router-link to="/gallery" class="work__link link">Смотреть всю коллекцию</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper/vue/swiper.js';
import { SwiperSlide } from 'swiper/vue/swiper-slide.js';
import 'swiper/swiper-bundle.min.css'
import pageInstanceState from "@/pageInstance/page-instance.state";
import pageInstanceController from "@/pageInstance/page-instance.controller";
import icon from "@/assets/images/icons/arrow-prev.svg";

export default {
  name: "WorkBlock",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      activeImage: null,
      activeImageSrc: null,
      work: [],
    }
  },

  methods: {
    onImageClick() {
      document.body.classList.add('hide-all')
      // Замена стандартных переключателей галереи
      setTimeout(() => {
        const arrowPrev = document.querySelector('.el-image-viewer__btn.el-image-viewer__prev')
        const arrowNext = document.querySelector('.el-image-viewer__btn.el-image-viewer__next')

        const icon = require('@/assets/images/icons/arrow-prev.svg')

        arrowPrev.innerHTML = `
            <span class="el-icon">
                <img src="${icon}" alt="">
            </span>
      `

        arrowNext.innerHTML = `
            <span class="el-icon">
                <img src="${icon}" alt="">
            </span>
      `
      })

    },
    onImageClose() {
      document.body.classList.remove('hide-all')
    },
    expandImageSize($event, imageSrc) {
      this.activeImage = Number($event.target.dataset.index)
      this.activeImageSrc = imageSrc
      document.querySelector('.single').style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    },
    closeImage() {
      document.body.style.overflow = 'auto'
      document.querySelector('.single').style.overflow = 'auto'
      this.activeImageSrc = null
      this.activeImage = null
    }
  },
  async created() {
    await pageInstanceController.getWork(this.$route.params.id)
  },
  computed: {
    windowWidth() {
      return window.innerWidth
    },
    windowHeight() {
      return window.innerHeight
    },
    work() {
      return pageInstanceState.activeWork
    }
  },

}
</script>
