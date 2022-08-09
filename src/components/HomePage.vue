<template>
  <base-page>
    <template v-slot:first-block>
      <about-block />
    </template>
    <template v-slot:second-block>
      <gallery-block :page="1" />
    </template>
    <template v-slot:third-block>
      <gallery-block :is-central="true" :page="2" />
    </template>
  </base-page>
</template>

<script>
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";

export default {
  name: 'HomePage',
  components: {BasePage, AboutBlock, GalleryBlock},
}
</script>
