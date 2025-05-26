import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import nbsp from './directives/nbsp'

const app = createApp(App)
app.directive('nbsp', nbsp)
app.use(createPinia())
app.use(router)

app.mount('#app')
