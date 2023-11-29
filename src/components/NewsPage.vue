<template>
  <base-header :is-languages-invisible="true" />
  <base-languages />
  <div class="gallery">
    <!-- Первая колонка с работами -->
    <div class="gallery__column">
      <news-block :column="firstColumn" :page="1" />
    </div>

    <!-- Декоративная линия по центру -->
    <div class="gallery__line"></div>

    <!-- Логотип -->
    <router-link to="/" class="gallery__logo">
      <img src="@/assets/images/logo.svg" alt="">
    </router-link>

    <!-- Вторая колонка с работами -->
    <div class="gallery__column">
      <news-block :column="secondColumn" :page="2" />
    </div>
  </div>

</template>

<script>
import pageInstanceState, {pageStateInit} from "@/pageInstance/page-instance.state";
import NewsBlock from "@/components/blocks/NewsBlock";
import BaseHeader from "@/components/common/BaseHeader";
import $ from 'jquery'
import BaseLanguages from "@/components/common/BaseLanguages";
import pageController from "@/pageInstance/page-instance.controller";
export default {
  name: "news-page",
  components: {BaseLanguages, BaseHeader, NewsBlock},

  methods: {
    async getWorks() {
      this.isDropdownActive = !this.isDropdownActive
      if (this.languageCode === 'ru') {
        pageInstanceState.activeSection = "Все работы"
        pageInstanceState.activeWorkDescription = ''
      } else if (this.languageCode === 'en') {
        pageInstanceState.activeSection = "All works"
        pageInstanceState.activeWorkDescription = ''
      }

      await pageController.getWorks()

      pageInstanceState.activeWorkDescription = ""
    },
    async updateWorks(id, description, name) {
      this.isDropdownActive = !this.isDropdownActive

      await pageController.updateWorks(id)

      pageInstanceState.activeWorkDescription = description
      pageInstanceState.activeSection = name
    },
  },
  data() {
    return {
      isDropdownActive: false,
      maxScrollTop: 0,
      firstColumn: [],
      secondColumn: []
    }
  },
  created() {
    pageStateInit()

    window.addEventListener('scroll', async () => {
      if (this.isLoadingNews) return

      var scrollHeight = Math.max(
          document.body.scrollHeight, document.body.scrollHeight,
          document.body.offsetHeight, document.body.offsetHeight,
          document.body.clientHeight, document.body.clientHeight
      );
      if (window.pageYOffset > this.maxScrollTop) {
        this.maxScrollTop = window.pageYOffset

        if(window.pageYOffset >= scrollHeight - innerHeight) {
          pageInstanceState.isLoadingNews = true
          pageInstanceState.currentNewsPage += 1
          const firstResult = await pageController.getNews(pageInstanceState.currentNewsPage)
          pageInstanceState.currentNewsPage += 1
          const secondResult = await pageController.getNews(pageInstanceState.currentNewsPage)
          pageInstanceState.firstNewsColumn = [...pageInstanceState.firstNewsColumn, ...firstResult]
          pageInstanceState.secondNewsColumn = [...pageInstanceState.secondNewsColumn, ...secondResult]


          pageInstanceState.isLoadingNews = false
          // this.getNews()
        }

      }
    })

  },
  computed: {
    isLoadingNews() {
      return pageInstanceState.isLoadingNews
    },
    windowWidth() {
      return pageInstanceState.windowWidth
    },
    description() {
      return pageInstanceState.activeWorkDescription
    },
    activeSection() {
      return pageInstanceState.activeSection
    },
    sections() {
      return pageInstanceState.sections

    },
    languageCode() {
      return pageInstanceState.language
    },
    totalToggler() {
      return pageInstanceState.totalToggler
    },
  },
  async mounted() {
    // Отмечаем, что страница загружена и откатываем скролл
    pageInstanceState.isLoaded = true;
    $(window).scrollTop(0)

    await pageController.getSections()

    if (pageInstanceState.sections.length > 0) {
      pageInstanceState.activeWorkDescription = ""

      if (this.languageCode === 'ru') {
        pageInstanceState.activeSection = "Все работы"
      } else if (this.languageCode === 'en') {
        pageInstanceState.activeSection = "All works"
      }

    }
  },

}
</script>
