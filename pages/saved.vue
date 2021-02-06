<template>
  <div>
    <header-section />
    <saved-content-header />
    <div class="saved-title page-fixed-item">Сохраненные статьи</div>
    <!--message-->
    <div class="authors-main widthSaved-toEmpty-favorites" v-if="hasNoRecords">
      <div class="spec-Emptytop">Вы пока не добавляли статьи в этот список.</div>
      <div class="spec-emptyTop">
        Сделать это можно нажав кнопку на
        <img src="/img/Saveds.svg" class="img-custom-saved-position" /> рядом с заголовком статьи или
        <el-button disabled size="small" class="relative-btn-saved">
          <img src="/img/Saveds.svg" class="abs-img-saved" />В закладки
        </el-button> в конце статьи.
        </div>
    </div>
    <div v-else v-for="(c, index) in records" v-bind:key="index">
      <saved v-bind:content="c" />
    </div>
     <!--trigger button-->
    
    <footer-component />
  </div>
</template>

<script>
  import HeaderSection from "~/components/HeaderSection.vue";
  import FooterComponent from "~/components/FooterComponent.vue";
  import SavedContentHeader from "~/components/saved/SavedContentHeader.vue";
  import Saved from "~/components/saved/Saved.vue";
  export default {
    components: {
      HeaderSection,
      FooterComponent,
      SavedContentHeader,
      Saved,
    },
    computed: {
      records() {
        return this.$store.state.savedRecords;
      },
      hasNoRecords() {
        return this.$store.getters.savedCount === 0;
      }
    },
    fetch(context) {
      if (!context.store.state.savedRecords) {
        return context.store.dispatch('fetchSavedRecords');
      }
    },
  }

  function loadSaved($axios) {
  }
</script>

<style lang="scss">
  .widthSaved-toEmpty-favorites {
    width: 35%;
    color: $gray-font-color-desktop;
    line-height: 32px;
    font-size: 18px;
  }

  @media (max-width: 600px) {
    .widthSaved-toEmpty-favorites {
      width: 90%;
      color: $gray-font-color-desktop;
      line-height: 32px;
      font-size: 16px;
    }
  }

  .img-custom-saved-position {
    padding-top: 1%;
    margin-bottom: -5px;
  }

  .relative-btn-saved {
    position: relative;
    padding-left: 35px;
    padding-right: 15px;
  }
 .abs-img-saved{ 
    position: absolute;
    left: 15px;
    top: 22%;
    padding-right: 10px;
  }
 .saved-title {
    font-size: 36px;
    padding-bottom: 20px;
    padding-top: 20px;
    line-height: 42px;
    margin-top: 1%;
    text-align: center;
    font-weight: bold;
    color: black;
  }

  @media (max-width: 600px) {
    .saved-title {
      font-size: 30px;
      padding-bottom: 20px;
      line-height: 42px;
      text-align: left;
      padding-left: 20px;
      font-weight: bold;
      color: black;
    }
  }
</style>
