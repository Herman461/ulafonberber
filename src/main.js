import { createApp } from 'vue'
import App from './App.vue'
import router from "./plugins/router";
import '@/assets/css/style.css'

const app = createApp(App).use(router)

app.mount('#app')
