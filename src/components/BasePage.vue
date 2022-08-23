<template>
  <div class="base-page" :class="{done: animationDone}">

    <div @scroll="expandFirstCol" :class="{active: (activeColumn === 1)}" :style="calculateWidth(columnWidth[0])" class="page__block">
<!--      <slot  name="first-block"></slot>-->
      <about-block @expand-first-column="expandFirstCol" />
    </div>
    <div>
      <work-block />
    </div>
    <div @scroll="expandSecondCol" :class="{active: (activeColumn === 2)}" :style="calculateWidth(columnWidth[1])" class="page__block">
      <gallery-block :page="1" @expand-second-column="expandSecondCol" name="second-block"></gallery-block>
    </div>
    <div @scroll="expandThirdCol" :class="{active: (activeColumn === 3)}" :style="calculateWidth(columnWidth[2])" class="page__block">
      <gallery-block :page="2" @expand-third-column="expandSecondCol" name="third-block"></gallery-block>
    </div>
  </div>
</template>


<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BaseHeader from "@/components/common/BaseHeader";
import WorkBlock from "@/components/blocks/WorkBlock";


export default {
  name: 'BasePage',
  methods: {
    calculateWidth(width) {
      if (!width) {
        return {
          display: "none"
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
      return this.$route.path === '/single'
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
  components: {WorkBlock, BaseHeader, AboutBlock, GalleryBlock},
}
</script>


<style scoped lang="scss">

</style>
