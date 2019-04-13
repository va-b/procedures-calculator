<template>
    <v-stepper v-model="e1" vertical>
            <template v-for="n in steps">
                <v-stepper-step
                        :key="`${n}-step`"
                        :complete="e1 > n"
                        :step="n"
                        editable
                >
                    Step {{ n }}
                </v-stepper-step>

                <v-stepper-content :step="n">
                    <v-card
                            class="mb-5"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                </v-stepper-content>
            </template>

    </v-stepper>
</template>
<script>

    export default {
        data () {
            return {
                e1: 1,
                steps: 2
            }
        },

        watch: {
            steps (val) {
                if (this.e1 > val) {
                    this.e1 = val
                }
            }
        }


            }

</script>
<style scoped>

</style>

