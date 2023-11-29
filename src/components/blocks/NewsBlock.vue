<template>
  <div
      @scroll="onScroll($event), onScrollNews($event)"
      ref="news"
      class="works news"
      :class="{
        active: isActiveBlock,
        lock: isLockedPage,
        'is-first': isFirst,
        'is-second': isSecond
      }">
    <!--  Оболочка  -->
    <div  class="works__body" ref="newsBody">

      <template v-if="page === 1 && windowWidth > 991.98">

        <ul style="display: none;" class="works__togglers">
          <li @click="getWorks" :class="'active'" class="works__toggler">Все новости</li>
          <li @click="getWorks" class="works__toggler">О нас</li>
          <li class="works__toggler">Социальные сети</li>
        </ul>

      </template>
      <template v-if="page === 1">
        <div class="news__title" v-html="news_social"></div>
        <BaseNewsBlock :key="item.id" :item="item" v-for="item in finalNews" />
      </template>

      <template v-if="page === 2">
        <BaseNewsBlock :key="item.id" :item="item" v-for="item in finalNews" />
      </template>
    </div>
  </div>
</template>

<script>
import pageController from "@/pageInstance/page-instance.controller";
import pageInstanceState, {pageStateInit} from "@/pageInstance/page-instance.state";
import gsap from "gsap";
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css';
import {debounce} from "@/helpers";
import BaseNewsBlock from "@/components/common/BaseNewsBlock";
export default {
  name: "NewsBlock",
  components: {BaseNewsBlock},


  data() {
    return {

      wasLoaded: false,
      wasScrolled: false,
      isLockedPage: false,
      fade: false,
      news: [],
      maxScrollTop: 0,
      lockScroll: false,

    }
  },

  props: {
    page: {

    },
    column: {
      type: Array,
      default: []
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
    news_social() {
      return pageInstanceState.content['news_social']

    },
    finalNews() {
      if (this.page === 1) {
        return pageInstanceState.firstNewsColumn
      } else if (this.page === 2) {
        return pageInstanceState.secondNewsColumn
      }

    },
    currentNewsPage() {
      return pageInstanceState.currentNewsPage
    },
    description() {
      return pageInstanceState.activeWorkDescription
    },

    sections() {
      return pageInstanceState.sections

    },
    isLoadingNews() {
      return pageInstanceState.isLoadingNews
    },
    languageCode() {
      return pageInstanceState.language
    },
    activeSection() {
      return pageInstanceState.activeSection
    },
    windowWidth() {
      return pageInstanceState.windowWidth
    },
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'news'
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
  async mounted() {

    await this.getNews()

    if (this.page === 1) {
      await pageController.getSections()

      if (pageInstanceState.sections.length > 0) {
        pageInstanceState.activeWorkDescription = ""
        if (this.languageCode === 'ru') {
          pageInstanceState.activeSection = "Все работы"
        } else if (this.languageCode === 'en') {
          pageInstanceState.activeSection = "All works"
        }

      }
    }


  },
  created() {
    pageStateInit()

  },
  watch: {
     '$route'(from, to) {


      const coords = this.$refs.news.getBoundingClientRect()

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

      if (from.path.includes('/news')) {
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
    async getNews() {

      pageInstanceState.isLoadingNews = true
      pageInstanceState.currentNewsPage += 1

      let result = null

      if (this.page === 1 && this.currentNewsPage === 2) {
        result = await pageController.getNews(1)
      } else if (this.page === 2 && this.currentNewsPage === 1) {
        result = await pageController.getNews(2)
      } else {
        result = await pageController.getNews(this.currentNewsPage)
      }
      if (result.length === 0) return;

      if (this.page === 1) {
        pageInstanceState.firstNewsColumn = [...pageInstanceState.firstNewsColumn, ...result]

      } else if (this.page === 2) {
        pageInstanceState.secondNewsColumn = [...pageInstanceState.secondNewsColumn, ...result]
      }

      pageInstanceState.isLoadingNews = false
    },
    async getWorks() {
      if (this.languageCode === 'ru') {
        pageInstanceState.activeSection = "Все работы"
        pageInstanceState.activeWorkDescription = ''
      } else if (this.languageCode === 'en') {
        pageInstanceState.activeSection = "All works"
        pageInstanceState.activeWorkDescription = ''
      }

      await pageController.getWorks()
    },
    async updateWorks(id, description, name) {
      await pageController.updateWorks(id)

      pageInstanceState.activeWorkDescription = description
      pageInstanceState.activeSection = name
    },
    async onImageClick(id) {
      // Получаем работу по клику на изображение
      await pageController.getWork(id)
    },
    onScroll() {
      // Исключаем страницы, на которых мы не будем расширять колонку галлереи
      if (this.$route.path.includes('/about') || this.$route.path.includes('/single')) return

      // Если элемент еще не скроллился ни разу
      if (!this.wasScrolled && !this.isActiveBlock) {
        this.$refs.news.scrollTo(0, 0)
      }

      // Если пользователь начинает скроллить блок, то делаем его активным и меняем адрес
      if (!this.isActiveBlock && !pageInstanceState.lock) {
        pageInstanceState.activeBlock = 'news'
        pageInstanceState.lock = true
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.gallery

        this.$router.push('news')

        this.$emit('expand-third-column')

        this.lockScroll = true
        setTimeout(function() {
          this.lockScroll = false

          // this.wasScrolled = true
          pageInstanceState.lock = false
        }.bind(this), 600)
      }



    },
    onScrollNews() {
      if (this.isLoadingNews) return

      var scrollHeight = Math.max(
          this.$refs.news.scrollHeight, this.$refs.news.scrollHeight,
          this.$refs.news.offsetHeight, this.$refs.news.offsetHeight,
          this.$refs.news.clientHeight, this.$refs.news.clientHeight
      );
      if (this.$refs.news.scrollTop > this.maxScrollTop) {
        this.maxScrollTop = this.$refs.news.scrollTop

        if(this.$refs.news.scrollTop >= scrollHeight - innerHeight) {

          this.getNews()
        }

      }
    }
  },

}
</script>
