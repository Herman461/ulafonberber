<template>
  <div ref="about" @scroll="onScroll" :class="{'active': isActiveBlock, 'lock': lockScroll, 'home': isHomePage}"
       class="about">
    <div class="about__body">
      <div class="about__block">
        <div class="about__image image">
          <router-link to="/about" class="image__item">
            <img src="@/assets/images/portrait/Ula_52965_DONE-min.jpg" alt="">
          </router-link>
        </div>
        <div class="about__title title">about</div>
        <div class="about__quote">
          <span>&laquo;То&nbsp;хорошее, что мы&nbsp;получаем от&nbsp;искусства,&nbsp;&mdash; это не&nbsp;то, чему оно нас учит, а&nbsp;то, чем мы&nbsp;становимся благодаря ему&raquo;</span>
          <div class="about__author">Оскар Уайлд</div>

        </div>

      </div>

      <Transition>

        <div :class="{hidden: fade}" ref="aboutText" id="about-text" class="about__content">
          <p>Современной визуальной культуре присуще упрощение образов, в&nbsp;том числе и&nbsp;в&nbsp;скульптуре.
            Абстрактные формы задают нам вопрос: &laquo;Ты&nbsp;чувствуешь?&raquo;. Работы ULAFONBERBER не&nbsp;стремятся
            к
            упрощению внешнего, но&nbsp;направляют нас к&nbsp;чистоте и&nbsp;гармонии внутреннего. Тихим шепотом они
            спрашивают нас: &quot;Ты&nbsp;слышишь?</p>
          <p class="about__details">

            Имя ULA воплощает все светское, социальное, то&nbsp;есть осознаваемое. FON означает
            принадлежность к&nbsp;месту, к&nbsp;роду... к&nbsp;своим корням, которые прочно удерживают нас в
            равновесии. BERBER олицетворяет глубинную свободу и&nbsp;силу духа, подобную той, что позволила
            древним племенам Северной Африки&nbsp;&mdash; берберам&nbsp;&mdash; сохранить свои традиции и&nbsp;язык,
            свою истинную
            природу даже под натиском мусульманских завоеваний.
            Греческие корни и&nbsp;академическое образование сформировали у&nbsp;скульптора приверженность к
            реалистическому классическому искусству. В&nbsp;то&nbsp;же время ей&nbsp;особенно близка философия
            тибетской духовной традиции Юндрунг Бон, направленной на&nbsp;достижение счастья и&nbsp;благополучия
            через обретение абсолютной свободы. Она наполняет работы ULA гармонией, рождающей истинную
            красоту. Согласно этому древнему учению, причина человеческих страданий не&nbsp;находится вовне,
            а&nbsp;есть следствие наших собственных заблуждений. Как и&nbsp;все духовные учения, Юндрунг Бон
            стремится помогать всем живым существам и&nbsp;делать их&nbsp;жизнь лучше. Поэтому оно не&nbsp;противоречит
            ни&nbsp;одной религии. А&nbsp;скорее наоборот, призывает к&nbsp;осознанной опоре на&nbsp;традиции в&nbsp;поисках
            баланса.
          </p>
          <p class="about__details">
            Свое воплощение эта идея нашла в&nbsp;одноименной скульптуре. На&nbsp;первый взгляд, тибетский
            мальчик-монах забавляется, пытаясь удержаться на&nbsp;толстой верёвке. Однако, по&nbsp;замыслу автора,
            он&nbsp;олицетворяет постоянную работу над собой в&nbsp;стремлении сохранить свое внутреннее
            равновесие.
          </p>
          <router-link v-if="!isAboutPage" to="/about" class="about__link link">Читать далее</router-link>
        </div>

      </Transition>


    </div>
  </div>
</template>

<script>
import pageInstanceState, {aboutTextChangePosition} from "@/pageInstance/page-instance.state";
import {debounce} from "@/utils/debounce";

export default {
  name: "AboutBlock",
  data() {
    return {
      wasScrolled: false,
      lockScroll: false,
      fade: false
    }
  },
  computed: {
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    isAboutPage() {
      return this.$route.path === '/about'
    },
    isSinglePage() {
      return this.$route.path === '/single'
    },
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'about' || this.$route.path === '/about'
    },
    isHomePage() {
      return this.$route.path === '/'
    },
    aboutTextPosition() {
      return pageInstanceState.textPosition.about
    },
  },
  methods: {
    onScroll() {
      // Расширяем колонку только на главной странице
      if (!(this.$route.path === '/')) return
      // Если элемент еще не скроллился ни разу
      if (!this.wasScrolled && !this.isActiveBlock) {
        this.$refs.about.scrollTo(0, 0)
      }

      if (!this.isActiveBlock && !pageInstanceState.lock) {
        pageInstanceState.activeBlock = 'about'
        pageInstanceState.lock = true
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.about

        this.$router.push('about')

        this.lockScroll = true
        this.$emit('expand-first-column')
        setTimeout(function () {
          this.lockScroll = false
          this.wasScrolled = true
          pageInstanceState.lock = false
        }.bind(this), 600)


      }
    },
  },
  watch: {
    '$route'(from, to) {

      if (this.isSinglePage) {
        aboutTextChangePosition()
      } else {
        pageInstanceState.textPosition.about = 0
      }

      if (from.path.includes('/single') && to.path.includes('/single')) return
      // Анимация для текстового блока
      this.fade = true
      setTimeout(() => {
        this.fade = false
      }, 900)
    }
  }
}
</script>

