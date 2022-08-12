<template>
  <base-header />
  <div class="home">
    <template v-if="windowWidth > 767">
      <base-page>
        <template v-slot:first-block>
          <about-block/>
        </template>
        <template v-slot:second-block>
          <gallery-block :page="1"/>
        </template>
        <template v-slot:third-block>
          <gallery-block :is-central="true" :page="2"/>
        </template>
      </base-page>
    </template>
    <template v-else>
      <div class="home__intro intro">
        <div class="intro__image">
          <img src="@/assets/images/intro.jpg" alt="">
        </div>
        <div class="intro__logo">
          <img src="@/assets/images/logo_big.svg" alt="">
        </div>
        <div class="intro__arrow">
          <svg>
            <use xlink:href="@/assets/images/icons.svg#arrow-down"></use>
          </svg>
        </div>
      </div>
      <div class="home__title">about</div>
      <p class="home__text">Современной визуальной культуре присуще упрощение образов, в том числе и в скульптуре.
        Абстрактные формы задают нам вопрос: «Ты чувствуешь?». Работы ULAFONBERBER не стремятся к
        упрощению внешнего, но направляют нас к чистоте и гармонии внутреннего. Тихим шепотом они
        спрашивают нас: «Ты слышишь?».</p>
      <div class="home__image image">
        <router-link to="/" class="image__item">
          <img src="@/assets/images/portrait/Ula_52965_DONE-min.jpg" alt="">
        </router-link>
      </div>
      <p>ULAFONBERBER</p>
      <p>
        Имя ULA воплощает все светское, социальное, то есть осознаваемое. FON означает
        принадлежность к месту, к роду... к своим корням, которые прочно удерживают нас в
        равновесии. BERBER олицетворяет глубинную свободу и силу духа, подобную той, что позволила
        древним племенам Северной Африки – берберам – сохранить свои традиции и язык, свою истинную
        природу даже под натиском мусульманских завоеваний.
      </p>
      <div class="home__works">
        <gallery-block :page="1"/>
      </div>
      <p>
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
      <p>
        Свое воплощение эта идея нашла в одноименной скульптуре. На первый взгляд, тибетский
        мальчик-монах забавляется, пытаясь удержаться на толстой верёвке. Однако, по замыслу автора,
        он олицетворяет постоянную работу над собой в стремлении сохранить свое внутреннее
        равновесие.
      </p>
      <div class="home__link link link_big">смотреть галерею</div>
    </template>
  </div>
</template>

<script>
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import pageInstanceState from "@/pageInstance/page-instance.state";
import {pageStateInit} from "@/pageInstance/page-instance.state";
import BaseHeader from "@/components/common/BaseHeader";

export default {
  name: 'HomePage',
  created() {
    pageStateInit()
  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    }
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
