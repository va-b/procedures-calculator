<template>
    <v-flex>
        <v-card>
            <v-card-title style="flex-wrap: nowrap;">
                <v-avatar :size="52" class="mr-3">
                    <img :src="parameter.ImageUrl"/>
                </v-avatar>
                <div>{{parameter.Title}}</div>
                <v-tooltip v-if="!!parameter.Description"
                           :close-delay="500"
                           :max-width="500"
                           right
                >
                    <template v-slot:activator="{ on }">
                        <v-btn small flat icon  class="ma-0 ml-3" color="grey" v-on="on">
                            <v-icon small light>fa-question-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>{{parameter.Description}}</span>
                </v-tooltip>
            </v-card-title>
            <v-card-text class="pt-0">
                <v-radio-group
                        :value="$store.getters.SelectedChoiceIdForParameter(parameter.Id)"
                        @change="v => $store.commit('CheckChoice', v)"
                        class="mt-0"
                >
                    <v-radio
                            v-for="choice in $store.getters.ChoicesForParameter(parameter.Id)"
                            :key="choice.Id"
                            :label="choice.Title"
                            :value="choice.Id"
                            :disabled="$store.getters.IsChoiceDisabled(choice.Id)"
                    ></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script lang="ts">
    import { IParameter } from "@/model/CommonModels";
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class CalcParameter extends Vue
    {
        @Prop() parameter: IParameter;
    }

</script>
