import LoginView from '@/pages/LoginView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: { name: 'login' },
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView, // start page
			meta: {
				disabledForAuthUsers: true, // Authenticated users don't have access to such pages
				title: 'Вход в аккаунт',
			},
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/pages/RegisterView.vue'),
			meta: {
				disabledForAuthUsers: true,
				title: 'Создание аккаунта',
			},
		},
		{
			path: '/projects',
			name: 'projects',
			component: () => import('@/pages/ProjectsView.vue'), // main page
			meta: {
				requiresAuth: true, // Only for authenticated users
				title: 'Проекты',
			},
		},
		{
			path: '/new-project',
			name: 'new-project',
			component: () => import('@/pages/NewProjectView.vue'),
			meta: {
				requiresAuth: true,
				title: 'Новый проект',
			},
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('@/pages/ProfileView.vue'),
			meta: {
				requiresAuth: true,
				title: 'Мой профиль',
			},
		},
		{
			path: '/:catchAll(.*)',
			name: 'not-found',
			component: () => import('@/pages/NotFoundView.vue'),
			meta: {
				title: 'Страница не найдена',
			},
		},
	],
});

// Use this to find out if the current user is authenticated
const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			user => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
};

// Check for user authorization
router.beforeEach(async (to, _from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// Requires authentication
		if (await getCurrentUser())
			proceed(); // Proceed for authenticated users
		else next('/login'); // Authenticate first
	} else if (
		to.matched.some(record => record.meta.disabledForAuthUsers) &&
		(await getCurrentUser())
	) {
		next('/projects'); // Some pages (login, register) aren't accessible for authenticated users
	} else proceed();

	// Proceed and apply a window title based on the current route
	function proceed() {
		document.title = (to.meta.title as string) || 'NA';
		next();
	}
});

export default router;
