<template>
        <v-container grid-list-lg>
            <v-progress-circular
                    v-if="!$store.state.frontendSteps.length"
                    :size="60"
                    :width="3"
                    color="primary"
                    indeterminate
                    class="circulator"/>
            <v-stepper class="c-stepper" alt-labels v-else :value="$store.state.currentStepNumber">
                <v-stepper-header>
                    <template v-for="step in $store.state.frontendSteps">
                        <v-stepper-step class="pa-3"
                                        :style="{flexBasis: `${100/$store.state.frontendSteps.length}%!important`}"
                                        :complete="$store.state.currentStepNumber >= step.order"
                                        :step="step.order"
                                        :key="step.id"
                        >
                            {{step.title}}
                        </v-stepper-step>
                        <v-divider v-if="$store.getters.IsLastStep"/>
                    </template>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content v-for="step in $store.state.frontendSteps" :key="step.id" :step="step.order">
                        <v-card flat class="xs-12 md-8 lg-6 xl-4">
                            <v-card-title class="title">
                                {{step.title}}
                            </v-card-title>
                            <v-card-text class="title">
                                <v-layout column>
                                    <calc-parameter v-for="parameter in $store.getters.CurrentParams"
                                                    :key="parameter.title"
                                                    :parameter="parameter"/>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                        <v-btn v-if="!$store.getters.IsFirstStep"
                               flat
                               @click="$store.commit('FrontendStepPrev')">
                            Назад
                        </v-btn>

                        <v-btn  v-if="!$store.getters.IsLastStep"
                                depressed color="primary"
                                @click="$store.commit('FrontendStepNext')"
                        >
                            Вперёд
                        </v-btn>

                        <v-btn  v-if="$store.getters.IsLastStep"
                                depressed color="primary"
                                @click="ComputeResults"
                        >
                            Получить результат
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-container>
</template>

<script lang="ts">
    import { GetExpressionsByChoiceIds } from "@/model/ChoiceGraphHelper";
    import { Component, Vue } from "vue-property-decorator";
    import CalcParameter from "./CalcParameter.vue";

    @Component({ components: { CalcParameter } })
    export default class Master extends Vue
    {
        created()
        {
            this.$store.dispatch("LoadInitial");
        }


        ComputeResults(): void
        {
            let exquery = GetExpressionsByChoiceIds(
                this.$store.state.expressions,
                this.$store.state.links,
                this.$store.state.choices
            ).map(x => x.id.toString()).join("_");
            this.$router.push(`/result/${exquery}`)
        }
    }
</script>
<style>
    .c-stepper .v-stepper__label {
        text-align :center !important;
    }
</style>
