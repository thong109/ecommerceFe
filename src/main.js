import '@/styles/main.scss'

import {
  createApp
} from 'vue'
import {
  createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'

import Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(createPinia())
app.use(Toastify, {
  autoClose: 2000,
  position: 'top-right',
  pauseOnHover: false,
})

app.use(router)
app.mount('#app')