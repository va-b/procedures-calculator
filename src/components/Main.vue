<template>
    <v-container grid-list-lg>
        <v-stepper class="c-stepper"  alt-labels v-if="steps.length" v-model="e1">
            <v-stepper-header>
                <template v-for="(step, i) in steps" >
                    <v-stepper-step class="pa-3"
                                    :style="{flexBasis: `${100/steps.length}%!important`}"
                                    :complete="e1 > i" :step="i + 1"
                                    :key="step.id">
                        {{step.title}}
                    </v-stepper-step>
                    <v-divider v-if="i < steps.length - 1"/>
                </template>

            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content v-for="(step, i) in steps" :key="step.id"
                                   :step="i + 1">
                    <v-card flat class="xs-12 md-8 lg-6 xl-4">
                        <v-card-title class="title">
                            {{step.title}}
                        </v-card-title>
                        <v-card-text class="title">
                            <v-layout column>
                                <CalcParameter v-for="parameter in params"
                                               :key="parameter.title"
                                               :parameter="parameter"/>
                            </v-layout>

                        </v-card-text>
                    </v-card>
                    <v-btn flat v-if="e1 > 1"  @click="e1--">Назад</v-btn>

                    <v-btn depressed v-if="e1 < steps.length"
                           color="primary"
                           @click="e1++"
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
    import {IFrontendStep, IParameter} from "@/model/model";

    @Component({
        components: {CalcParameter}
    })
    export default class Main extends Vue {
        e1: number = 1;
        steps: IFrontendStep[] = [];
        params: IParameter[] = [];

        mounted()
        {
            this.loadData();
        }

        @Watch('e1')
        async onEChanged(v: number): Promise<void>
        {
            this.params = await window.serviceFactory
                .GetDefaultCalculatorService()
                .GetParameter(this.steps[v - 1].id);
        }

        async loadData()
        {
            this.steps = await window.serviceFactory.GetDefaultCalculatorService().GetSteps();
            this.onEChanged(1);
        }

    }
</script>
<style>
    .c-stepper .v-stepper__label
    {
        text-align: center !important;
    }
</style>
