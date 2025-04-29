<script setup lang="ts">
import { useRemoveProjectByName } from '@/shared/api/mutations';
import useConfirmDialog from '@/shared/model/composables/useConfirmDialog';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useRouter, type Router } from 'vue-router';

const { uid, projectName } = defineProps<{
	uid: string;
	projectName: string;
}>();

const confirmDialog = useConfirmDialog();
const toastMessage = useToastMessage();

const router: Router = useRouter();

const { mutateAsync, isPending } = useRemoveProjectByName(uid);

function handleClick() {
	confirmDialog(
		`Вы действительно хотите удалить проект "${projectName}"?`,
		'Внимание!',
		'pi pi-exclamation-triangle',
		{
			label: 'Отмена',
			severity: 'secondary',
			outlined: true,
		},
		{
			label: 'Удалить',
			severity: 'danger',
			outlined: false,
		},
		async () => {
			try {
				await mutateAsync(projectName);

				router.push({ name: 'projects' });

				toastMessage(
					'success',
					`Проект "${projectName}" был успешно удален!`,
					''
				);
			} catch (error: any) {
				toastMessage('error', 'Ошибка при удалении проекта!', error);
			}
		},
		() => {}
	);
}
</script>

<template>
	<button
		class="bg-secondary-dark text-primary font-bold rounded-md py-2 px-32 text-lg mt-6 border-2 border-content shadow-md cursor-pointer hover:bg-tertiary hover:text-secondary-dark"
		@click="handleClick"
	>
		Удалить проект
		<i
			v-if="isPending"
			class="pi pi-spin pi-spinner text-primary"
			style="font-weight: bold"
		></i>
	</button>
</template>
