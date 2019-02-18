<template>
    <v-container grid-list-lg>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step v-for="(step) in steps" :key="step.id"
                                :complete="e1 > step.id" :step="step.id">
                    {{step.title}}
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content v-for="step in steps" :key="step.id"
                                   :step="step.id">
                    <v-card flat class="mb-5">
                        <v-card-title class="title">
                            {{step.title}}
                        </v-card-title>
                        <v-card-text class="title">
                            <v-layout column>
                                <CalcParameter v-for="parameter in params.filter(x => x.step == step.id)"
                                               :key="parameter.title"
                                               :parameter="parameter"/>
                            </v-layout>

                        </v-card-text>
                    </v-card>
                    <v-btn flat v-if="e1 > 1"  @click="e1--">Назад</v-btn>

                    <v-btn depressed v-if="e1 < steps.length"
                           color="primary"
                           @click="e1 = step.id + 1"
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
    import {IFrontendStep, IParameter, IStage} from "@/model/model";

    @Component({
        components: {CalcParameter}
    })
    export default class Main extends Vue {
        e1: number = 1;
        steps: IFrontendStep[] = [];

        mounted()
        {
            this.loadData();
        }

        async loadData()
        {
            this.steps = await window.serviceFactory.GetDefaultCalculatorService().GetSteps();
        }



        get params(): IParameter[] { return []; }



    }
</script>
