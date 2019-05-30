<template functional>
    <v-flex>
        <v-card>
            <v-card-title style="flex-wrap: nowrap;">
                <v-avatar :size="52" class="mr-3">
                    <img :src="props.parameter.imageUrl"/>
                </v-avatar>
                <div>{{props.parameter.title}}</div>
                <v-tooltip v-if="!!props.parameter.description"
                           :close-delay="500"
                           :max-width="500"
                           right
                >
                    <template v-slot:activator="{ on }">
                        <v-btn small flat icon  class="ma-0 ml-3" color="grey" v-on="on">
                            <v-icon small light>fa-question-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>{{props.parameter.description}}</span>
                </v-tooltip>
            </v-card-title>
            <v-card-text class="pt-0">
                <v-radio-group
                        :value="parent.$store.getters.SelectedChoiceIdForParameter(props.parameter.id)"
                        @change="v => parent.$store.commit('CheckChoice', v)"
                        class="mt-0"
                >
                    <v-radio
                            v-for="choice in parent.$store.getters.ChoicesForParameter(props.parameter.id)"
                            :key="choice.id"
                            :label="choice.title"
                            :value="choice.id"
                            :disabled="parent.$store.getters.IsChoiceDisabled(choice.id)"
                    ></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script lang="ts">
    import { IParameter } from "@/model/CommonModels";
    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class CalcParameter extends Vue
    {
        @Prop() parameter: IParameter;
    }

</script>
