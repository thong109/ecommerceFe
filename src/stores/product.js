import { defineStore } from "pinia";
import axiosConfig from "@/helpers/axiosConfig";
import { ref } from "vue";
import { toast } from "vue3-toastify";

export const useProductStore = defineStore("product", () => {
  const isLoading = ref(true);

  const productData = ref([]);

  const product = ref({
    name: "",
    quantity: "",
    status: "",
    price: "",
    cost: "",
    tag: "",
    image: null,
    short_desc: "",
    description: "",
    brand_id: "",
    category_id: "",
    attributes: {},
  });

  const previewImage = ref(null);

  async function fetchProducts(param = "") {
    isLoading.value = true;
    try {
      const res = await axiosConfig.get(`/products/all?attr=${param}`);
      productData.value = res.data;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function addProduct(formData, router) {
    try {
      await axiosConfig.post("/products/store", formData);
      resetFormProduct();
      router.push("/admin/product/");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return {
          errors: error.response.data.errors,
          code: 404,
        };
      }
    }
  }

  async function resetFormProduct() {
    product.value = {
      name: "",
      quantity: "",
      status: "",
      price: "",
      cost: "",
      tag: "",
      image: null,
      short_desc: "",
      description: "",
      brand_id: "",
    };

    previewImage.value = null;
  }

  async function deleteProduct(id) {
    isLoading.value = true;

    try {
      const res = await axiosConfig.post(`/products/destroy`, {
        ids: id,
      });
      toast.success(res.data.message);
      fetchProducts();
    } catch (error) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function showProduct(id) {
    try {
      const res = await axiosConfig.get(`/products/show/${id}`);
      console.log(res);

      product.value = {
        name: res.data.name,
        status: res.data.status,
        quantity: res.data.quantity,
        price: res.data.price,
        cost: res.data.cost,
        tag: res.data.tag,
        image: null,
        short_desc: res.data.short_desc,
        description: res.data.description,
        brand_id: res.data.brand.id,
        category_id: res.data.category.id,
        attributes: res.data.attributes,
      };
      previewImage.value = res.data.image_url;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function editProduct(id, formData, router) {
    try {
      formData.append("_method", "PUT");
      await axiosConfig.post(`/products/update/${id}`, formData);
      resetFormProduct();
      router.push({
        name: "product",
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return {
          errors: error.response.data.errors,
          code: 404,
        };
      }
    }
  }

  return {
    isLoading,
    productData,
    product,
    previewImage,
    fetchProducts,
    addProduct,
    deleteProduct,
    showProduct,
    editProduct,
  };
});
