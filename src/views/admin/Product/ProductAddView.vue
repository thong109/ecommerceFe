<template>
  <div class="app-title align-items-center">
    <ul class="app-breadcrumb breadcrumb mb-0">
      <li class="breadcrumb-item">Danh sách sản phẩm</li>
      <li class="breadcrumb-item">Thêm sản phẩm</li>
    </ul>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <h3 class="tile-title">Tạo mới sản phẩm</h3>
        <div class="tile-body">
          <form class="row" @submit.prevent="submitProduct">
            <div class="form-group col-md-4">
              <label class="control-label">Tên sản phẩm</label>
              <input class="form-control" type="text" v-model="product.name" @input="clearError('name')">
              <div class="invalid-feedback">
                <span v-if="errors.name" class="error-text">{{ errors.name[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-4">
              <label class="control-label">Số lượng</label>
              <input class="form-control" type="text" v-model="product.quantity" @input="clearError('quantity')">
              <div class="invalid-feedback">
                <span v-if="errors.quantity" class="error-text">{{ errors.quantity[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <label for="exampleSelect1" class="control-label">Tình trạng</label>
              <select class="form-control" id="exampleSelect1" v-model="product.status" @change="clearError('status')">
                <option disabled>-- Chọn tình trạng --</option>
                <option value="1">Hiện</option>
                <option value="0">Ẩn</option>
              </select>
              <div class="invalid-feedback">
                <span v-if="errors.status" class="error-text">{{ errors.status[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-4">
              <label class="control-label">Giá bán</label>
              <input class="form-control" type="text" v-model="product.price" @input="clearError('price')">
              <div class="invalid-feedback">
                <span v-if="errors.price" class="error-text">{{ errors.price[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-4">
              <label class="control-label">Giá vốn</label>
              <input class="form-control" type="text" v-model="product.cost" @input="clearError('cost')">
              <div class="invalid-feedback">
                <span v-if="errors.cost" class="error-text">{{ errors.cost[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <label for="exampleSelect1" class="control-label">Danh mục</label>
              <select v-model="selectedCategoryId" @change="fetchAttributes('change')" class="form-control">
                <option v-for="cat in categoryStore.data" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
              <div class="invalid-feedback">
                <span v-if="errors.category_id" class="error-text">{{ errors.category_id[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-4 ">
              <label for="exampleSelect2" class="control-label">Thương hiệu</label>
              <select class="form-control" v-model="product.brand_id" @change="clearError('brand_id')">
                <option v-for="brand in brandStore.data" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
              </select>
              <div class="invalid-feedback">
                <span v-if="errors.brand_id" class="error-text">{{ errors.brand_id[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-8">
              <label class="control-label">Thẻ</label>
              <input class="form-control" type="text" v-model="product.tag" @input="clearError('tag')">
              <div class="invalid-feedback">
                <span v-if="errors.tag" class="error-text">{{ errors.tag[0] }}</span>
              </div>
            </div>
            <!-- Danh sách thuộc tính -->

            <div class="form-group col-md-12">
              <div v-if="attributes.length">
                <div class="control-label mb-2">Thuộc tính:</div>
                <div class="d-block">
                  <div v-for="attr in attributes" :key="attr.id" class="mb-2 px-2 item-attr">
                    <label class="small fw-semibold" :for="`attr-${attr.id}`">{{ attr.name }}</label>
                    <div class="d-flex flex-wrap align-items-center" v-if="attr.values.length">
                      <div v-for="value in attr.values" :key="value.id" class="form-check pr-3">
                        <input type="checkbox" :id="`attr-${attr.id}-value-${value.id}`" :value="value.id"
                          v-model="selectedAttributes[attr.id]" class="form-check-input"
                          @change="clearError('attributes')" />
                        <label :for="`attr-${attr.id}-value-${value.id}`" class="form-check-label">{{ value.value
                        }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="invalid-feedback">
                    <span v-if="errors.attributes" class="error-text">{{ errors.attributes[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group col-md-12">
              <div class="control-label mb-2">Ảnh sản phẩm</div>
              <div id="myfileupload">
                <input type="file" id="uploadfile" ref="fileInput" name="ImageUpload" hidden @change="handleFileChange"
                  accept="image/*" />
              </div>
              <div id="thumbbox" v-if="previewImage">
                <img :src="getAvatarUrl(previewImage)" alt="Thumb image" id="thumbimage" height="450" width="400" />
                <button class="removeimg mb-0" type="button" @click="removeImage">×</button>
              </div>
              <div id="boxchoice">
                <label for="uploadfile" class="Choicefile p-2 rounded-2 fw-semibold mb-0">
                  <i class="bi bi-cloud-arrow-up-fill mr-2"></i>Chọn ảnh
                </label>
              </div>
              <div class="invalid-feedback">
                <span v-if="errors.image" class="error-text">{{ errors.image[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Mô tả ngắn</label>
              <input class="form-control resize-none" v-model="product.short_desc" @input="clearError('short_desc')" />
              <div class="invalid-feedback">
                <span v-if="errors.short_desc" class="error-text">{{ errors.short_desc[0] }}</span>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Mô tả sản phẩm</label>
              <textarea class="form-control resize-none" v-model="product.description"
                @input="clearError('description')"></textarea>
              <div class="invalid-feedback">
                <span v-if="errors.description" class="error-text">{{ errors.description[0] }}</span>
              </div>
            </div>

            <div class="col-12">
              <ButtonBack class="me-3 btn border border-black text-capitalize" />
              <button class="btn btn-small btn-outline-primary mb-0" type="submit">Lưu lại</button>
            </div>
            <!-- <a class="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosConfig from '@/helpers/axiosConfig'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { useBrandStore } from '@/stores/brand'
import ButtonBack from '@/components/button/ButtonBack.vue'
import { getAvatarUrl } from "@/helpers/formatted";

const selectedCategoryId = ref('')
const selectedAttributes = ref({})
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const router = useRouter()
const fileInput = ref(null)
const previewImage = ref(null)
const attributes = ref([])
const errors = ref({});
const route = useRoute()
const product = computed(() => productStore.product);
const productId = computed(() => route.params.id);

watch(() => productStore.previewImage, (val) => {
  previewImage.value = val;
}, { immediate: true });

watch(productId, async (id) => {
  if (id) {
    // Lấy chi tiết sản phẩm
    await productStore.showProduct(id);
    // Lấy danh mục của sản phẩm và set selectedCategoryId
    selectedCategoryId.value = product.value.category_id;

    // Fetch lại thuộc tính khi category_id thay đổi
    await fetchAttributes();

    // Nếu có các thuộc tính đã chọn từ backend (product.attributes), gán vào selectedAttributes
    if (product.value.attributes) {
      for (const attrId in product.value.attributes) {
        selectedAttributes.value[attrId] = product.value.attributes[attrId];
      }
    }
  }
}, { immediate: true });

watch(selectedCategoryId, async (newVal, oldVal) => {
  if (newVal !== oldVal && !productId.value) {
    await fetchAttributes();
  }
});

const handleFileChange = (event) => {
  delete errors.value['image'];

  const file = event.target.files[0]

  // Kiểm tra loại file (chỉ cho phép hình ảnh)
  if (file && file.type.startsWith('image/')) {
    // Kiểm tra kích thước file (5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('Ảnh quá lớn, vui lòng chọn ảnh nhỏ hơn 5MB!')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result // Gán ảnh xem trước
    }
    reader.readAsDataURL(file)

    // Cập nhật vào category.image
    product.value.image = file // Sử dụng .value khi cập nhật vào `ref`
  } else {
    alert('Vui lòng chọn file ảnh hợp lệ!')
  }
}

const removeImage = () => {
  previewImage.value = null
  product.value.image = null
  if (fileInput.value) {
    fileInput.value.value = '' // reset input file safely
  }
}

const submitProduct = async () => {
  const formData = new FormData()

  Object.entries(product.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })

  // Thêm danh mục
  formData.append('category_id', selectedCategoryId.value)

  // Thêm thuộc tính
  for (const attrId in selectedAttributes.value) {
    const value = selectedAttributes.value[attrId];
    if (Array.isArray(value) && value.length > 0) {
      value.forEach(val => {
        formData.append(`attributes[${attrId}][]`, val);
      });
    } else if (value) {
      formData.append(`attributes[${attrId}]`, value);
    }
  }

  if (product.value.image) {
    formData.append('image', product.value.image)
  }

  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1])
  // }

  try {
    let res;
    if (productId.value) {
      // Chỉnh sửa sản phẩm
      res = await productStore.editProduct(productId.value, formData, router);
    } else {
      // Thêm sản phẩm mới
      res = await productStore.addProduct(formData, router);
    }

    // Xử lý lỗi nếu có
    if (res && res.code === 404) {
      errors.value = res.errors;
    }
  } catch (error) {
    console.error("Có lỗi khi gửi dữ liệu sản phẩm: ", error);
  }
}

// Lấy các thuộc tính của danh mục đã chọn
const fetchAttributes = async (type = '') => {
  delete errors.value['category_id'];

  if (!selectedCategoryId.value) return;

  const res = await axiosConfig.get(`/categories/${selectedCategoryId.value}/attributes`);
  attributes.value = res.data;

  // Khởi tạo selectedAttributes với mảng trống cho mỗi thuộc tính
  selectedAttributes.value = {};

  // Lặp qua tất cả các thuộc tính và khởi tạo mảng trống cho mỗi thuộc tính
  attributes.value.forEach(attr => {
    selectedAttributes.value[attr.id] = selectedAttributes.value[attr.id] || [];
  });

  if (type === 'change') {
    // Reset lại selectedAttributes để không lấy thuộc tính cũ từ sản phẩm
    selectedAttributes.value = {};

    // Thiết lập lại các giá trị mặc định từ attributes vào selectedAttributes
    attributes.value.forEach(attr => {
      // Giả sử thuộc tính có thể chọn nhiều giá trị (checkbox), thì chọn các giá trị mặc định (trong trường hợp này là mảng)
      if (attr.default_values && attr.default_values.length > 0) {
        selectedAttributes.value[attr.id] = [...attr.default_values];
      } else {
        selectedAttributes.value[attr.id] = []; // Nếu không có giá trị mặc định, để trống
      }
    });
  }

  // Không lấy lại thuộc tính cũ từ sản phẩm khi có type === 'change', bỏ qua phần này
  if (productId.value && product.value.attributes && type !== 'change') {
    Object.keys(product.value.attributes).forEach(attrId => {
      const attrValue = product.value.attributes[attrId];

      // Chuyển chuỗi thành mảng nếu cần
      if (typeof attrValue === 'string') {
        selectedAttributes.value[attrId] = attrValue.split(',');  // Giả sử các giá trị trong chuỗi được phân cách bởi dấu phẩy
      } else {
        selectedAttributes.value[attrId] = Array.isArray(attrValue) ? attrValue : [attrValue];
      }
    });
  }
};

onMounted(async () => {
  await categoryStore.fetchProductByCategory()
  await brandStore.fetchBrands()
})

const clearError = (field) => {
  if (productStore.product[field]) {
    delete errors.value[field];
  }
};

</script>

<style lang="scss">
.item-attr {
  &:last-child {
    margin-bottom: 0 !important;
  }
}
</style>