<template>
<v-container fill-height justify-center align-center>
    <v-card>
        <v-card-actions>
            <v-btn depressed block dark color="primary" @click="$router.push('/main')">
                Открыть Онлайн-калькулятор (DEMO)
            </v-btn>
        </v-card-actions>
    </v-card>
</v-container>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class StartPage extends Vue {
        e1: number = 1;

        steps: Step[] = [
            {
                numer: 1,
                text: 'text1',
                title: 'step1'
            },
            {
                numer: 2,
                text: 'text2',
                title: 'step2'
            },
            {
                numer: 3,
                text: 'text3',
                title: 'step3'
            }
        ];

    }

    interface Step {
        title: string;
        numer: number;
        text: string;
    }
</script>
