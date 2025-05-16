<script setup lang="ts">
import type Document from '@/entities/Document';
import useConfirmDialog from '@/shared/model/composables/useConfirmDialog';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';

const { selectedDocuments } = defineProps<{
	selectedDocuments: Document[];
}>();

const emit = defineEmits<{
	(e: 'onRemoved'): void;
}>();

const { removeDocuments } = useNewProjectDetailsStore();
const toastMessage = useToastMessage();
const confirmDialog = useConfirmDialog();

function removeSelectedItems() {
	if (selectedDocuments.length === 0)
		toastMessage(
			'warn',
			'Внимание!',
			'Выберите хотя бы одну запись в таблице.'
		);
	else {
		confirmDialog(
			`Вы уверены что хотите удалить ${selectedDocuments.length} нормативный документ(-ов) из списка?`,
			'Внимание!',
			'pi pi-exclamation-triangle',
			{
				label: 'Нет',
				severity: 'secondary',
				outlined: true,
			},
			{
				label: 'Удалить',
				severity: 'danger',
				outlined: false,
			},
			() => {
				// Удаляем выбранные документы из списка
				removeDocuments(...selectedDocuments);
				emit('onRemoved');
			},
			() => {}
		);
	}
}
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-secondary py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary hover:text-secondary"
		@click="removeSelectedItems"
	>
		<i class="pi pi-trash"></i>
		Удалить выбранные документы
	</button>
</template>
