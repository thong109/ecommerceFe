import {
	createRouter,
	createWebHistory
} from 'vue-router'
import axiosConfig from '@/helpers/axiosConfig'
import LoginView from '@/views/auth/LoginView.vue'
import HomeView from '@/views/home/HomeView.vue'
import MasterLayout from '@/layouts/home/MasterLayout.vue'
import CareerView from '@/views/home/CareerView.vue'
import CareerDetailView from '@/views/home/CareerDetailView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import NotFound from '@/components/NotFound.vue'
import BlogView from '@/views/home/BlogView.vue'
import ShopView from '@/views/home/ShopView.vue'
import ProductView from '@/views/home/ProductView.vue'
import RoomView from '@/views/user/RoomView.vue'
import AdminLayout from '@/layouts/admin/AdminLayout.vue'
import AdminNotFound from '@/components/AdminNotFound.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import StaffView from '@/views/admin/StaffView.vue'
import ClientView from '@/views/admin/ClientView.vue'
import ProductAdminView from '@/views/admin/Product/ProductView.vue'
import CategoryView from '@/views/admin/Category/CategoryView.vue'
import CategoryAddView from '@/views/admin/Category/CategoryAddView.vue'
import CategoryEditView from '@/views/admin/Category/CategoryEditView.vue'
import ProductAddView from '@/views/admin/Product/ProductAddView.vue'

const routes = [{
		path: '/',
		component: MasterLayout,
		children: [{
				path: '',
				name: 'home',
				component: HomeView
			},
			{
				path: 'login',
				name: 'login',
				component: LoginView
			},
			{
				path: 'signup',
				name: 'signup',
				component: SignUpView
			},
			{
				path: 'career',
				name: 'carrer',
				component: CareerView
			},
			{
				path: 'career/:id',
				component: CareerDetailView
			},
			{
				path: 'blog',
				name: 'blog',
				component: BlogView
			},
			{
				path: 'shop',
				name: 'shop',
				component: ShopView
			},
			{
				path: 'category/:id',
				name: 'category-detail',
				component: ShopView
			},
			{
				path: 'product/:id',
				name: 'product-detail',
				component: ProductView
			},
			{
				path: 'user',
				name: 'user',
				component: ProfileView
			},
			{
				path: 'dashboard',
				name: 'dashboard',
				component: RoomView,
			},
			{
				path: ':pathMatch(.*)*',
				name: 'NotFound',
				component: NotFound
			}
		]
	},
	{
		path: '/admin/',
		component: AdminLayout,
		meta: {
			requiresAuth: true,
			role: '1'
		},
		children: [{
				path: 'dashboard',
				name: 'dashboard',
				component: DashboardView,
			},
			{
				path: 'staff',
				name: 'staff',
				component: StaffView,
			},
			{
				path: 'client',
				name: 'client',
				component: ClientView,
			},
			{
				path: 'product',
				name: 'product',
				component: ProductAdminView,
			},
			{
				path: '/admin/product/add',
				name: 'product-add',
				component: ProductAddView,
			},
			{
				path: 'category',
				name: 'category',
				component: CategoryView,
			},
			{
				path: 'category/add',
				name: 'category-add',
				component: CategoryAddView,
			},
			{
				path: 'category/edit/:id',
				name: 'category-edit',
				component: CategoryEditView,
			},
			{
				path: ':pathMatch(.*)*',
				name: 'AdminNotFound',
				component: AdminNotFound
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(
		import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		// Nếu có vị trí lưu (quay lại từ browser), scroll đến đó
		if (savedPosition) {
			return savedPosition
		}

		return {
			top: 0
		}
	}
})

router.beforeEach(async (to, from, next) => {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role'); // không cần ép String nếu đã lưu dưới dạng string

	// 🔒 Nếu đã đăng nhập → không cho vào login/signup
	if (token && ['login', 'signup'].includes(to.name)) {
		return next({
			name: 'home'
		});
	}

	// 🔐 Nếu route yêu cầu đăng nhập
	if (to.meta.requiresAuth) {
		if (!token || !role) {
			return next({
				name: 'login'
			});
		}

		// ✅ Kiểm tra quyền truy cập nếu có yêu cầu role
		if (to.meta.role) {
			const allowedRoles = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role];
			if (!allowedRoles.includes(role)) {
				return next({
					name: 'NotFound'
				}); // hoặc redirect về NotFound nếu muốn
			}
		}

		// 🔑 Kiểm tra token có còn hợp lệ không
		const valid = await checkTokenAuthenticity();
		if (!valid) {
			return next({
				name: 'login'
			});
		}

		return next();
	}

	// 🟢 Nếu không cần đăng nhập → cho đi
	return next();
});

const checkTokenAuthenticity = async () => {
	try {
		await axiosConfig.get('/user'); // API kiểm tra token
		return true;
	} catch (error) {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		return false;
	}
};

export default router