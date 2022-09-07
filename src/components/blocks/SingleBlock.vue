<template>
  <div ref="single" class="single">
    <div class="single__body">
      <div class="single__images">

        <div v-for="imageSrc in work.gallary" class="single__image">
          <el-image
              style="max-width: 100%; height: auto;"
              :src="imageSrc"
              :preview-src-list="work.gallary"
              :initial-index="4"
              fit="cover"
              @click="onImageClick"
              @close="onImageClose"
              lazy
          />
        </div>
      </div>
      <div class="single__content">
        <div class="single__title title" :class="{hidden: fade}"  v-html="work.name"></div>
        <div class="single__text" :class="{hidden: fade}" v-html="work.description">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import 'element-plus/dist/index.css'
import icon from "@/assets/images/icons/arrow-prev.svg";
import pageInstanceController from "@/pageInstance/page-instance.controller";

export default {
  name: "single-block",
  data() {
    return {
      wasScrolled: false,
      lockScroll: false,
      fade: false,
    }
  },
  mounted() {
    // Замена стандартных переключателей галереи
    // const arrowPrev = document.querySelector('.el-image-viewer__btn.el-image-viewer__prev')
    // const arrowNext = document.querySelector('.el-image-viewer__btn.el-image-viewer__prev')
    //
    // const icon = require('@/assets/images/icons/arrow-prev.svg')
    //
    // arrowPrev.outerHTML = `
    //   <div class="el-image-viewer__btn el-image-viewer__prev">
    //     <img src="${icon}" alt="">
    //   </div>
    // `
  },
  async created() {
    await pageInstanceController.getWork(this.$route.params.id)
  },
  methods: {
    onImageClick() {
      document.body.classList.add('hide-all')
      // Замена стандартных переключателей галереи
      setTimeout(() => {
        const arrowPrev = document.querySelector('.el-image-viewer__btn.el-image-viewer__prev')
        const arrowNext = document.querySelector('.el-image-viewer__btn.el-image-viewer__next')

        const icon = require('@/assets/images/icons/arrow-prev.svg')

        arrowPrev.innerHTML = `
            <span class="el-icon">
                <img src="${icon}" alt="">
            </span>
      `

        arrowNext.innerHTML = `
            <span class="el-icon">
                <img src="${icon}" alt="">
            </span>
      `
      })

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
      return this.$route.path.includes('/single')
    },
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'single' || this.$route.path.includes('/single')
    },
    work() {
      return pageInstanceState.activeWork
    }
  },
  // async created() {
  //   // const id = this.$route.params.id
  // },
  watch: {
    async '$route'(from, to) {
      if (from.path.includes('single')) {
        await pageInstanceController.getWork(this.$route.params.id)
        return
      }

      // Анимация для текстового блока
      this.fade = true
      setTimeout(() => {
        this.fade = false
      }, 3000)
    }
  }
}
</script>

