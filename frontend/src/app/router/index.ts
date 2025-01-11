import LoginView from '@/pages/LoginView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: LoginView, // start page
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/pages/RegisterView.vue'),
		},
		{
			path: '/projects',
			name: 'projects',
			component: () => import('@/pages/ProjectsView.vue'), // main page
			meta: {
				requiresAuth: true,
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
		// requires authentication
		if (await getCurrentUser()) next(); // proceed
		else next('/login'); // authenticate first
	} else next(); // no authentication required
});

export default router;
