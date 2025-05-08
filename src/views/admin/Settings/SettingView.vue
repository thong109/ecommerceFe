<template>
  <div class="app-title align-items-center">
    <ul class="app-breadcrumb breadcrumb mb-0">
      <li class="breadcrumb-item">Cài đặt hệ thống</li>
    </ul>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <form class="row" @submit.prevent="submitSetting">
          <div class="form-group col-md-6">
            <label class="control-label">Thông báo</label>
            <input class="form-control" v-model="settings.notify" type="text" />
          </div>
          <div class="form-group col-md-6">
            <label class="control-label">Màu theme</label>
            <input
              class="form-control"
              v-model="settings.theme_color"
              type="color"
            />
          </div>
          <div class="form-group col-md-12">
            <label class="control-label">Banner</label>
            <table
              class="table table-hover table-bordered"
              style="table-layout: fixed"
            >
              <thead>
                <tr class="border-bottom-0">
                  <th class="w-25">Hình ảnh</th>
                  <th class="w-25 text-center">Nhãn</th>
                  <th class="w-25">Tiêu đề</th>
                  <th class="w-25">Mô tả</th>
                  <th class="w-25">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(banner, index) in settings.banners" :key="index">
                  <td>
                    <div id="myfileupload">
                      <input
                        type="file"
                        :id="'uploadfile_' + index"
                        ref="fileInput"
                        name="ImageUpload"
                        hidden
                        @change="handleFileChange(index, $event)"
                        accept="image/*"
                      />
                    </div>
                    <div id="thumbbox" v-if="banner.previewImage">
                      <img
                        :src="banner.previewImage"
                        alt="Thumb image"
                        id="thumbimage"
                        height="450"
                        width="400"
                      />
                      <button
                        class="removeimg mb-0"
                        type="button"
                        @click="removeImage(index)"
                      >
                        ×
                      </button>
                    </div>
                    <div
                      id="thumbbox"
                      v-if="banner.image && typeof banner.image !== 'object'"
                    >
                      <img
                        :src="getAvatarUrl(banner.image)"
                        alt="Thumb image"
                        id="thumbimage"
                        height="450"
                        width="400"
                      />
                      <button
                        class="removeimg mb-0"
                        type="button"
                        @click="removeImage(index)"
                      >
                        ×
                      </button>
                    </div>
                    <div
                      id="boxchoice"
                      v-if="!banner.previewImage && !banner.image"
                    >
                      <label
                        :for="'uploadfile_' + index"
                        class="Choicefile p-2 rounded-2 fw-semibold mb-0"
                      >
                        <i class="bi bi-cloud-arrow-up-fill mr-2"></i>Chọn ảnh
                      </label>
                    </div>
                  </td>
                  <td><input v-model="banner.label" class="form-control" /></td>
                  <td><input v-model="banner.title" class="form-control" /></td>
                  <td>
                    <input v-model="banner.description" class="form-control" />
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      type="button"
                      @click="removeBanner(index)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="addBanner"
            >
              Thêm Banner
            </button>
          </div>
          <div class="col-12">
            <button
              class="btn btn-small btn-outline-primary mb-0"
              type="submit"
            >
              Lưu lại
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axiosConfig from "@/helpers/axiosConfig";
import { useSettingsStore } from "@/stores/settings";
import { getAvatarUrl } from "@/helpers/formatted";
import { toast } from "vue3-toastify";

const settingsStore = useSettingsStore();
const settings = settingsStore.settingsData;

// Hàm submit cài đặt
const submitSetting = async () => {
  const formData = new FormData();

  formData.append("notify", settings.notify);
  formData.append("theme_color", settings.theme_color);

  settings.banners.forEach((banner, index) => {
    if (banner.image && banner.image instanceof File) {
      formData.append(`images[${index}]`, banner.image);
    }
    formData.append(`banners[${index}][label]`, banner.label ?? "");
    formData.append(`banners[${index}][title]`, banner.title ?? "");
    formData.append(`banners[${index}][description]`, banner.description ?? "");
  });

  try {
    await axiosConfig.post("/settings", formData);
    toast.success("Đã lưu cài đặt!");
  } catch (error) {
    toast.error("Lỗi khi lưu cài đặt");
  }
};

// Hàm thêm banner mới vào danh sách
const addBanner = () => {
  // Make sure banners is an array before pushing to it
  if (Array.isArray(settings.banners)) {
    settings.banners.push({
      image: "",
      label: "",
      title: "",
      description: "",
      previewImage: null,
    });
  } else {
    console.error("Banners is not an array!");
  }
};

const removeBanner = (index) => {
  // Kiểm tra nếu index hợp lệ
  if (index > -1 && index < settings.banners.length) {
    // Xóa banner tại vị trí index
    settings.banners.splice(index, 1);
  } else {
    console.error("Invalid banner index");
  }
};

// Hàm xử lý thay đổi hình ảnh
const handleFileChange = (index, event) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn 5MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      settings.banners[index].previewImage = e.target.result;
    };
    reader.readAsDataURL(file);
    settings.banners[index].image = file;
  } else {
    toast.error("Vui lòng chọn file ảnh hợp lệ!");
  }
};

// Hàm xóa hình ảnh
const removeImage = (index) => {
  settings.banners[index].previewImage = null;
  settings.banners[index].image = null; // Remove the image file
  const fileInput = document.querySelector(`#uploadfile_${index}`);
  if (fileInput) {
    fileInput.value = ""; // Reset file input
  }
};

onMounted(async () => {
  await settingsStore.fetchSetting();
});
</script>

<style lang="scss" scoped>
#thumbimage {
  width: 100%;
  height: 100%;
}
</style>
