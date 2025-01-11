<script setup lang="ts">
import logo from '@/app/ui/assets/logo-in-circle.png';
import ProfileCircle from '@/features/navbar/ProfileCircle.vue';
import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
import { Divider } from 'primevue';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const isLoggedIn = ref<boolean>(false);

const route = useRoute();

let auth: Auth | null = null;

onMounted(() => {
	auth = getAuth();

	onAuthStateChanged(auth, user => {
		if (user) isLoggedIn.value = true;
		else isLoggedIn.value = false;
	});
});
</script>

<template>
	<header
		class="bg-background"
		v-if="isLoggedIn && route.name !== 'not-found'"
	>
		<div class="container flex justify-between items-center mt-4">
			<div class="flex justify-center items-center gap-3">
				<img
					:src="logo"
					alt="Логотип"
					title="ДокументСтрой"
					class="h-8"
				/>
				<p class="text-lg">ДокументСтрой</p>
			</div>
			<nav>
				<ul class="flex items-center gap-6">
					<li>
						<RouterLink
							:to="{ name: 'projects' }"
							class="py-1 px-2 rounded-md hover:text-background hover:bg-primary"
							activeClass="bg-primary text-background"
							>Главная</RouterLink
						>
					</li>
					<li>
						<RouterLink
							:to="{ name: 'new-project' }"
							class="py-1 px-2 rounded-md hover:text-background hover:bg-primary"
							activeClass="bg-primary text-background"
							>Новый проект</RouterLink
						>
					</li>
					<li>
						<ProfileCircle />
					</li>
				</ul>
			</nav>
		</div>
		<Divider />
	</header>
</template>
