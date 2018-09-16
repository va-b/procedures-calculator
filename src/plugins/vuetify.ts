import Vue from 'vue'
import Vuetify, {VuetifyUseOptions} from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/src/locale/ru'

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


