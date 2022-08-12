import { createApp } from 'vue'
import App from './App.vue'
import router from "./plugins/router";
import VueMobileDetection from "vue-mobile-detection";
import '@/assets/css/style.css'

const app = createApp(App).use(router).use(VueMobileDetection)

app.mount('#app')
