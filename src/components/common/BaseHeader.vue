<template>
  <div :class="{'bg-white': hasBackground, active: isActive, home: isHomePage}" class="header">
    <div class="header__top">
      <button type="button" @click="toggleButton" :class="{active: isActive}" class="header__icon icon">
        <span></span>
        <span></span>
      </button>
      <ul class="header__languages">
        <li class="header__language">中文</li>
        <!--            <li class="header__language">ru</li>-->
        <!--            <li class="header__language">en</li>-->
      </ul>
    </div>
    <div :class="{active: isActive}" class="header__menu menu-header">
      <div class="menu-header__title">about <br>gallery</div>
      <div class="menu-header__label">contact artist agent</div>
      <a href="" class="menu-header__phone">+ 7 ( ___ )___ -__ -__  </a>
      <div class="menu-header__label">socials</div>
      <ul class="menu-header__socials">
        <li class="menu-header__social"><a href="">Instagram</a></li>
        <li class="menu-header__social"><a href="">Facebook</a></li>
        <li class="menu-header__social"><a href="">Pinterest</a></li>
      </ul>
      <div class="menu-header__label">Ссылки для демонстрации страниц</div>
      <div class="menu-header__links">
        <router-link to="/" class="menu-header__link">Главная</router-link>
        <router-link to="/about" class="menu-header__link">О нас</router-link>
        <router-link to="/gallery" class="menu-header__link">Галерея</router-link>
        <router-link to="/" class="menu-header__link">Подробное описание</router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  data() {
    return {
      isActive: false,
      hasBackground: false,
      isHomePage: false
    }
  },
  created() {
    if (this.$route.href === '/') {
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 10 && !this.hasBackground) {
          this.hasBackground = true
        } else if (document.documentElement.scrollTop < 10 && this.hasBackground) {
          this.hasBackground = false
        }
      })
      this.isHomePage = true
    } else {
      this.hasBackground = true
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

    }
  },
}
</script>


<style scoped lang="scss">

</style>
