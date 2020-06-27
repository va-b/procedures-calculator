<template>
    <v-container grid-list-lg>
        <organisation-view v-model="currentOrganisationId"/>
        <v-progress-circular
                v-if="!Results.length"
                :size="60"
                :width="3"
                color="primary"
                indeterminate
                class="circulator"/>
        <v-stepper v-else v-model="e1" vertical>
            <template v-for="sr in Results">
                <v-stepper-step
                        :key="sr.StepId"
                        :step="sr.StepNum"
                        :editable="!!sr.Items.length">
                    <span class="subheading text-uppercase">{{ sr.StepName }}
                    <span v-if="!!sr.TotalTime" class="blue--text">
                        - До {{sr.TotalTime}} дней
                    </span>
                    <i v-else class="fas fa-clock ml-2 grey--text"></i>
                    </span>
                </v-stepper-step>
                <v-stepper-content :step="sr.StepNum">
                    <v-card tile class="ma-1 mb-4">
                        <v-data-table
                                disable-initial-sort
                                hide-actions
                                :headers="headers"
                                :items="sr.Items"
                                item-key="procedureId"
                        >
                            <template v-slot:items="props">
                                <td>
                                    {{ props.item.ProcedureName }}
                                </td>
                                <td>
                                    <v-btn small flat
                                           tag="a"
                                           class="intable-button"
                                           color="blue darken-2"
                                           @click="() => selectOrganisation(props.item.OrganisationId)">
                                        {{ props.item.OrganisationName }}
                                    </v-btn>
                                </td>
                                <td class="text-xs-center body-2">
                                    {{ formatDays(props.item) }}
                                </td>
                                <td class="">
                                    {{ props.item.DocumentName }}
                                </td>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-stepper-content>
            </template>

        </v-stepper>
    </v-container>
</template>
<script lang="ts">

    import OrganisationView from "@/components/OrganisationView.vue";
    import {IResultItem, IResultStep} from "@/model/CommonModels";
    import Vue from "vue";

    export default Vue.extend<{
        e1: number;
        currentOrganisationId: number;
        Results: IResultStep[];
    }, {
        LoadResults: (expressionIds: number[]) => Promise<void>;
        selectOrganisation: (id: number) => void;
        formatDays: (item: IResultItem) => string;
    }, {
        headers: { text: string; sortable: false; value: keyof IResultItem; class: string; }[]
    }, {}>({
        name: 'Result',
        components: { OrganisationView },
        data: () => ({
            e1: -1,
            currentOrganisationId: null,
            Results: []
        }),
        mounted()
        {
            this.Results = [];
            let params = this.$route.params.exquery;
            let expressionIds = params.split("_").map(x => parseInt(x));
            this.LoadResults(expressionIds);
        },
        methods: {
            async LoadResults(expressionIds: number[]): Promise<void>
            {
                try
                {
                    this.Results = await window.$service.GetResults(expressionIds);
                }
                catch (e){console.error(e)}
            },
            selectOrganisation(id: number): void
            {
                this.currentOrganisationId = id;
            },
            formatDays(item: IResultItem): string
            {
                return !!item.PerformingTime
                    ? `до ${item.PerformingTime} ${item.IsTimeByCalendar ? 'календарных' : 'рабочих'} дней`
                    : "Договорная";
            }
        },
        computed: {
            headers()
            {
                return [
                    {
                        text: 'Процедура',
                        sortable: false,
                        value: "ProcedureName",
                        class: 'body-2'
                    },
                    {
                        text: 'Ответственная организация',
                        sortable: false,
                        value: "OrganisationName",
                        class: 'body-2'
                    },
                    {
                        text: 'Срок проведения',
                        sortable: false,
                        value: "PerformingTime",
                        class: 'body-2'
                    },
                    {
                        text: 'Результат',
                        sortable: false,
                        value: "DocumentName",
                        class: 'body-2'
                    },
                ];
            }
        }
    });
</script>
<style>
    .intable-button{
        height: 100%;
        margin: 0;
        width: 100%;
    }
    .intable-button .v-btn__content{
        text-align:center;
        width: 100%;
        white-space:normal;
        font-size: 12px;
    }
</style>

