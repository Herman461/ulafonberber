<template>
  <div ref="single" class="single">
    <div class="single__body">
      <div class="single__images">
        <div v-for="imageSrc in images" class="single__image">
          <img :src="imageSrc" alt="">
        </div>
      </div>
      <div class="single__content">
        <div class="single__title title">
          «Чам» <br>
          Бронза. 82-47-48 <br>
          2022
        </div>
        <div class="single__text">
          <p>Композиция посвящена  мистерии Чам (Cham), впечатлившая  автора во время пребывания в    монастыре Менри.
            Чам – одна из самых  красочный религиозных церемоний в   Тибетской культуре. Мистерия Чам - это танец мистического содержания, во время которого монахи, облаченные в костюмы и маски персонажей буддийского пантеона, с помощью символических жестов и движений представляли победу Учения над омрачениями ума.
            Монах облачается в божество, символически обретая его просветлённые качества и отождествляясь с ним.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state";


export default {
  name: "single-block",
  data() {
    return {
      wasScrolled: false,
      lockScroll: false,
      images: [
        require('@/assets/images/vol_2/Ula_52475_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52483_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52499_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52501_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52514_DONE-min.jpg'),
        require('@/assets/images/vol_2/Ula_52519_DONE-min.jpg'),
      ]
    }
  },
  computed: {
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    isAboutPage() {
      return this.$route.path === '/single'
    },
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'single' || this.$route.path === '/single'
    },
  },
  methods: {
  }
}
</script>

