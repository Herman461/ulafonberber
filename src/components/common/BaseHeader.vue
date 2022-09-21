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
      <ul class="header__languages">
        <li @click="changeLang('ch')" :class="{active: isChineseLang}" class="header__language">中文</li>
        <li @click="changeLang('ru')" :class="{active: isRussianLang}" class="header__language">ru</li>
        <li @click="changeLang('en')" :class="{active: isEnglishLang}" class="header__language">en</li>
      </ul>
    </div>
    <div :class="{active: isActive}" class="header__menu menu-header">
      <div class="menu-header__body">
        <ul class="menu-header__list">
          <li @click="closeMenu" class="menu-header__item"><router-link class="menu-header__link" to="/about">about</router-link></li>
          <li @click="closeMenu" class="menu-header__item"><router-link class="menu-header__link" to="/gallery">gallery</router-link></li>
        </ul>
        <div class="menu-header__label" v-html="menuPhoneHeading"></div>
        <a href="" class="menu-header__phone" v-html="menuPhone"></a>
        <div class="menu-header__label" v-html="menuLinksHeading"></div>
        <div class="menu-header__bottom" v-html="menuLinks"></div>
<!--        <ul class="menu-header__socials">-->
<!--          <li class="menu-header__social"><a href="">Instagram</a></li>-->
<!--          <li class="menu-header__social"><a href="">Facebook</a></li>-->
<!--          <li class="menu-header__social"><a href="">Pinterest</a></li>-->
<!--        </ul>-->
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
    }
  },
  data() {
    return {
      isActive: false,
      hasBackground: false,
      isHomePage: false
    }
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
    changeLang(lang) {
      pageInstanceState.language = lang
      document.body.classList.remove('hidden')
      pageInstanceController.getWorks()
      pageInstanceController.getLocalization()
      pageInstanceController.getWork(this.$route.params.id)
    }
  },
  computed: {
    isEnglishLang() {
      return pageInstanceState.language === 'en'
    },
    isChineseLang() {
      return pageInstanceState.language === 'ch'
    },
    isRussianLang() {
      return pageInstanceState.language === 'ru'
    },
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
    }
  }
}
</script>
