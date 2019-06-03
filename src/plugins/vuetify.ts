import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import {VuetifyUseOptions} from 'vuetify'
import ru from 'vuetify/src/locale/ru'
import 'vuetify/src/stylus/app.styl'

const vuetifyConfig: VuetifyUseOptions = {
    lang: {
       locales: {ru},
        current: 'ru'
    },
    theme: {
        primary: '#00B0FF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
};

Vue.use(Vuetify, vuetifyConfig);


