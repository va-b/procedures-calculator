<template>
  <v-app>
    <v-content>
      <v-container v-show="$route.name !== 'start'" grid-list-lg class="pb-0">
        <help-view v-model="helpDialog"/>
        <v-card tile color="primary">
          <v-card-title class="py-2">
            <img src="http://archit.tmbreg.ru/assets/files/news/calculator/gerb-small.png"
                 height="48px"
                 class="d-block pr-3">
            <div class="headline white--text">
              Калькулятор процедур в сфере строительства
            </div>
            <v-spacer/>
            <v-btn v-show="$route.name === 'result'"
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
import HelpView from "@/components/HelpView.vue";
import {Vue, Component} from "vue-property-decorator";

@Component({
  components: { HelpView },
})
export default class App extends Vue
{
  helpDialog: boolean = false;

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
