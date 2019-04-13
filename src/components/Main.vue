<template>
    <v-container grid-list-lg>
        <v-stepper class="c-stepper" alt-labels
                   v-if="$store.state.frontendSteps.length"
                   :value="$store.state.currentStepNumber">
            <v-stepper-header>
                <template v-for="step in $store.state.frontendSteps" >
                    <v-stepper-step class="pa-3"
                                    :style="{flexBasis: `${100/$store.state.frontendSteps.length}%!important`}"
                                    :complete="$store.state.currentStepNumber >= step.order" :step="step.order"
                                    :key="step.id">
                        {{step.title}}
                    </v-stepper-step>
                    <v-divider v-if="$store.getters.IsLastStep"/>
                </template>

            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content v-for="step in $store.state.frontendSteps" :key="step.id"
                                   :step="step.order">
                    <v-card flat class="xs-12 md-8 lg-6 xl-4">
                        <v-card-title class="title">
                            {{step.title}}
                        </v-card-title>
                        <v-card-text class="title">
                            <v-layout column>
                                <CalcParameter v-for="parameter in $store.getters.CurrentParams"
                                               :key="parameter.title"
                                               :parameter="parameter"/>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <v-btn flat
                           v-if="!$store.getters.IsFirstStep"
                           @click="() => $store.commit('FrontendStepPrev')"
                    >
                        Назад
                    </v-btn>

                    <v-btn depressed color="primary"
                           v-if="!$store.getters.IsLastStep"
                           @click="() => $store.commit('FrontendStepNext')"
                    >
                        Вперёд
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import CalcParameter from "./CalcParameter.vue";

    @Component({
        components: {CalcParameter}
    })
    export default class Main extends Vue
    {
        created()
        {
            this.$store.dispatch("LoadInitial");
        }
    }
</script>
<style>
    .c-stepper .v-stepper__label
    {
        text-align: center !important;
    }
</style>
