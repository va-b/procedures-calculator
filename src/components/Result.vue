<template>
    <v-container grid-list-lg>
        <v-progress-circular
                v-if="!$store.state.results.length"
                :size="60"
                :width="3"
                color="primary"
                indeterminate
                style="position:absolute; top: calc(50% - 30px); left: calc(50% - 30px)"
        ></v-progress-circular>
        <v-stepper v-else v-model="e1" vertical>
            <template v-for="sr in $store.state.results">
                <v-stepper-step
                        :key="sr.stepId"
                        :step="sr.stepNum"
                        :editable="!!sr.items.length">
                    <span class="subheading text-uppercase">{{ sr.stepName }}
                    <span v-if="!!sr.totalTime" class="blue--text">
                        - До {{sr.totalTime}} дней
                    </span>
                    <i v-else class="fas fa-clock ml-2 grey--text"></i>
                    </span>
                </v-stepper-step>
                <v-stepper-content :step="sr.stepNum">
                    <v-card tile class="ma-1 mb-4" height="200px">
                        <v-data-table
                                disable-initial-sort
                                hide-actions
                                :headers="headers"
                                :items="sr.items"
                                item-key="procedureId"
                        >
                            <template v-slot:items="props">
                                <td class="">
                                    {{ props.item.procedureName }}
                                </td>
                                <td class="text-xs-center">
                                    {{ props.item.organisationName }}
                                </td>
                                <td class="text-xs-center body-2">
                                    {{ formatDays(props.item) }}
                                </td>
                                <td class="">
                                    {{ props.item.documentName }}
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

    import { IResultItem } from "@/model/model";
    import { Component, Vue } from "vue-property-decorator";

    @Component
    export default class Result extends Vue
    {
        e1: number = -1;
        created()
        {
            this.$store.dispatch('LoadResults');
        }

        formatDays(item: IResultItem): string
        {
            return !!item.performingTime
                   ? `до ${item.performingTime} ${item.isTimeByCalendar ? 'календарных' : 'рабочих'} дней`
                   : "";
        }

        get headers(): { text: string; sortable: false; value: keyof IResultItem; class: string; }[]
        {
            return [
                {
                    text: 'Процедура',
                    sortable: false,
                    value: "procedureName",
                    class: 'body-2'
                },
                {
                    text: 'Ответственная организация',
                    sortable: false,
                    value: "organisationName",
                    class: 'body-2'
                },
                {
                    text: 'Срок проведения',
                    sortable: false,
                    value: "performingTime",
                    class: 'body-2'
                },
                {
                    text: 'Результат',
                    sortable: false,
                    value: "documentName",
                    class: 'body-2'
                },
            ];
        }
    };

</script>

