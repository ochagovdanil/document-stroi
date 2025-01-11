<script setup lang="ts">
import logo from '@/app/ui/assets/logo-in-circle.png';
import ProfileCircle from '@/features/navbar/ui/ProfileCircle.vue';
import { getAuth, onAuthStateChanged, type Auth } from 'firebase/auth';
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
	<header class="bg-accent" v-if="isLoggedIn && route.name !== 'not-found'">
		<div
			class="container bg-primary flex justify-between items-center px-4 py-3 rounded-full my-3 border-2"
		>
			<div class="flex justify-center items-center gap-3">
				<img
					:src="logo"
					alt="Логотип"
					title="ДокументСтрой"
					class="h-10"
				/>
				<p class="text-lg text-accent">ДокументСтрой</p>
			</div>
			<nav>
				<ul class="flex items-center gap-6">
					<li>
						<RouterLink
							:to="{ name: 'projects' }"
							class="py-2 px-3 rounded-full text-accent hover:text-primary hover:bg-accent"
							activeClass="bg-accent text-primary"
							>Главная</RouterLink
						>
					</li>
					<li>
						<RouterLink
							:to="{ name: 'new-project' }"
							class="py-2 px-3 rounded-full text-accent hover:text-primary hover:bg-accent"
							activeClass="bg-accent text-primary"
							>Новый проект</RouterLink
						>
					</li>
					<li>
						<ProfileCircle />
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
