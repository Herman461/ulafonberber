<template>
  <div ref="single" class="single">
    <div class="single__body">
      <div class="single__images">

        <div v-for="imageSrc in images" class="single__image">
          <el-image
              style="max-width: 100%; height: auto;"
              :src="imageSrc"
              :preview-src-list="images"
              :initial-index="4"
              fit="cover"
              @click="onImageClick"
              @close="onImageClose"
          />
        </div>
      </div>
      <div class="single__content">
        <div class="single__title title">
          «Чам» <br>
          Бронза. 82-47-48 <br>
          2022
        </div>
        <div class="single__text" :class="{hidden: fade}">
          <p>Композиция посвящена мистерии Чам (Cham), впечатлившая автора во&nbsp;время пребывания в&nbsp;монастыре Менри.
            Чам&nbsp;&mdash; одна из&nbsp;самых красочный религиозных церемоний в&nbsp;Тибетской культуре. Мистерия Чам&nbsp;&mdash; это танец мистического содержания, во&nbsp;время которого монахи, облаченные в&nbsp;костюмы и&nbsp;маски персонажей буддийского пантеона, с&nbsp;помощью символических жестов и&nbsp;движений представляли победу Учения над омрачениями ума.
            Монах облачается в&nbsp;божество, символически обретая его просветлённые качества и&nbsp;отождествляясь с&nbsp;ним.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import 'element-plus/dist/index.css'

export default {
  name: "single-block",
  data() {
    return {
      wasScrolled: false,
      lockScroll: false,
      fade: false,
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
  watch: {
    '$route'(from, to) {
      // Анимация для текстового блока
      this.fade = true
      setTimeout(() => {
        this.fade = false
      }, 3000)
    }
  }
}
</script>

