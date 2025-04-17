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
import {
  useAuthStore
} from './stores/auth'

const app = createApp(App)
app.use(createPinia())
app.use(Toastify, {
  autoClose: 2000,
  position: 'top-right',
  pauseOnHover: false,
})
const authStore = useAuthStore();
const token = localStorage.getItem('token');
if (token) {
  authStore.fetchUser();
}

app.use(router)
app.mount('#app')