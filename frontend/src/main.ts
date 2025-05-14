import '@/app/ui/styles/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from '@/app/router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import { VueQueryPlugin } from '@tanstack/vue-query';

import { initializeApp } from 'firebase/app';
import { definePreset } from '@primevue/themes';

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

// Override PrimeVue primary color
const MyPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '{slate.50}',
			100: '{slate.100}',
			200: '{slate.200}',
			300: '{slate.300}',
			400: '{slate.400}',
			500: '{slate.500}',
			600: '{slate.600}',
			700: '{slate.700}',
			800: '{slate.800}',
			900: '{slate.900}',
			950: '{slate.950}',
		},
	},
});

// Init Vue.js app
const app = createApp(App);

app.use(createPinia())
	.use(router)
	.use(PrimeVue, {
		theme: {
			preset: MyPreset,
		},
		ripple: true,
	})
	.use(ToastService)
	.use(ConfirmationService)
	.use(VueQueryPlugin);

app.mount('#app');
