<template>
  <div :class="{active: isActive, main: isHomePage}" class="header">
    <div class="header__top">
      <button type="button" @click="toggleButton" :class="{active: isActive}" class="header__icon icon">
        <span></span>
        <span></span>
      </button>
      <div v-if="showArrow" @click="$router.go(-1)" class="header__button-prev">
        <img src="@/assets/images/icons/arrow-prev.svg" alt="">
      </div>
      <ul :class="{visible: isLanguagesVisible}" class="header__languages">
        <li
            :class="{active: language.code === languageCode}"
            v-for="language in languages"
            @click="changeLang(language.code, $event)"
            class="header__language">{{language.name}}</li>
      </ul>
    </div>
    <div :class="{active: isActive}" class="header__menu menu-header">
      <div class="menu-header__body">
        <ul class="menu-header__list">
          <li @click="closeMenu" class="menu-header__item"><router-link class="menu-header__link" to="/about" v-html="menuItemAbout"></router-link></li>
          <li @click="closeMenu" class="menu-header__item"><router-link class="menu-header__link" to="/gallery" v-html="menuItemGallery"></router-link></li>
        </ul>
        <div class="menu-header__label" v-html="menuPhoneHeading"></div>
        <a href="" class="menu-header__phone" v-html="menuPhone"></a>
        <div class="menu-header__label" v-html="menuLinksHeading"></div>
        <div class="menu-header__bottom" v-html="menuLinks"></div>
      </div>
    </div>
  </div>
</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import pageInstanceController from "@/pageInstance/page-instance.controller";

export default {
  name: "BaseHeader",
  props: {
    showArrow: {
      type: Boolean,
      default: false
    },
    isLanguagesVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: false,
      hasBackground: false,
      isHomePage: false,
      languages: [],

    }
  },
  async created() {
    this.languages = await pageInstanceController.getLanguages()
  },
  methods: {
    toggleButton() {
      this.isActive = !this.isActive
      if (document.body.classList.contains('hidden')) {
        document.body.classList.remove('hidden')
      } else {
        document.body.classList.add('hidden')
      }
    },
    closeMenu() {
      this.isActive = false
      document.body.classList.remove('hidden')
    },
    changeLang(lang, event) {
      document.querySelector('.header__language.active').classList.remove('active')

      event.target.classList.add('active')

      pageInstanceState.language = lang
      document.body.classList.remove('hidden')

      pageInstanceController.getWorks()
      pageInstanceController.getLocalization()
      pageInstanceController.getWork(this.$route.params.id)

      this.closeMenu()
    }
  },
  computed: {
    menuPhone() {
      return pageInstanceState.content['menu_phone']
    },
    menuLinks() {
      return pageInstanceState.content['menu_links']
    },
    menuLinksHeading() {
      return pageInstanceState.content['menu_links_heading']
    },
    menuPhoneHeading() {
      return pageInstanceState.content['menu_phone_heading']
    },
    menuItemAbout() {
      return pageInstanceState.content['menu_item_about']
    },
    menuItemGallery() {
      return pageInstanceState.content['menu_item_gallery']
    },
    languageCode() {
      return pageInstanceState.language
    }
  },
}
</script>
