<script setup lang="ts">
import useConfirmDialog from '@/shared/model/composables/useConfirmDialog';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { deleteUser, type User } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToastMessage(5_000);
const confirm = useConfirmDialog();

const { currentUser } = defineProps<{
	currentUser: User;
}>();

function deleteAccount() {
	// Ask a user to perform the action
	confirm(
		'Вы уверены что хотите удалить аккаунт?',
		'Внимание!',
		'pi pi-exclamation-triangle',
		{
			label: 'Отмена',
			severity: 'secondary',
			outlined: true,
		},
		{
			label: 'Все равно удалить',
			severity: 'danger',
			outlined: false,
		},
		() => {
			// Delete an account
			deleteUser(currentUser)
				.then(() => {
					// Success
					router.push({ name: 'login' });
					toast('success', 'Успешно!', 'Аккаунт был удален.');
				})
				.catch(error => {
					// Failure
					if (error.code === 'auth/requires-recent-login')
						toast(
							'warn',
							'Предупреждение!',
							'Сессия устарела.\nНеобходимо войти в аккаунт заново, чтобы выполнить данное действие.'
						);
					else toast('error', 'Ошибка!', error);
				});
		},
		() => {}
	);
}
</script>

<template>
	<button
		@click="deleteAccount"
		class="bg-secondary font-semibold text-lg mt-8 py-2 px-8 rounded-full shadow-md border-primary border-2 hover:bg-tertiary hover:text-secondary"
	>
		Удалить аккаунт
	</button>
</template>
