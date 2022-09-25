<template>
  <div
      @scroll="onScroll"
      ref="gallery"
      class="works"
      :class="{
        active: isActiveBlock,
        lock: isLockedPage,
        'is-first': isFirst,
        'is-second': isSecond
      }">
    <!--  Оболочка  -->
    <div  class="works__body" ref="galleryBody">

      <!--  Изображения  -->
      <div
          :class="{'works_central': isCentral}"
          class="works__image image"
          v-for="image in images">

        <router-link
            @click="onImageClick(image.id)"
            :to='"/single/" + image.id'
            class="image__item"
        >
          <el-image
              :style="{'max-width': '100%', paddingBottom: (image.height / image.width) * 100 + '%'}"
              :src="image.preview_medium"
              alt="" lazy
          />
            <div class="image__label" v-html="image.name"></div>
        </router-link>

      </div>
    </div>
    </div>
</template>

<script>
import pageController from "@/pageInstance/page-instance.controller";
import pageInstanceState from "@/pageInstance/page-instance.state";
import gsap from "gsap";

export default {
  name: "GalleryBlock",
  props: {
    page: {

    },
    isCentral: {
      type: Boolean,
      default: false
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isSecond: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'gallery'
    },
    lock() {
      return pageInstanceState.lock
    },
    isAboutPage() {
      return this.$route.path.includes('/about')
    },
    isSinglePage() {
      return this.$route.path.includes('/single')
    },
    images() {
      // Разделяем поровну изображения для первой и второй колокни
      const length = pageInstanceState.works.length


      if (this.isAboutPage && this.page === 1) {
        return pageInstanceState.works.slice()
      }
      if (this.isSinglePage && this.page === 2) {
        return pageInstanceState.works.slice()
      }

      if (this.page === 1) {

        return pageInstanceState.works.slice(0, Math.floor(length / 2))

      } else {
        return pageInstanceState.works.slice(Math.floor(length / 2), pageInstanceState.works.length + 1)
      }

    }
  },
  mounted() {
  },
  data() {
    return {
      wasLoaded: false,
      wasScrolled: false,
      isLockedPage: false,
      fade: false,
    }
  },
  watch: {
     '$route'(from, to) {


      const coords = this.$refs.gallery.getBoundingClientRect()

      if (pageInstanceState.windowWidth < 991.98) return

      if (to.path === '/' && from.path === '/') return

       // Анимирование колонок, в зависимости от текущей страницы
      if (from.path.includes('/about')) {
        if (this.isFirst) {
          gsap.to('.works.is-first', {
            height: '100%',
            top: '0',
            width: '170px',
            left: "calc(100% - 170px)",
            duration: 0.09,
            ease: 'ease',
          })
        }

        if (this.isSecond) {

          gsap.to('.works.is-second', {
            height: '100%',
            opacity: 0,
            duration: 0,
            ease: 'ease',
          })
        }

      }



     if (from.path === '/') {
        if (this.isFirst) {
          gsap.to('.works.is-first', {
            height: '100%',
            left: '50%',
            top: 0,
            width: '25%',
            duration: 0.09,
            ease: 'ease',
          })
        }
        if (this.isSecond) {
          gsap.to('.works.is-second', {
            height: '100%',
            left: 'calc(100% - 25%)',
            top: 0,
            width: '25%',
            duration: 0.09,
            ease: 'ease',
            opacity: 1
          })
        }
      }



      if (from.path.includes('/single')) {
        gsap.to('.works.is-second', {
          left: 'calc(100% - 170px)',
          top: 0,
          width: '170px',
          height: '100%',
          opacity: 1,
          duration: 0.03,
          ease: 'ease',
        })
      }

      if (from.path.includes('/gallery')) {
        if (this.isFirst) {
          gsap.to('.works.is-first', {
            height: '100%',
            left: '220px',
            top: 0,
            width: '43.5%',
            duration: 0.03,
            ease: 'ease',
          })
        }
        if (this.isSecond) {
          gsap.to('.works.is-second', {
            height: '100%',
            left: '57.5%',
            top: 0,
            width: '43.5%',
            duration: 0.03,
            ease: 'ease',
            opacity: 1,
          })
        }
      }
    },

  },
  methods: {

    async onImageClick(id) {
      // Получаем работу по клику на изображение
      await pageController.getWork(id)
    },
    onScroll() {
      // Исключаем страницы, на которых мы не будем расширять колонку галлереи
      if (this.$route.path.includes('/about') || this.$route.path.includes('/single')) return

      // Если элемент еще не скроллился ни разу
      if (!this.wasScrolled && !this.isActiveBlock) {
        this.$refs.gallery.scrollTo(0, 0)
      }

      // Если пользователь начинает скроллить блок, то делаем его активным и меняем адрес
      if (!this.isActiveBlock && !pageInstanceState.lock) {
        pageInstanceState.activeBlock = 'gallery'
        pageInstanceState.lock = true
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.gallery

        this.$router.push('gallery')

        this.$emit('expand-third-column')

        this.lockScroll = true
        setTimeout(function() {
          this.lockScroll = false

          // this.wasScrolled = true
          pageInstanceState.lock = false
        }.bind(this), 600)
      }
    },
  },

}
</script>
