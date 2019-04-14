<template>
    <v-flex>
        <v-card>
            <v-card-title style="flex-wrap: nowrap;">
                <v-avatar :size="48" class="mr-3">
                    <img :src="parameter.imageUrl"/>
                </v-avatar>
                <div>{{parameter.title}}</div>
                <v-tooltip v-if="!!parameter.description"
                           :close-delay="500"
                           :max-width="500"
                           right
                >
                    <template v-slot:activator="{ on }">
                        <v-btn small flat icon  class="ma-0 ml-3" color="grey" v-on="on">
                            <v-icon small light>fa-question-circle</v-icon>

                        </v-btn>
                    </template>
                    <span>{{parameter.description}}</span>
                </v-tooltip>
            </v-card-title>
            <v-card-text class="pt-0">
                <v-radio-group
                        :value="$store.getters.SelectedChoiceIdForParameter(parameter.id)"
                        @change="v => $store.commit('CheckChoice', v)"
                        class="mt-0"
                >
                    <v-radio
                            v-for="choice in $store.getters.ChoicesForParameter(parameter.id)"
                            :key="choice.id"
                            :label="choice.title"
                            :value="choice.id"
                    ></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script lang="ts">
    import { IParameter } from "@/model/model";
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class CalcParameter extends Vue
    {
        @Prop() parameter: IParameter;
    }

</script>
