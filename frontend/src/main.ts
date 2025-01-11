import '@/app/ui/styles/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from '@/app/router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

import { VueQueryPlugin } from '@tanstack/vue-query';

import { initializeApp } from 'firebase/app';

// Init Firebase O-Auth
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

// Init Vue.js app
const app = createApp(App);

app.use(createPinia())
	.use(router)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
		},
		ripple: true,
	})
	.use(ToastService)
	.use(VueQueryPlugin);

app.mount('#app');
