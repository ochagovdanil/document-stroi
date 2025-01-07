import '@/app/ui/styles/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from '@/app/router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(createPinia())
	.use(router)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
		},
		ripple: true,
	})
	.use(VueQueryPlugin);

app.mount('#app');
