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
import DashboardView from '@/views/user/DashboardView.vue'
import RoomView from '@/views/user/RoomView.vue'

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
	// {
	// 	path: '/user/',
	// 	component: UserLayout,
	// 	meta: {
	// 		requiresAuth: true,
	// 		role: ['0', '1']
	// 	}, // chỉ user truy cập
	// 	children: [{
	// 			path: 'dashboard',
	// 			name: 'dashboard',
	// 			component: DashboardView,
	// 		},
	// 		{
	// 			path: 'room',
	// 			name: 'room',
	// 			component: RoomView
	// 		},
	// 		{
	// 			path: 'profile',
	// 			name: 'profile',
	// 			component: ProfileView
	// 		},
	// 		{
	// 			path: 'new-cv',
	// 			name: 'cv',
	// 			component: CvView
	// 		},
	// 		{
	// 			path: 'cv/:id',
	// 			name: 'cv-detail',
	// 			component: CvDetailView
	// 		}
	// 	]
	// },

	// {
	//     path: '/standby',
	//     name: 'standby',
	//     component: StandbyView,
	//     meta: {
	//         requiresAuth: true
	//     }, // mọi người login đều được vào
	// },
	// {
	//     path: '/driver',
	//     name: 'driver',
	//     component: DriverView,
	//     meta: {
	//         requiresAuth: true,
	//         role: 'driver'
	//     }, // chỉ driver truy cập
	// },
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
	const token = localStorage.getItem('token')
	const role = String(localStorage.getItem('role'))

	// Không cho truy cập login / signup nếu đã login
	if (token && (to.name === 'login' || to.name === 'signup')) {
		return next({
			name: 'home'
		})
	}

	// Cần đăng nhập
	if (to.meta.requiresAuth) {
		if (!token || !role) {
			return next({
				name: 'login'
			})
		}

		// Kiểm tra quyền
		if (Array.isArray(to.meta.role) && !to.meta.role.includes(role)) {
			alert('Bạn không có quyền truy cập trang này!')
			return next({
				name: 'home'
			})
		}

		// Kiểm tra token hợp lệ
		const valid = await checkTokenAuthenticity()

		if (!valid) {
			return next({
				name: 'login'
			})
		}

		return next()
	}

	next()
})

const checkTokenAuthenticity = async () => {
	try {
		await axiosConfig.get('/user')
		return true
	} catch (error) {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		return false
	}
}

export default router