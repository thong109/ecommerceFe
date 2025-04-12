import { defineStore } from "pinia"
import axiosConfig from '@/helpers/axiosConfig'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null
  }),
  actions: {
    setUser(token, role) {
      this.token = token
      this.role = role
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    },
    async logout(router) {
      try {
        if (this.token) {
          const res = await axiosConfig.post('/logout', {})
          if (res) {
            router.push({
              name: 'home'
            }) // Chỉ dùng router được truyền vào
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.token = null
        this.role = null
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      }
    }
  }
})