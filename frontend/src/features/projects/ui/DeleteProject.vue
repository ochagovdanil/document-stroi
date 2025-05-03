<script setup lang="ts">
import { useRemoveProjectByName } from '@/shared/api/mutations';
import useConfirmDialog from '@/shared/model/composables/useConfirmDialog';
import useToastMessage from '@/shared/model/composables/useToastMessage';

const { uid, projectName } = defineProps<{
	uid: string;
	projectName: string;
}>();

const confirmDialog = useConfirmDialog();
const toastMessage = useToastMessage();

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
		class="bg-tertiary self-center rounded-e-lg mr-[-3rem] shadow-lg hover:bg-tertiary-dark"
		title="Удалить проект"
		@click.stop="handleClick"
	>
		<i
			v-if="isPending"
			class="pi pi-spin pi-spinner p-6 text-secondary-dark"
			style="font-size: 1.2rem"
		></i>
		<i
			v-else
			class="pi pi-trash p-6 text-secondary-dark"
			style="font-size: 1.2rem"
		></i>
	</button>
</template>
