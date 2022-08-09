<template>
  <div class="wrapper">
    <div class="container">
      <div class="page">
        <router-link to="/" :style="{left: `calc(${columnWidth[0]} - 32px)`}" class="page__logo logo">
          <img src="@/assets/images/logo.svg" alt="">
        </router-link>
        <span class="page__line" :style="{left: columnWidth[0]}"></span>
        <span class="page__line" :style="{right: columnWidth[2]}"></span>
        <router-view />
      </div>
    </div>

  </div>

</template>

<script>
import pageInstanceState from "@/pageInstance/page-instance.state.js"

export default {
  name: "App",
  watch: {
    '$route'(to, from) {
      if (to.path === '/') {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.home.slice()
        pageInstanceState.activeColumn = 1
      }
      if (to.path.includes('/single')) {
        pageInstanceState.currentColumnWidth = pageInstanceState.columnWidth.single.slice()
        pageInstanceState.activeColumn = 2
      }
      // искусственная задержка
      pageInstanceState.isLoading = true
      setTimeout(() => {
        pageInstanceState.isLoading = false
      }, 300)
    }
  },
  computed: {
    columnWidth() {
      return pageInstanceState.currentColumnWidth
    },
    activeColumn() {
      return pageInstanceState.activeColumn
    }
  },
}
</script>

<style>

.preloader {
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  transition: all 0.6s ease 0s;
}

.preloader.hide {
  transform: translateY(-100%);
  opacity: 0;
}

