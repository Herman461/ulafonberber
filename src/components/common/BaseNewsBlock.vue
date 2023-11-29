<template>
  <div v-if="item.video === '' && item.images.length === 0" class="news__item item-news">
    <div class="item-news__image">
      <el-image
          :style="{'max-width': item.main_image.width + 'px', 'max-height': item.main_image.height + 'px'}"
          :src="'https://ulafonberber.com' + item.main_image.src"
          alt="" lazy
      />
    </div>

    <div v-if="item.date" class="item-news__date">{{item.date}}</div>
    <p v-html="item.description" class="item-news__text"></p>
    <a target="_blank" v-if="item.source === 'Другое'" :href="item.link" v-html="news_view" class="item-news__more"></a>
  </div>
  <div v-if="item.images.length > 0" class="news__slider slider-news">
    <div class="slider-news__top">
      <div @click="slider.slidePrev()" class="slider-news__button-prev">
        <img src="@/assets/images/icons/arrow-prev.svg" alt="">
      </div>
      <div @click="slider.slideNext()" class="slider-news__button-next">
        <img src="@/assets/images/icons/arrow-prev.svg" alt="">
      </div>
    </div>
    <div class="slider-news__body">
      <div class="swiper-container" ref="swiperRef">
        <div class="swiper-wrapper">
          <div v-for="subimage in item.images" class="swiper-slide">
            <div class="item-news">
              <div class="item-news__image">
                <img
                    :src="'https://ulafonberber.com' + subimage.src"
                    alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.date" class="item-news__date">{{item.date}}</div>
      <p v-if="item.description" class="item-news__text">{{item.description}}</p>
      <a v-if="item.source === 'Другое'" :href="item.link" v-html="news_view" class="item-news__more"></a>

    </div>
  </div>

  <div v-if="item.video !== ''" class="news__item item-news">
    <div v-html="item.video" class="item-news__video"></div>

    <div v-if="item.date" class="item-news__date">{{item.date}}</div>
    <p class="item-news__text">{{item.description}}</p>
    <a v-if="item.source === 'Другое'" :href="item.link" class="item-news__more" v-html="news_view"></a>
  </div>
</template>

<script>
import Swiper from "swiper";
import pageInstanceState from "@/pageInstance/page-instance.state";

export default {
  name: "BaseNewsBlock",
  props: {
    item: {
      required: true
    }
  },
  data() {
    return {
      slider: null,
      swiperOptions: {
        autoHeight: true,
        loop: true,
        spaceBetween: 20
      }
    }
  },
  computed: {
    news_view() {
      return pageInstanceState.content['news_view']

    },
  },
  mounted() {
    this.slider = new Swiper(this.$refs.swiperRef, this.swiperOptions)

  },
  methods() {

  }
}
</script>


<style scoped lang="scss">

</style>

