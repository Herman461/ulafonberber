<template>
  <div class="base-page" :class="{done: animationDone}">
    <!--  Первая колонка  -->
    <div :class="{active: (activeColumn === 1)}" :style="calculateWidth(columnWidth[0])" class="page__block">
      <about-block @expand-first-column="expandFirstCol" />
    </div>
    <!--  Вторая колонка  -->
      <div  :class="{active: (activeColumn === 2)}" :style="calculateWidth(columnWidth[1])" class="page__block">
        <Transition>
          <single-block v-if="isSingle" />
        </Transition>
        <Transition>
          <gallery-block :is-first="true" :page="1" v-if="!isSingle && !isNews" @expand-second-column="expandSecondCol" ></gallery-block>
        </Transition>
        <Transition>
          <news-block :is-first="true" :page="1" v-if="!isSingle && isNews" @expand-second-column="expandSecondCol" ></news-block>
        </Transition>
      </div>
    <!--  Третья колонка  -->
    <div :class="{active: (activeColumn === 3)}" :style="calculateWidth(columnWidth[2])" class="page__block">
        <gallery-block v-if="!isNews" :is-second="true" :page="2" @expand-third-column="expandThirdCol"></gallery-block>
        <news-block v-if="isNews" :is-second="true" :page="2" @expand-third-column="expandThirdCol"></news-block>
    </div>
  </div>
</template>


<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import GalleryBlock from "@/components/blocks/GalleryBlock";
import NewsBlock from "@/components/blocks/NewsBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BaseHeader from "@/components/common/BaseHeader";
import SingleBlock from "@/components/blocks/SingleBlock";
import pageController from "@/pageInstance/page-instance.controller";

export default {
  name: 'BasePage',
  methods: {
    calculateWidth(width) {
      // Функция рассчитывает ширину колонок

      // Если не указана ширина, то скрываем колонку
      if (!width) {
        return {
          opacity: 0,
          visibility: 'hidden',
          height: 0,
          width: 0
        }
      }
      // Устанавливаем высоту
      let property
      if (width.includes('auto')) {
        property = `1 1 ${width}`
      } else if (width.includes('px')) {
        property = `0 0 ${width}`
      } else if (width.includes('%')) {
        property = `0 1 ${width}`
      }

      return {
        flex: property
      }
    },
    expandFirstCol() {
      if (pageInstanceState.activeColumn !== 1) {
        pageInstanceState.activeColumn = 1
      }
    },
    expandSecondCol() {
      if (pageInstanceState.activeColumn !== 2) {
        pageInstanceState.activeColumn = 2
      }
    },
    expandThirdCol() {
      if (pageInstanceState.activeColumn !== 3) {
        pageInstanceState.activeColumn = 3
      }
    }
  },
  computed: {
    isSingle() {
      return this.$route.path.includes('/single') && pageInstanceState.activeBlock === 'single'
    },
    isNews() {
      return this.$route.path.includes('/news') && pageInstanceState.activeBlock === 'news'
    },
    columnWidth() {
      return pageInstanceState.currentColumnWidth
    },
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    isLoading() {
      return pageInstanceState.isLoading
    },
    animationDone() {
      return pageInstanceState.animation.done
    }
  },
  async created() {
    await pageController.getWorks()
  },
  components: {SingleBlock, BaseHeader, AboutBlock, GalleryBlock, NewsBlock},
}
</script>

