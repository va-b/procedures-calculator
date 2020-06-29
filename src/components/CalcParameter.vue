<template>
    <v-flex>
        <v-card>
            <v-card-title style="flex-wrap: nowrap;">
                <v-avatar :size="52" class="mr-3">
                    <img :src="parameter.ImageUrl"/>
                </v-avatar>
                <div>{{parameter.Title}}</div>
                <v-tooltip v-if="!!parameter.Description"
                           :close-delay="500"
                           :max-width="500"
                           right
                >
                    <template v-slot:activator="{ on }">
                        <v-btn small flat icon  class="ma-0 ml-3" color="grey" v-on="on">
                            <v-icon small light>fa-question-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>{{parameter.Description}}</span>
                </v-tooltip>
            </v-card-title>
            <v-card-text class="pt-0">
                <v-radio-group
                        :value="SelectedChoiceIdForParameter"
                        @change="CheckChoice"
                        class="mt-0"
                >
                    <v-radio
                            v-for="choice in ChoicesForParameter"
                            :key="choice.Id"
                            :label="choice.Title"
                            :value="choice.Id"
                            :disabled="getIsChoiceDisabled(choice.Id)"
                    ></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script lang="ts">
    import type {IChoice, IChoiceLink, IParameter} from "@/model/CommonModels";
    import Vue from "vue";
    import {IsChoiceDisabled} from "@/model/ChoiceGraphHelper";

    export default Vue.extend<{}, {
        getIsChoiceDisabled: (choiceId: number) => boolean;
        CheckChoice: (choiceId: number) => void;
    }, {
        ChoicesForParameter: IChoice[];
        SelectedChoiceIdForParameter: number;
    }, {
        parameter: IParameter;
        allChoices: IChoice[];
        allLinks: IChoiceLink[];
    }>({
        name: 'CalcParameter',
        props: {
            parameter: { required: true },
            allChoices: { required: true, type: Array },
            allLinks: { required: true, type: Array }
        },
        computed: {
            ChoicesForParameter(): IChoice[]
            {
                return this.allChoices.filter(x => x.ParameterId == this.parameter.Id)
            },
            SelectedChoiceIdForParameter(): number
            {
                let res = this.ChoicesForParameter.find(x => x.Selected);
                return !!res ? res.Id : null;
            }
        },
        methods: {
            getIsChoiceDisabled(choiceId: number): boolean
            {
                return IsChoiceDisabled(choiceId, this.allLinks, this.allChoices)
            },
            CheckChoice(choiceId: number)
            {
                this.ChoicesForParameter.forEach(x => x.Selected = false);
                this.ChoicesForParameter.find(x => x.Id == choiceId).Selected = true;
            }
        }
    });
</script>
