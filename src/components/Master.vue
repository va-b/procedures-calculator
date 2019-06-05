<template>
        <v-container grid-list-lg>
            <v-progress-circular
                    v-if="!$store.state.FrontendSteps.length"
                    :size="60"
                    :width="3"
                    color="primary"
                    indeterminate
                    class="circulator"/>
            <v-stepper class="c-stepper" alt-labels v-else :value="$store.state.CurrentStepNumber">
                <v-stepper-header>
                    <template v-for="step in $store.state.FrontendSteps">
                        <v-stepper-step class="pa-3"
                                        :style="{flexBasis: `${100/$store.state.FrontendSteps.length}%!important`}"
                                        :complete="$store.state.CurrentStepNumber >= step.Order"
                                        :step="step.Order"
                                        :key="step.Id"
                        >
                            {{step.Title}}
                        </v-stepper-step>
                        <v-divider v-if="$store.getters.IsLastStep"/>
                    </template>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content v-for="step in $store.state.FrontendSteps" :key="step.Id" :step="step.Order">
                        <v-card flat class="xs-12 md-8 lg-6 xl-4">
                            <v-card-title class="title">
                                {{step.Title}}
                            </v-card-title>
                            <v-card-text class="title">
                                <v-layout column>
                                    <calc-parameter v-for="parameter in $store.getters.CurrentParams"
                                                    :key="parameter.Title"
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
                this.$store.state.Expressions,
                this.$store.state.Links,
                this.$store.state.Choices
            ).map(x => x.Id.toString()).join("_");
            this.$router.push(`/result/${exquery}`)
        }
    }
</script>
<style>
    .c-stepper .v-stepper__label {
        text-align :center !important;
    }
</style>
