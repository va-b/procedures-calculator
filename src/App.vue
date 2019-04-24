<template>
  <v-app>
    <v-content>
      <v-container v-show="!isStartPage" grid-list-lg class="pb-0">
        <v-dialog v-model="helpDialog" scrollable width="640">
          <v-card tile>
            <v-card-title class="subheading pa-3 grey lighten-3" primary-title>
              Калькулятор процедур в сфере строительства Тамбовской области
            </v-card-title>
            <v-card-text style="max-height:424px">

            </v-card-text>
          </v-card>
        </v-dialog>
        <v-card tile color="primary">
          <v-card-title class="py-2">
            <img src="http://archit.tmbreg.ru/assets/files/news/calculator/gerb-small.png"
                 height="48px"
                 class="d-block pr-3">
            <div class="headline white--text">
              Калькулятор процедур в сфере строительства
            </div>
            <v-spacer/>
            <v-btn v-show="isResultPage"
                   round small depressed
                   color="white"
                   class="primary--text"
                   to="/master"
            >
              <v-icon small light left>fa-chevron-left</v-icon>
              Назад
            </v-btn>
            <v-btn icon small depressed
                   color="white"
                   class="primary--text"
                   @click="helpDialog = !helpDialog"
            >
              <v-icon small light>fa-question</v-icon>
            </v-btn>

          </v-card-title>
        </v-card>
      </v-container>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component
export default class App extends Vue
{
  helpDialog: boolean = false;
  get isStartPage(): boolean
  {
    return this.$route.fullPath == '/';
  }

  get isResultPage(): boolean
  {
    return this.$route.fullPath == '/result';
  }
}
</script>
<style lang="scss">
  /*
  .help-btn
  {
    border-radius: 50%;
    border: 5px solid transparent;
    background-color: transparent;
    margin-right: 8px;
    transition: background-color .2s ease-in-out;
    &:hover, &:active, &:focus { background-color: rgba(255,255,255,.3); }
  }
   */
</style>
