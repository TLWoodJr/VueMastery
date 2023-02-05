import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './stores/index'
import store from './stores/event-store'
import 'nprogress/nprogress.css'



const app = createApp(App)
app.use(router)
app.use(store)
app.provide('GStore', GStore)

app.mount('#app')