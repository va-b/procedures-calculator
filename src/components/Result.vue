<template>
    <v-container grid-list-lg>
        <v-dialog v-model="organisationDialog" width="420">
            <v-card tile style="min-height:460px">
                <v-progress-circular
                    :size="32"
                    indeterminate
                    :width="2"
                    color="primary"
                    v-if="!$store.state.organisationForView"
                    style="position:absolute; top: calc(50% - 16px); left: calc(50% - 16px)"
                ></v-progress-circular>
                    <template v-else>
                        <v-card-title class="subheading pa-3 grey lighten-3" primary-title>
                            {{$store.state.organisationForView.title}}
                        </v-card-title>
                        <v-card-text>
                            <table class="font-weight-medium">
                                <tr>
                                    <td class="pa-1">Телефон:</td>
                                    <td class="pa-1">{{$store.state.organisationForView.phone}}</td>
                                </tr>
                                <tr>
                                    <td class="pa-1">Факс:</td>
                                    <td class="pa-1">{{$store.state.organisationForView.fax}}</td>
                                </tr>
                                <tr>
                                    <td class="pa-1">Электронная почта:</td>
                                    <td class="pa-1">{{$store.state.organisationForView.email}}</td>
                                </tr>
                                <tr>
                                    <td class="pa-1">Адрес:</td>
                                    <td class="pa-1">{{$store.state.organisationForView.address}}</td>
                                </tr>
                            </table>
                        </v-card-text>
                    </template>
            </v-card>
        </v-dialog>
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
                    <v-card tile class="ma-1 mb-4">
                        <v-data-table
                                disable-initial-sort
                                hide-actions
                                :headers="headers"
                                :items="sr.items"
                                item-key="procedureId"
                        >
                            <template v-slot:items="props">
                                <td>
                                    {{ props.item.procedureName }}
                                </td>
                                <td>
                                    <v-btn small flat
                                           tag="a"
                                           class="intable-button"
                                           color="blue darken-2"
                                           @click="() => selectOrganisation(props.item.organisationId)">
                                        {{ props.item.organisationName }}
                                    </v-btn>
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
        organisationDialog: boolean = false;

        created()
        {
            this.$store.dispatch('LoadResults');
        }

        selectOrganisation(id: number): void
        {
            this.organisationDialog = true;
            this.$store.dispatch('LoadOrganisation', id);
        }

        formatDays(item: IResultItem): string
        {
            return !!item.performingTime
                   ? `до ${item.performingTime} ${item.isTimeByCalendar ? 'календарных' : 'рабочих'} дней`
                   : "Договорная";
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
<style lang="scss">
    .intable-button{
        height: 100%;
        margin: 0;
        width: 100%;
        .v-btn__content{
            text-align:center;
            width: 100%;
            white-space:normal;
            font-size: 12px;
        }
    }
</style>

