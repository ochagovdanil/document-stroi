<script setup lang="ts">
import type Document from '@/entities/Document';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { Dialog } from 'primevue';
import { ref, watch } from 'vue';

const { document } = defineProps<{ document: Document }>();

const isDialogVisible = ref<boolean>(false);
const currentDocument = ref<Document>({
	name: document.name,
	link: document.link,
	document_id: document.document_id,
	category: document.category,
	type: document.type,
});

const toastMessage = useToastMessage();
const { updateDocument } = useNewProjectDetailsStore();

function editDocument() {
	if (
		currentDocument.value.name !== '' &&
		currentDocument.value.link !== '' &&
		currentDocument.value.category !== '' &&
		currentDocument.value.type !== ''
	) {
		try {
			// Обновляем нормативный документ
			updateDocument(document, currentDocument.value);

			isDialogVisible.value = false;
		} catch (error: any) {
			toastMessage(
				'error',
				'Внимание!',
				`При обновлении нормативного документа возникла ошибка: ${error}`
			);
		}
	} else
		toastMessage('warn', 'Внимание!', 'Вам необходимо заполнить все поля.');
}

// Если диалоговое окно закрывается, то устанавливаем поля до редактирования
watch(isDialogVisible, newVal => {
	if (!newVal)
		Object.assign(currentDocument.value, {
			name: document.name,
			link: document.link,
			document_id: document.document_id,
			category: document.category,
			type: document.type,
		});
});
</script>

<template>
	<i
		@click="() => (isDialogVisible = true)"
		class="pi pi-pencil w-full text-center cursor-pointer hover:text-secondary"
	></i>

	<!-- Modal dialog that edits the current document -->
	<Dialog
		v-model:visible="isDialogVisible"
		modal
		header="Редактировать нормативный документ"
		:dismissableMask="true"
	>
		<div class="grid grid-cols-[repeat(2, 1fr)] gap-4">
			<span class="mr-4">Название документа:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="currentDocument.name"
			/>
			<span class="mr-4">Ссылка на документ:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="currentDocument.link"
			/>
			<span class="mr-4">Категория документа:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="currentDocument.category"
			/><span class="mr-4">Тип категории:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="currentDocument.type"
			/>
		</div>
		<template #footer>
			<button
				@click="isDialogVisible = false"
				class="bg-secondary font-semibold py-2 px-4 rounded-md hover:bg-secondary-dark"
			>
				Отмена
			</button>
			<button
				class="bg-success font-semibold py-2 px-4 rounded-md hover:bg-success-light"
				@click="editDocument"
			>
				Сохранить
			</button>
		</template>
	</Dialog>
</template>
