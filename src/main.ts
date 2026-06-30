import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.scss'
import { captureUtmParams } from './utils/utm'

const app = createApp(App)
captureUtmParams()
app.use(router)
app.mount('#app')
