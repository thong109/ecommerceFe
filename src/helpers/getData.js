import axiosConfig from "@/helpers/axiosConfig";
import { toast } from "vue3-toastify";

export async function exportData(name) {
  try {
    // Gọi API để lấy file Excel (responseType là 'blob')
    const response = await axiosConfig.get(`/${name}/export`, {
      responseType: "blob", // Nhận file nhị phân (blob)
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Định dạng file Excel
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_export.xlsx`;
    link.click();
  } catch (error) {
    console.error("Lỗi khi xuất file Excel:", error);
  }
}

export async function copyData(ids, name) {
  try {
    if (ids.length === 0) return false;

    const res = await axiosConfig.post(`/${name}/copy`, {
      ids: ids,
    });

    if (res.data.code === 200) {
      toast.success(res.data.message);
      return true;
    }
  } catch (error) {
    toast.error("Có lỗi xảy ra vui lòng thử lại");
  }
}

export async function deleteData(ids, name) {
  try {
    if (ids.length === 0) return false;

    const res = await axiosConfig.post(`/${name}/destroy`, {
      ids: ids,
    });

    if (res.data.code === 200) {
      toast.success(res.data.message);
    }

    return res;
  } catch (error) {
    return res;
  }
}

export async function restoreData(ids, name) {
  try {
    if (ids.length === 0) return false;

    const res = await axiosConfig.post(`/${name}/restore`, {
      ids: ids,
    });

    if (res.data.code === 200) {
      toast.success(res.data.message);
    }
    return res;
  } catch (error) {
    toast.error("Có lỗi xảy ra vui lòng thử lại");
  }
}

export async function changeStatusData(id, name) {
  if (!id) return;
  try {
    const res = await axiosConfig.post(`/${name}/status/change/${id}`);

    if (res.data.code === 422) {
      toast.error(res.data.message);
    }

    if (res.data.code === 200) {
      toast.success(res.data.message);
    }

    return res;
  } catch (error) {
    toast.error("Có lỗi xảy ra vui lòng thử lại");
  }
}