@font-face {
  font-family: "Body";
  font-display: swap;
  src: url("./assets/fonts/Body-Text-Slim-Light.woff") format("woff"), url("./assets/fonts/Body-Text-Slim-Light.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Body";
  font-display: swap;
  src: url("./assets/fonts/Body-Text-Slim-Light.woff") format("woff"), url("./assets/fonts/Body-Text-Slim-Light.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Mabry Pro";
  font-display: swap;
  src: url("./assets/fonts/Mabry Pro Light Italic.woff") format("woff"), url("./assets/fonts/Mabry Pro Light Italic.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Mabry Pro";
  font-display: swap;
  src: url("./assets/fonts/Mabry Pro Light Italic.woff") format("woff"), url("./assets/fonts/Mabry Pro Light Italic.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Mabry Pro";
  font-display: swap;
  src: url("./assets/fonts/Mabry Pro Light.woff") format("woff"), url("./assets/fonts/Mabry Pro Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Mabry Pro";
  font-display: swap;
  src: url("./assets/fonts/Mabry Pro Light.woff") format("woff"), url("./assets/fonts/Mabry Pro Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Mabry Pro";
  font-display: swap;
  src: url("./assets/fonts/Mabry Pro.woff") format("woff"), url("./assets/fonts/Mabry Pro.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Mabry Pro";
  font-display: swap;
  src: url("./assets/fonts/Mabry Pro.woff") format("woff"), url("./assets/fonts/Mabry Pro.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "TRIAL";
  font-display: swap;
  src: url("./assets/fonts/TRIAL-Stravinsky-Extralight.woff") format("woff"), url("./assets/fonts/TRIAL-Stravinsky-Extralight.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "TRIAL";
  font-display: swap;
  src: url("./assets/fonts/TRIAL-Stravinsky-Extralight.woff") format("woff"), url("./assets/fonts/TRIAL-Stravinsky-Extralight.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

* {
  padding: 0;
  margin: 0;
  border: 0;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus,
:active {
  outline: none;
}

a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
  background-color: transparent;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: 400;
}

.ibg {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.ibg img {
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  opacity: 0;
  visibility: hidden;
}

.stroke svg {
  fill: none !important;
}

a {
  color: inherit;
}

.container {
  padding: 0 15px;
  max-width: 1390px;
  margin: 0 auto;
}

body {
  font-weight: 400;
  font-family: "Mabry Pro", sans-serif;
  font-size: 18px;
  background: #F4F4EE;
  color: #313032;
  overflow: hidden;
}

p {
  margin-bottom: 30px;
  font-weight: 300;
  line-height: calc(23.4 / 18 * 100%);
}

p:last-child {
  margin-bottom: 0;
}

::-webkit-scrollbar {
  width: 0;
}

.page {

  position: relative;
}
.page__body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.page__line {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  z-index: 9;
  transition: all 0.6s ease 0s;
  background-color: #000000;
}

/*.page__block {*/
/*  -webkit-box-flex: 0;*/
/*  -ms-flex-positive: 0;*/
/*  flex-grow: 0;*/
/*  -ms-flex-negative: 1;*/
/*  flex-shrink: 1;*/
/*  -ms-flex-preferred-size: 25%;*/
/*  flex-basis: 25%;*/
/*  padding-top: 208px;*/
/*  max-height: 100vh;*/
/*  padding-bottom: 30px;*/
/*  border-right: 1px solid #000000;*/
/*  overflow: auto;*/
/*}*/

.page__block {
  overflow: auto;
  padding-top: 208px;
  max-height: 100vh;
  padding-bottom: 30px;
}

/*.page__block_small {*/
/*  -ms-flex-negative: 0;*/
/*  flex-shrink: 0;*/
/*  -ms-flex-preferred-size: 210px;*/
/*  flex-basis: 210px;*/
/*}*/

/*.page__block_ultra-small {*/
/*  -webkit-box-flex: 0;*/
/*  -ms-flex: 0 0 170px;*/
/*  flex: 0 0 170px;*/
/*  padding-left: 42px;*/
/*  padding-top: 210px !important;*/
/*}*/

.about {
  padding-right: 42px;
}
.work {
  padding-right: 82px;
  padding-left: 130px;
}
.works_middle {
  padding-left: 22px !important;
  padding-top: 35%;
}

.collection {
  padding-left: 43px;
}

.page__logo {
  position: absolute;
  top: 29px;
  z-index: 10;
  transition: all 0.6s ease 0s;
}

.logo {
  width: 68px;
  height: 68px;
}

.works {
  padding-left: 82px;
  padding-right: 22px;
}
.about__title {
  margin-bottom: 117px;
}

/*.page__block.active {*/
/*  -webkit-box-flex: 0;*/
/*  -ms-flex-positive: 0;*/
/*  flex-grow: 0;*/
/*  -ms-flex-negative: 0;*/
/*  flex-shrink: 0;*/
/*  -ms-flex-preferred-size: 50%;*/
/*  flex-basis: 50%;*/
/*}*/

.item-about__text p {
  font-size: 12px;
}

.item-about__title {
  margin-bottom: 26px;
}

.page__block.active .item-about {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.page__block.active .item-about__block {
  max-width: none;
}

.page__block.active .item-about__text {
  padding-left: 43px;
  max-width: 340px;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

.page__block.active .item-about__text p {
  font-size: 18px;
}

/*.page__block_big.active {*/
/*  -ms-flex-preferred-size: auto;*/
/*  flex-basis: auto;*/
/*  -ms-flex-negative: 1;*/
/*  flex-shrink: 1;*/
/*  -webkit-box-flex: 1;*/
/*  -ms-flex-positive: 1;*/
/*  flex-grow: 1;*/
/*  padding-top: 75px;*/
/*}*/

.item-about__block {
  max-width: 134px;
}

.page__block.active .item-about__block {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 212px;
  flex: 0 0 212px;
}

.title {
  font-size: 22px;
  line-height: 130%;
}

.link {
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  text-decoration: underline;
}

.image {
  display: inline-block;
}

.image__item {
  margin-bottom: 12px;
  display: inline-block;
}

.image__item img {
  max-width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center center;
  object-position: center center;
  cursor: pointer;
  height: auto;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.image__item_small {
  width: 50%;
}

.image__item_small img {
  min-height: 120px;
}

.image__item_small + .image__label {
  text-align: left;
}

.image__label {
  text-align: right;
  font-weight: 300;
  font-size: 16px;
  white-space: nowrap;
}

.works__image {
  margin-bottom: 147px;
}

.works__image:last-child {
  margin-bottom: 0;
}

.work__body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 0 -21px;
}

.work__images {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 45%;
  flex: 0 1 45%;
  padding: 0 21px;
}

.work__content {
  -webkit-box-flex: 0;
  -ms-flex: 0 1 55%;
  flex: 0 1 55%;
  padding: 0 21px;
}

.work__title {
  margin-bottom: 49px;
}

.work__text {
  margin-bottom: 42px;
}

.work__text:last-child {
  margin: 0;
}

.collection__image {
  margin-bottom: 46px;
}

.collection__image:last-child {
  margin: 0;
}

@media (any-hover: hover) {
  .image__item:hover img {
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
  }
}
</style>
