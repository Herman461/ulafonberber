<template>
  <base-page>
    <template v-slot:first-block>
      <home-block />
    </template>
    <template v-slot:second-block>
      <work-block />
    </template>
    <template v-slot:third-block>
      <collection-block />
    </template>
  </base-page>
</template>


<script>
import HomeBlock from "@/components/blocks/HomeBlock";
import WorkBlock from "@/components/blocks/WorkBlock";
import CollectionBlock from "@/components/blocks/CollectionBlock";
import BasePage from "@/components/BasePage";

export default {
  name: "SinglePage",
  components: {BasePage, CollectionBlock, WorkBlock, HomeBlock},
}
</script>
