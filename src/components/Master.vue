<template>
        <v-container grid-list-lg>
            <v-progress-circular
                    v-if="!FrontendSteps.length"
                    :size="60"
                    :width="3"
                    color="primary"
                    indeterminate
                    class="circulator"/>
            <v-stepper class="c-stepper" alt-labels v-else :value="currentStepNumber">
                <v-stepper-header>
                    <template v-for="step in FrontendSteps">
                        <v-stepper-step class="pa-3"
                                        :style="{flexBasis: `${100/FrontendSteps.length}%!important`}"
                                        :complete="currentStepNumber >= step.Order"
                                        :step="step.Order"
                                        :key="step.Id"
                        >
                            {{step.Title}}
                        </v-stepper-step>
                        <v-divider v-if="IsLastStep"/>
                    </template>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content v-for="step in FrontendSteps" :key="step.Id" :step="step.Order">
                        <v-card flat class="xs-12 md-8 lg-6 xl-4">
                            <v-card-title class="title">
                                {{step.Title}}
                            </v-card-title>
                            <v-card-text class="title">
                                <v-layout column>
                                    <calc-parameter v-for="parameter in GetParams(step.Id)"
                                                    :key="parameter.Title"
                                                    :parameter="parameter"
                                                    :allChoices="Choices"
                                                    :allLinks="Links"/>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                        <v-btn v-if="!IsFirstStep"
                               flat
                               @click="FrontendStepPrev">
                            Назад
                        </v-btn>

                        <v-btn  v-if="!IsLastStep"
                                depressed color="primary"
                                @click="FrontendStepNext"
                        >
                            Вперёд
                        </v-btn>

                        <v-btn  v-if="IsLastStep"
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
    import CalcParameter from "@/components/CalcParameter.vue";
    import { GetExpressions } from "@/model/ChoiceGraphHelper";
    import Vue from "vue";
    import {IChoice, IChoiceLink, IExpression, IFrontendStep, IParameter} from "@/model/CommonModels";

    export default Vue.extend<{
        currentStepNumber: number;
        FrontendSteps: IFrontendStep[];
        Parameters: IParameter[];
        Choices: IChoice[];
        Expressions: IExpression[];
        Links: IChoiceLink[];
    },{
        LoadInitial: () => Promise<void>;
        FrontendStepNext: () => void;
        FrontendStepPrev: () => void;
        GetParams: (frontendStepId: number) => IParameter[];
        ComputeResults: () => void;
    },{
        IsFirstStep: boolean;
        IsLastStep: boolean;
    },{}>({
        name: 'Master',
        components: { CalcParameter },
        data: () => ({
            currentStepNumber: 1,
            FrontendSteps: [],
            Parameters: [],
            Choices: [],
            Expressions: [],
            Links: []
        }),
        computed: {
            IsFirstStep(): boolean
            {
                return this.currentStepNumber == 1;
            },
            IsLastStep(): boolean
            {
                return this.currentStepNumber == this.FrontendSteps[this.FrontendSteps.length - 1].Order
            }
        },
        methods: {
            async LoadInitial()
            {
                let initData = await window.$service.GetSteps();
                this.FrontendSteps = initData.FrontendSteps;
                this.Parameters = initData.Parameters;
                this.Choices = initData.Choices;
                this.Links = initData.Links;
                this.Expressions = initData.Expressions;
            },
            FrontendStepNext()
            {
                let st = this.FrontendSteps.find(x => x.Order == this.currentStepNumber + 1);
                if(!!st) this.currentStepNumber = st.Order;
            },
            FrontendStepPrev()
            {
                let st = this.FrontendSteps.find(x => x.Order == this.currentStepNumber - 1);
                if(!!st) this.currentStepNumber = st.Order;
            },
            GetParams(frontendStepId: number): IParameter[]
            {
                return this.Parameters.filter(x => x.FrontendStepId == frontendStepId)
            },
            ComputeResults(): void
            {
                let exquery = GetExpressions(
                    this.Expressions,
                    this.Links,
                    this.Choices
                ).map(x => x.Id.toString()).join("_");
                this.$router.push(`/result/${exquery}`)
            }
        },
        created()
        {
            this.LoadInitial();
        },
    });
</script>
<style>
    .c-stepper .v-stepper__label {
        text-align :center !important;
    }
</style>
