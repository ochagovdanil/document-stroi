<script setup lang="ts">
import type Document from '@/entities/Document';
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

function removeSelectedItems() {
	if (selectedDocuments.length === 0)
		toastMessage(
			'warn',
			'Внимание!',
			'Выберите хотя бы одну запись в таблице.'
		);
	else {
		removeDocuments(...selectedDocuments);
		emit('onRemoved');
	}
}
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-secondary py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary hover:text-secondary"
		@click="removeSelectedItems"
	>
		<i class="pi pi-trash mr-2"></i>
		Удалить выбранные документы
	</button>
</template>
