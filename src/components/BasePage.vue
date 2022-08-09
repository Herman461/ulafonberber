<template>
  <div class="page__body">
    <div class="preloader" :class="{hide: !isLoading}"></div>
    <div :class="{active: (activeColumn === 1)}" :style="calculateWidth(columnWidth[0])" class="page__block">
      <slot name="first-block"></slot>
    </div>
    <div :class="{active: (activeColumn === 2)}" :style="calculateWidth(columnWidth[1])" class="page__block">
      <slot name="second-block"></slot>
    </div>
    <div :class="{active: (activeColumn === 3)}" :style="calculateWidth(columnWidth[2])" class="page__block">
      <slot name="third-block"></slot>
    </div>
  </div>
</template>


<script>
import pageInstanceState from "@/pageInstance/page-instance.state";

export default {
  name: 'BasePage',
  methods: {
    calculateWidth(width) {
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
    }
  },
  computed: {
    columnWidth() {
      return pageInstanceState.currentColumnWidth
    },
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    isLoading() {
      return pageInstanceState.isLoading
    }
  },
}
</script>


<style scoped lang="scss">

</style>
