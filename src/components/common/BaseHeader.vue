<template>
  <div :class="{active: isActive, main: isHomePage}" class="header">
    <div class="header__top">
      <button type="button" @click="toggleButton" :class="{active: isActive}" class="header__icon icon">
        <span></span>
        <span></span>
      </button>
      <ul class="header__languages">
        <li @click="changeLang('ch')" :class="{active: isChineseLang}" class="header__language">中文</li>
        <li @click="changeLang('ru')" :class="{active: isRussianLang}" class="header__language">ru</li>
        <li @click="changeLang('en')" :class="{active: isEnglishLang}" class="header__language">en</li>
        <!--            <li class="header__language">ru</li>-->
        <!--            <li class="header__language">en</li>-->
      </ul>
    </div>
    <div :class="{active: isActive}" class="header__menu menu-header">
      <div class="menu-header__body">
        <ul class="menu-header__list">
          <li @click="closeMenu" class="menu-header__item"><router-link class="menu-header__link" to="/about">about</router-link></li>
          <li @click="closeMenu" class="menu-header__item"><router-link class="menu-header__link" to="/gallery">gallery</router-link></li>
        </ul>
        <div class="menu-header__label">contact artist agent</div>
        <a href="" class="menu-header__phone">+ 7 ( ___ )___ -__ -__  </a>
        <div class="menu-header__label">socials</div>
        <ul class="menu-header__socials">
          <li class="menu-header__social"><a href="">Instagram</a></li>
          <li class="menu-header__social"><a href="">Facebook</a></li>
          <li class="menu-header__social"><a href="">Pinterest</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state";

export default {
  name: "BaseHeader",
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
    }
  }
}
</script>
