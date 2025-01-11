<script setup lang="ts">
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { getAuth, signOut, type User } from 'firebase/auth';
import Popover from 'primevue/popover';
import { useTemplateRef } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const currentUser: User = getAuth().currentUser!;

const popoverRef = useTemplateRef('popover');
const router = useRouter();
const toast = useToastMessage();

// Toggle popover for profile circle
function togglePopover(event: Event) {
	popoverRef.value?.toggle(event);
}

// User sign out
function signOutUser(): void {
	signOut(getAuth())
		.then(() => router.push({ name: 'login' }))
		.catch(error =>
			toast('error', 'Ошибка!', `Возникла ошибка:\n${error}`)
		);
}
</script>

<template>
	<img
		v-if="currentUser?.photoURL"
		:src="currentUser.photoURL"
		alt="Профиль"
		title="Профиль"
		class="h-10 w-10 border-accent border-[0.125rem] rounded-full cursor-pointer"
		@click="togglePopover"
	/>
	<div
		v-else
		class="h-10 w-10 bg-tertiary-light border-primary border-[0.0625rem] rounded-full cursor-pointer flex justify-center items-center"
		@click="togglePopover"
		title="Профиль"
	>
		<i class="pi pi-user"></i>
	</div>
	<Popover ref="popover">
		<ul class="flex flex-col gap-2">
			<li>
				<RouterLink :to="{ name: 'profile' }" class="cursor-pointer"
					>Мой профиль</RouterLink
				>
			</li>
			<li>
				<p
					@click="signOutUser"
					class="w-max cursor-pointer text-primary bg-accent py-2 px-3 rounded-lg hover:bg-primary hover:text-accent"
				>
					Выйти из аккаунта
				</p>
			</li>
		</ul>
	</Popover>
</template>
