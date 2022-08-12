<template>
  <div class="wrapper">
    <div class="container">
      <div class="page">
        <template v-if="columnWidth.length === 3">
          <router-link to="/" :style="{left: `calc(${this.columnWidth[0]} - 32px)`}" class="page__logo logo">
            <img src="@/assets/images/logo.svg" alt="">
          </router-link>
          <span class="page__line" :style="{left: columnWidth[0]}"></span>
          <span class="page__line" :style="{right: columnWidth[2]}"></span>
        </template>
        <template v-else>
          <router-link to="/" :style="{right: `calc(${this.columnWidth[1]} - 32px)`}" class="page__logo logo">
            <img src="@/assets/images/logo.svg" alt="">
          </router-link>
          <span class="page__line" :style="{right: columnWidth[1]}"></span>
        </template>
        <router-view />
      </div>
    </div>

  </div>

</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state.js"

export default {
  name: "App",
  watch: {
    '$route'(to, from) {
      if (to.path === '/') {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.home.slice()
        pageInstanceState.activeColumn = 1
      }
      if (to.path.includes('/single')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.single.slice()
        pageInstanceState.activeColumn = 2
      }
      if (to.path.includes('/about')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.about.slice()
        pageInstanceState.activeColumn = 1
      }
      // искусственная задержка
      pageInstanceState.isLoading = true
      setTimeout(() => {
        pageInstanceState.isLoading = false
      }, 300)
    }
  },
  computed: {
    columnWidth() {
      return pageInstanceState.currentColumnWidth
    },
    activeColumn() {
      return pageInstanceState.activeColumn
    }
  },
}
</script>
