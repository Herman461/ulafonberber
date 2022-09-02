<template>

  <div class="work">
    <router-link to="/gallery" class="work__button-prev">
      <img src="@/assets/images/icons/arrow-prev.svg" alt="">
    </router-link>
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

          <swiper-slide v-for="image in images">
            <el-image
                style="max-width: 100%; height: auto;"
                :src="image"
                :preview-src-list="images"
                :initial-index="4"
                fit="cover"
                @click="onImageClick"
                @close="onImageClose"
            />
          </swiper-slide>
        </swiper>

      </div>
      <div class="work__content">
        <div class="work__title title">
          «Чам» <br>
          Бронза. 82-47-48 <br>
          2022
        </div>
        <div class="work__text">
          <p>Композиция посвящена мистерии Чам (Cham), впечатлившая автора во&nbsp;время пребывания в&nbsp;монастыре Менри. Чам&nbsp;&mdash; одна из&nbsp;самых красочный религиозных церемоний в&nbsp;Тибетской культуре. Мистерия Чам&nbsp;&mdash; это танец мистического содержания, во&nbsp;время которого монахи, облаченные в&nbsp;костюмы и&nbsp;маски персонажей буддийского пантеона, с&nbsp;помощью символических жестов и&nbsp;движений представляли победу Учения над омрачениями ума. Монах облачается в&nbsp;божество, символически обретая его просветлённые качества и&nbsp;отождествляясь с&nbsp;ним.</p>
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
      images: [
        require('@/assets/images/vol_2/Ula_52519_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52475_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52483_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52499_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52501_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52514_DONE-min.jpg'),
      ]
    }
  },
  methods: {
    onImageClick() {
      document.body.classList.add('hide-all')
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
  computed: {
    windowWidth() {
      return window.innerWidth
    },
    windowHeight() {
      return window.innerHeight
    },

  },

}
</script>
