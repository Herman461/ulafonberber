<template>
  <base-page>
    <template v-slot:first-block>
      <home-block />
    </template>
    <template v-slot:second-block>
      <gallery-block />
    </template>
    <template v-slot:third-block>
      <works-block />
    </template>
  </base-page>
</template>

<script>
import GalleryBlock from "@/components/blocks/GalleryBlock";
import HomeBlock from "@/components/blocks/HomeBlock";
import WorksBlock from "@/components/blocks/WorksBlock";
import BasePage from "@/components/BasePage";

export default {
  name: 'HomePage',
  components: {BasePage, WorksBlock, HomeBlock, GalleryBlock},
}
</script>
