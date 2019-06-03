<template functional>
    <v-dialog @input="listeners.input" :value="props.value" scrollable width="480">
        <v-card tile style="min-height:400px">
            <v-progress-circular :size="32" indeterminate :width="2" color="primary" v-if="!parent.$store.state.organisationForView"
                                 style="position:absolute; top: calc(50% - 16px); left: calc(50% - 16px)"></v-progress-circular>
            <template v-else>
                <v-card-title class="subheading pa-3 grey lighten-3" primary-title  style="flex-wrap:nowrap!important;">
                    <div>{{parent.$store.state.organisationForView.title}}</div>
                    <v-spacer/>
                    <v-btn @click="listeners.input(false)" flat small icon class="ma-0" color="grey darken-1">
                        <v-icon>fa-times</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text style="min-height:460px">
                    <table class="font-weight-medium">
                        <tr>
                            <td class="pa-1">Телефон:</td>
                            <td class="pa-1">{{parent.$store.state.organisationForView.phone}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Факс:</td>
                            <td class="pa-1">{{parent.$store.state.organisationForView.fax}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Электронная почта:</td>
                            <td class="pa-1">{{parent.$store.state.organisationForView.email}}</td>
                        </tr>
                        <tr>
                            <td class="pa-1">Адрес:</td>
                            <td class="pa-1">{{parent.$store.state.organisationForView.address}}</td>
                        </tr>
                    </table>
                </v-card-text>
            </template>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class OrganisationView extends Vue
    {
    }
</script>