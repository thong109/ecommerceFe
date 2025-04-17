import {
  defineStore
} from "pinia"
import axiosConfig from '@/helpers/axiosConfig'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: true
  }),
  actions: {
    async fetchUser() {
      if (this.user) return;
      this.isLoading = true;
      try {
        const res = await axiosConfig.get('/user');
        this.user = res.data;
        return res.data;
      } catch (error) {
        this.user = null;
        localStorage.removeItem('token');
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    async login(credentials) {
      try {
        const res = await axiosConfig.post('/login', credentials);
        localStorage.setItem('token', res.data.token);
        await this.fetchUser();

        return true;
      } catch (err) {
        console.error('Login failed:', err);
        return false;
      }
    },
    async logout(router) {
      try {
        if (this.user) {
          const res = await axiosConfig.post('/logout', {})
          if (res) {
            router.push({
              name: 'home'
            })
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.user = null;
        localStorage.removeItem('token');
      }
    },
    async register(credentials) {
      try {
        const res = await axiosConfig.post('/signup', credentials);
        localStorage.setItem('token', res.data.token);
        await this.fetchUser();

        return true;
      } catch (err) {
        console.error('Login failed:', err);
        return false;
      }
    }
  }
})