<template>
    <v-flex>
        <v-card>
            <v-card-title  style="flex-wrap: nowrap;">
              <v-avatar :size="40" class="mr-3">
                  <img :src="parameter.imageUrl"/>
                               </v-avatar>
                <div>{{parameter.title}}</div>
            </v-card-title>
            <v-card-text class="pt-0" >
                <v-radio-group v-model="radioGroup"  class="mt-0">
                    <v-radio v-for="(choice,index) in parameter.choices" :key="index" :label="choice.title"
                             :value="index"

                    ></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {IChoice, IParameter} from "../model/model";

    @Component
    export default class CalcParameter extends Vue {
        @Prop() parameter: IParameter;

        radioGroup: any = null;

    }


</script>
