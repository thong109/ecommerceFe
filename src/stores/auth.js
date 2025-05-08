import { defineStore } from "pinia";
import axiosConfig from "@/helpers/axiosConfig";
import { useCartStore } from "./cart";
import { toast } from "vue3-toastify";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoading: true,
    isLoadHeader: true,
    wishlists: [],
    usersData: [],
    userBuy: [],
  }),
  actions: {
    async fetchUser() {
      if (this.user) return;
      this.isLoading = true;
      this.isLoadHeader = true;
      try {
        const res = await axiosConfig.get("/user");
        this.user = res.data;
      } catch (error) {
        this.user = null;
        localStorage.removeItem("token");
      } finally {
        this.isLoading = false;
        this.isLoadHeader = false;
      }
    },
    async login(credentials) {
      try {
        const res = await axiosConfig.post("/login", credentials);
        if (res) {
          const cartStore = useCartStore();
          localStorage.setItem("token", res.data.token);
          await cartStore.fetchCart();
          await this.fetchWishlist();
          await this.fetchUser();
          return true;
        }
      } catch (err) {
        console.error("Login failed:", err);
        return false;
      }
    },
    async logout(router) {
      if (!this.user) return;
      try {
        const res = await axiosConfig.post("/logout");
        if (res) {
          const cartStore = useCartStore();
          this.user = null;
          cartStore.carts = [];
          this.wishlists = [];
          router.push({
            name: "home",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem("token");
      }
    },
    async register(credentials) {
      try {
        const res = await axiosConfig.post("/signup", credentials);
        localStorage.setItem("token", res.data.token);
        await this.fetchUser();

        return true;
      } catch (err) {
        console.error("Login failed:", err);
        return false;
      }
    },
    async fetchUserProfile() {
      this.isLoading = true;
      try {
        const res = await axiosConfig.get("/user");
        const userInfo = res.data;
        this.user.id = userInfo.id;
        this.user.name = userInfo.name;
        this.user.email = userInfo.email;
        this.user.created_at = userInfo.created_at;
        this.user.user_info = {
          phone: userInfo.user_info?.phone ?? "",
          address: userInfo.user_info?.address ?? "",
          avatar: userInfo.user_info?.avatar ?? "",
          location: userInfo.user_info?.location ?? "",
          description: userInfo.user_info?.description ?? "",
        };
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async updateUserProfile(formData) {
      try {
        const res = await axiosConfig.post(
          `/user/update/${this.user.id}`,
          formData
        );
        await this.fetchUser();
        return res;
      } catch (error) {
        if (error.response && error.response.data.errors) {
          return {
            errors: error.response.data.errors,
            code: 422,
          };
        }
      }
    },
    async fetchWishlist() {
      if (!localStorage.getItem("token")) return;
      this.isLoading = true;
      try {
        const res = await axiosConfig.get("/wishlists");
        if (res) {
          this.wishlists = res.data;
        }
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    },
    isWishlisted(productId) {
      return this.wishlists.some((w) => w.product_id === productId);
    },
    async toggle(productId) {
      if (this.isWishlisted(productId)) {
        this.removeWishlist(productId);
        this.fetchWishlist();
      } else {
        this.addWishlist(productId);
        this.fetchWishlist();
      }
    },
    async addWishlist(productId) {
      try {
        await axiosConfig.post("/wishlist", {
          product_id: productId,
        });
      } catch (error) {
        console.error("Lỗi khi thêm wishlist:", error);
      }
    },
    async removeWishlist(productId) {
      try {
        await axiosConfig.delete(`/wishlist/${productId}`);
      } catch (error) {
        console.error("Lỗi khi xóa wishlist:", error);
      }
    },
    async fetchAllUser() {
      this.isLoading = true;
      try {
        const res = await axiosConfig.get("/users");
        this.usersData = res.data.users;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchUserBuy() {
      this.isLoading = true;
      try {
        const res = await axiosConfig.get("/user/buy");
        this.userBuy = res.data.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
    async destroyUser(id) {
      try {
        const res = await axiosConfig.post("/user/destroy", {
          ids: id,
        });
        toast.success(res.data.message);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
