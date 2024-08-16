import './assets/main.css'
import '@fontsource/montserrat';

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
