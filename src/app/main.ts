import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.ts'

import './styles/main.css'
import './styles/elements/element-variables.scss'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
