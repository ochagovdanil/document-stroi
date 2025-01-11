<script setup lang="ts">
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { getAuth, signOut } from 'firebase/auth';
import Popover from 'primevue/popover';
import { useTemplateRef } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const popoverRef = useTemplateRef('popover');
const router = useRouter();
const toastMessage = useToastMessage();

// Toggle popover for profile circle
function togglePopover(event: Event) {
	popoverRef.value?.toggle(event);
}

// User sign out
function signOutUser(): void {
	signOut(getAuth())
		.then(() => router.push({ name: 'login' }))
		.catch(error =>
			toastMessage('error', 'Ошибка!', `Возникла ошибка:\n${error}`)
		);
}
</script>

<template>
	<div
		class="h-9 w-9 bg-tertiary-light border-primary border-[0.0625rem] rounded-full cursor-pointer flex justify-center items-center"
		@click="togglePopover"
		title="Профиль"
	>
		<i class="pi pi-user"></i>
	</div>
	<Popover ref="popover">
		<ul class="flex flex-col gap-2">
			<li>
				<RouterLink
					:to="{ name: 'profile' }"
					class="cursor-pointer hover:text-secondary"
					>Мой профиль</RouterLink
				>
			</li>
			<li>
				<p
					@click="signOutUser"
					class="w-max cursor-pointer bg-primary text-white py-1 px-3 rounded-md hover:bg-black hover:text-secondary"
				>
					Выйти из аккаунта
				</p>
			</li>
		</ul>
	</Popover>
</template>
