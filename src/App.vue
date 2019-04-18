<template>
  <v-app>
    <v-content>
      <v-container v-show="!isStartPage" grid-list-lg class="pb-0">
        <v-dialog v-model="helpDialog" scrollable width="640">
          <v-card tile>
            <v-card-title class="subheading pa-3 grey lighten-3" primary-title>
              Вспомогательная информация
            </v-card-title>
            <v-card-text style="max-height:424px">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac luctus purus, vitae egestas nunc. Donec posuere a lacus vel placerat. Aenean sit amet eros eu lectus suscipit bibendum quis a leo. Duis massa enim, accumsan et nisi eu, laoreet suscipit metus. Integer mattis felis id enim rhoncus, quis vulputate dui laoreet. Morbi erat turpis, semper eu urna in, cursus porta elit. Nulla urna odio, scelerisque vitae tempor ullamcorper, venenatis ut arcu. Donec eu nulla in justo rhoncus egestas vitae eget sapien. Curabitur vel elit at metus iaculis consectetur quis sed massa. Morbi vitae molestie ipsum. Quisque nec lacus nec erat rutrum dictum. Morbi cursus in magna non tempus.
              </p>
              <p>
                Etiam convallis eu diam vitae egestas. Aliquam vitae magna ut massa lacinia cursus. Proin malesuada augue nec fringilla lacinia. Sed at sem nec ante mattis imperdiet. Nulla euismod cursus nibh, quis pellentesque magna gravida vestibulum. Aliquam ornare iaculis tortor, vulputate eleifend enim. Nulla facilisi. Nam ac justo risus.
              </p>
              <p>
                Aliquam urna felis, interdum id justo non, sagittis dictum felis. Aliquam quis imperdiet velit. Cras tincidunt elit felis. Integer ex quam, maximus scelerisque lobortis cursus, sodales at libero. Phasellus semper, erat sit amet tristique iaculis, libero mi finibus lorem, vel eleifend urna lorem in ligula. Nunc in ligula vel orci venenatis accumsan. Mauris ultrices elit rutrum luctus tempor. Vivamus non arcu mauris. Suspendisse dapibus ipsum odio, ac maximus dui mattis quis. Nam ultricies at risus et euismod. Suspendisse scelerisque et orci vel suscipit. Phasellus dictum nulla id libero eleifend eleifend. Nunc faucibus eleifend fringilla. Sed laoreet malesuada sem in mattis. Nam hendrerit, lorem nec rhoncus auctor, lectus eros mollis libero, quis sollicitudin urna tortor non ipsum.
              </p>
              <p>
                Integer vel imperdiet lorem. Suspendisse lobortis sapien sed viverra malesuada. Mauris eget nisi non felis accumsan tristique scelerisque eget nulla. Nulla pellentesque sollicitudin enim, sit amet imperdiet mauris elementum quis. Nullam in ipsum libero. Nulla facilisi. Etiam laoreet blandit ligula sed sagittis. Nam diam eros, bibendum at turpis sed, euismod accumsan lectus.
              </p>
              <p>
                Donec hendrerit nec eros scelerisque sodales. Vivamus eu massa et neque aliquam interdum. Vestibulum ac vehicula dui. Aliquam nec gravida ligula. Etiam molestie est purus, ut tincidunt nisi fermentum nec. Ut auctor odio eu nibh euismod, sit amet volutpat mauris lacinia. Vivamus sit amet semper dolor, non iaculis magna. Sed pharetra purus diam, sed viverra metus maximus id. Vestibulum condimentum felis sed faucibus blandit. Etiam tempor lacus neque, eget tincidunt neque sollicitudin id.
              </p>
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