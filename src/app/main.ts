

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './styles/main.css'
import './styles/elements/element-variables.scss'

import App from '../App.vue'
import router from './router.ts'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
