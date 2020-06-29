<template>
    <v-dialog @input="dialogStateChange" :value="!!value" scrollable width="800">
        <v-card tile>
            <v-progress-circular :size="32" indeterminate :width="2" color="primary" v-if="currentOrg == null"
                                 style="position:absolute; top: calc(50% - 16px); left: calc(50% - 16px)"/>
            <template v-else>
                <v-card-title class="subheading pa-3 grey lighten-3" primary-title  style="flex-wrap:nowrap!important;">
                    <div>{{currentOrg.Title}}</div>
                    <v-spacer/>
                    <v-btn @click="$emit('input', null)" flat small icon class="ma-0" color="grey darken-1">
                        <v-icon>fa-times</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="subheading" style="min-height:260px">
                    <table >
                        <tr>
                            <td class="pa-1">Телефон:</td>
                            <td class="pa-1">{{currentOrg.Phone}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Факс:</td>
                            <td class="pa-1">{{currentOrg.Fax}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Email:</td>
                            <td class="pa-1">{{currentOrg.Email}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Адрес:</td>
                            <td class="pa-1">{{currentOrg.Address}}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-1 font-italic body-1">{{currentOrg.Description}}</td>
                        </tr>
                    </table>
                </v-card-text>
                <iframe v-if="!!currentOrg.YandexMapsLink"
                        :src="'https://yandex.ru/map-widget/v1/-/'+currentOrg.YandexMapsLink"
                        height="400"
                ></iframe>
            </template>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
    import Vue from "vue";
    import type {IOrganisation} from "@/model/CommonModels";

    export default Vue.extend<{
        currentOrg: IOrganisation|null;
    },{
        dialogStateChange: (v: boolean) => void
    },{},{
        value: number|null;
    }>({
        props: {
            value: {required: true},
        },
        data: () => ({
            currentOrg: null
        }),
        watch: {
            async value(v)
            {
                if(!v) return;
                this.currentOrg = null;
                this.currentOrg = await window.$service.GetOrganisation(v);
            }
        },
        methods: {
            dialogStateChange(v: boolean)
            {
                this.$emit('input', v ? this.value : null);
            }
        }
    });
</script>