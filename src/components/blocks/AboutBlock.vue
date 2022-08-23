<template>
  <div ref="about" @scroll="onScroll" :class="{'active': isActiveBlock, 'lock': lockScroll, 'home': isHomePage}" class="about">
    <div class="about__body">
      <div class="about__block">
        <div class="about__image image">
          <router-link to="/about" class="image__item">
            <img src="@/assets/images/portrait/Ula_52965_DONE-min.jpg" alt="">
          </router-link>
        </div>
        <div class="about__title title">about</div>
        <div class="about__quote">
          <span>«То хорошее, что мы получаем от искусства, — это не то, чему оно нас учит, а то, чем мы становимся благодаря ему»</span>
          <div class="about__author">Оскар Уайлд</div>

        </div>

      </div>
      <div class="about__content">
        <p>Современной визуальной культуре присуще упрощение образов, в том числе и в скульптуре.
          Абстрактные формы задают нам вопрос: «Ты чувствуешь?». Работы ULAFONBERBER не стремятся к
          упрощению внешнего, но направляют нас к чистоте и гармонии внутреннего. Тихим шепотом они
          спрашивают нас: «Ты слышишь?».</p>
        <p :class="{hidden: !isAboutPage}">
          Имя ULA воплощает все светское, социальное, то есть осознаваемое. FON означает
          принадлежность к месту, к роду... к своим корням, которые прочно удерживают нас в
          равновесии. BERBER олицетворяет глубинную свободу и силу духа, подобную той, что позволила
          древним племенам Северной Африки – берберам – сохранить свои традиции и язык, свою истинную
          природу даже под натиском мусульманских завоеваний.
          Греческие корни и академическое образование сформировали у скульптора приверженность к
          реалистическому классическому искусству. В то же время ей особенно близка философия
          тибетской духовной традиции Юндрунг Бон, направленной на достижение счастья и благополучия
          через обретение абсолютной свободы. Она наполняет работы ULA гармонией, рождающей истинную
          красоту. Согласно этому древнему учению, причина человеческих страданий не находится вовне,
          а есть следствие наших собственных заблуждений. Как и все духовные учения, Юндрунг Бон
          стремится помогать всем живым существам и делать их жизнь лучше. Поэтому оно не противоречит
          ни одной религии. А скорее наоборот, призывает к осознанной опоре на традиции в поисках
          баланса.
        </p>
        <p :class="{hidden: !isAboutPage}">
          Свое воплощение эта идея нашла в одноименной скульптуре. На первый взгляд, тибетский
          мальчик-монах забавляется, пытаясь удержаться на толстой верёвке. Однако, по замыслу автора,
          он олицетворяет постоянную работу над собой в стремлении сохранить свое внутреннее
          равновесие.
        </p>
        <router-link v-if="!isAboutPage" to="/about" class="about__link link">Читать далее</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state";
import {debounce} from "@/utils/debounce";
export default {
  name: "AboutBlock",
  data() {
    return {
      wasScrolled: false,
      lockScroll: false
    }
  },
  computed: {
    activeColumn() {
      return pageInstanceState.activeColumn
    },
    isAboutPage() {
      return this.$route.path === '/about'
    },
    isActiveBlock() {
      return pageInstanceState.activeBlock === 'about' || this.$route.path === '/about'
    },
    isHomePage() {
      return this.$route.path === '/'
    }
  },
  methods: {
    onScroll() {
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
        setTimeout(function() {
          this.lockScroll = false
          this.wasScrolled = true
          pageInstanceState.lock = false
        }.bind(this), 600)



      }
    },
  },
}
</script>

