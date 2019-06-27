<template>
    <v-dialog @input="dialogStateChange" :value="!!value" scrollable width="480">
        <v-card tile style="min-height:400px">
            <v-progress-circular :size="32" indeterminate :width="2" color="primary" v-if="currentOrg == null"
                                 style="position:absolute; top: calc(50% - 16px); left: calc(50% - 16px)"></v-progress-circular>
            <template v-else>
                <v-card-title class="subheading pa-3 grey lighten-3" primary-title  style="flex-wrap:nowrap!important;">
                    <div>{{currentOrg.Title}}</div>
                    <v-spacer/>
                    <v-btn @click="$listeners.input(false)" flat small icon class="ma-0" color="grey darken-1">
                        <v-icon>fa-times</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text style="min-height:320px">
                    <table class="font-weight-medium">
                        <tr>
                            <td class="pa-1">Телефон:</td>
                            <td class="pa-1">{{currentOrg.Phone}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Факс:</td>
                            <td class="pa-1">{{currentOrg.Fax}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Электронная почта:</td>
                            <td class="pa-1">{{currentOrg.Email}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Адрес:</td>
                            <td class="pa-1">{{currentOrg.Address}}</td>
                        </tr>
                    </table>
                </v-card-text>
            </template>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
    import {Vue, Component, Prop, Watch} from "vue-property-decorator";
    import {IOrganisation} from "@/model/CommonModels";

    @Component
    export default class OrganisationView extends Vue
    {
        @Prop() value: any;

        @Watch('value') onOrgIdChanged()
        {
            this.loadOrg();
        }

        dialogStateChange(v: boolean)
        {
            this.$emit('input', v ? this.value : null);
        }

        currentOrg: IOrganisation = null;

        async loadOrg()
        {
            this.currentOrg = null;
            let id = parseInt(this.value);
            if(isNaN(id)) return;
            this.currentOrg = await window.$service.GetOrganisation(id);
        }

    }
</script>