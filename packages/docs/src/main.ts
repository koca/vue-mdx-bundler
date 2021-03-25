import { createApp } from 'vue'
import 'windi.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import routes from 'pages-generated'
import App from './App.vue'
import VueUseGesture from './components/VueUseGesture.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.component('VueUseGesture', VueUseGesture)

app.mount('#app')
