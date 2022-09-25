<template>
  <div class="base-page" :class="{done: animationDone}">

    <div :class="{active: (activeColumn === 1)}" :style="calculateWidth(columnWidth[0])" class="page__block">
<!--      <slot  name="first-block"></slot>-->
      <about-block @expand-first-column="expandFirstCol" />
    </div>

      <div  :class="{active: (activeColumn === 2)}" :style="calculateWidth(columnWidth[1])" class="page__block">
        <Transition>
          <single-block v-if="isSingle" />
        </Transition>
        <Transition>
          <gallery-block :is-first="true" :page="1" v-if="!isSingle" @expand-second-column="expandSecondCol" ></gallery-block>
        </Transition>
      </div>

    <div :class="{active: (activeColumn === 3)}" :style="calculateWidth(columnWidth[2])" class="page__block">
        <gallery-block :is-second="true" :page="2" @expand-third-column="expandThirdCol"></gallery-block>
    </div>
  </div>
</template>


<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BaseHeader from "@/components/common/BaseHeader";
import SingleBlock from "@/components/blocks/SingleBlock";
import pageController from "@/pageInstance/page-instance.controller";

export default {
  name: 'BasePage',
  methods: {
    calculateWidth(width) {
      if (!width) {
        return {
          opacity: 0,
          visibility: 'hidden',
          height: 0,
          width: 0
        }
      }

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
    // временная заглушка
    isSingle() {
      return this.$route.path.includes('/single') && pageInstanceState.activeBlock === 'single'
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
  components: {SingleBlock, BaseHeader, AboutBlock, GalleryBlock},
}
</script>

