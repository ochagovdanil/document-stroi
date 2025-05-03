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
					'Успешно!',
					`Проект "${projectName}" был удален!`
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
		class="bg-secondary-dark text-primary rounded-md py-2 px-32 text-lg mt-6 mb-10 border-2 border-content shadow-md cursor-pointer hover:bg-tertiary"
		@click="handleClick"
	>
		<i v-if="isPending" class="pi pi-spin pi-spinner text-primary"></i>
		<i v-else class="pi pi-eraser text-primary"></i>
		Удалить проект
	</button>
</template>
