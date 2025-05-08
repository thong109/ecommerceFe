import { defineStore } from "pinia";
import { ref } from "vue";
import axiosConfig from "@/helpers/axiosConfig";

export const useSettingsStore = defineStore("settings", () => {
  const settingsData = ref({
    notify: "",
    theme_color: "#000000",
    banners: [],
  });

  // Hàm lấy cài đặt từ API
  async function fetchSetting() {
    try {
      const res = await axiosConfig.get("/settings");
      settingsData.value = res.data.length > 0 ? JSON.parse(res.data) : settingsData.value;
    } catch (e) {
      console.error(e);
    }
  }

  return {
    settingsData,
    fetchSetting,
  };
});
