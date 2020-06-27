<template>
        <v-container grid-list-lg fill-height justify-center align-center>
            <v-layout row fill-height justify-center align-center>
                <v-flex xs12 xl8 class="elevation-8 pa-4 h-100" style="background: url(http://archit.tmbreg.ru/assets/files/news/calculator/mainimg2.png) center center no-repeat; background-size: cover;">
                    <v-layout row justify-end>
                        <v-flex xs12 md8 lg6>
                            <v-card tile class="mb-2 elevation-12">
                                <div class="d-flex py-3 px-4 d-flex">
                                    <img src="http://archit.tmbreg.ru/assets/files/news/calculator/gerb-small.png" height="68px" class="d-block pr-3">
                                    <div class="headline py-2">Калькулятор процедур в сфере строительства</div>
                                </div>
                            </v-card>
                            <v-layout row wrap>
                                <v-flex xs12 sm4 v-for="(i, index) in etap" :key="index">
                                    <v-card tile class="elevation-12 h-100">
                                        <v-card-title class="justify-center align-center py-2 h-50">
                                            <v-avatar color="primary">
                                                <v-icon class="white--text">{{i.icon}}</v-icon>
                                            </v-avatar>
                                        </v-card-title>
                                        <v-divider/>
                                        <v-card-title class="subheading justify-center align-center py-1 h-50">
                                            <div class="text-xs-center lh-11">{{i.text}}</div>
                                        </v-card-title>
                                    </v-card>
                                </v-flex>
                            </v-layout>

                            <v-card tile class="mt-2 elevation-12">
                                <v-card-text class="subheading">
                                    Интерактивный сервис для застройщиков, где можно узнать сроки и этапы прохождения
                                    строительных процедур для конкретного проекта.
                                </v-card-text>
                                <v-card-actions class="justify-center pb-3">
                                    <v-btn large dark color="primary" to="/master">
                                        Открыть Онлайн-калькулятор
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
</template>
<script lang="ts">
    import Vue from "vue";

    export default Vue.extend<{},{},{
        etap: { text: string; icon: string; }[]
    },{}>({
        name: 'StartPage',
        computed: {
            etap()
            {
                return [
                    {
                        icon: 'fa-file-invoice', text: 'прохождение процедур',
                    },
                    {
                        icon: 'fa-clock', text: 'расчёт времени',
                    },
                    {
                        icon: 'fa-hotel', text: 'реализация строительного проекта',
                    },
                ];
            }
        }
    });
</script>
