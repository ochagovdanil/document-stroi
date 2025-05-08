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
	<header
		class="bg-accent"
		v-if="
			isLoggedIn &&
			route.name !== 'not-found' &&
			route.name !== 'project' &&
			route.name !== 'shared-current'
		"
	>
		<div
			class="container bg-primary flex justify-between items-center px-4 py-3 rounded-full my-3 border-2 shadow-md"
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
							><i class="pi pi-address-book mr-2"></i>Мои
							проекты</RouterLink
						>
					</li>
					<li>
						<RouterLink
							:to="{ name: 'shared' }"
							class="py-2 px-3 rounded-full text-accent hover:text-primary hover:bg-accent"
							activeClass="bg-accent text-primary"
							><i class="pi pi-users mr-2"></i>Доступные
							мне</RouterLink
						>
					</li>
					<li>
						<RouterLink
							:to="{ name: 'new-project' }"
							class="py-2 px-3 rounded-full text-accent hover:text-primary hover:bg-accent"
							activeClass="bg-accent text-primary"
							><i class="pi pi-plus-circle mr-2"></i>Новый
							проект</RouterLink
						>
					</li>
					<li>
						<RouterLink
							:to="{ name: 'new-documents' }"
							class="relative py-2 px-3 text-accent cursor-pointer rounded-full hover:text-primary hover:bg-accent"
							activeClass="bg-accent text-primary"
						>
							<i class="pi pi-bell" style="font-size: 1.2rem">
								<div
									class="absolute top-1 right-2 h-2 w-2 bg-red-500 rounded-full"
								></div>
							</i>
						</RouterLink>
					</li>
					<li>
						<ProfileCircle />
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
