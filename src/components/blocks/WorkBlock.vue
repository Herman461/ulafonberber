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
          <swiper-slide v-for="(imageSrc, index) in card.images">
            <router-link to="/single" class="work__image image">
              <div class="image__item">
                <img @click="expandImageSize($event, imageSrc)" :class="{active: activeImage === index}" :data-index="index" :src="imageSrc" alt="">
              </div>
            </router-link>
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
          <p>Композиция посвящена  мистерии Чам (Cham), впечатлившая  автора во время пребывания в    монастыре Менри.
            Чам – одна из самых  красочный религиозных церемоний в   Тибетской культуре. Мистерия Чам - это танец мистического содержания, во время которого монахи, облаченные в костюмы и маски персонажей буддийского пантеона, с помощью символических жестов и движений представляли победу Учения над омрачениями ума.
            Монах облачается в божество, символически обретая его просветлённые качества и отождествляясь с ним.</p>
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

      card: {
        images: [
            require('@/assets/images/vol_2/Ula_52475_DONE-min.jpg'),
            require('@/assets/images/vol_2/Ula_52483_DONE-min.jpg'),
            require('@/assets/images/vol_2/Ula_52499_DONE-min.jpg'),
            require('@/assets/images/vol_2/Ula_52501_DONE-min.jpg'),
            require('@/assets/images/vol_2/Ula_52514_DONE-min.jpg'),
            require('@/assets/images/vol_2/Ula_52519_DONE-min.jpg'),
        ]
      }
    }
  },
  methods: {
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
    }
  },

}
</script>
