<script setup lang="ts">
import type Document from '@/entities/Document';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { Dialog } from 'primevue';
import { ref, watch } from 'vue';

const isDialogVisible = ref<boolean>(false);
const newDocument = ref<Document>({
	name: '',
	link: '',
	document_id: -1, // Документ добавленный ручным способом имеет ИД равное 1. При сохранении проекта ИД будет incremented автоматически
	category: '',
	type: '',
});

const toastMessage = useToastMessage();

const { insertDocuments } = useNewProjectDetailsStore();

function addNewDocument() {
	if (
		newDocument.value.name !== '' &&
		newDocument.value.link !== '' &&
		newDocument.value.category !== '' &&
		newDocument.value.type !== ''
	) {
		const documentToInsert: Document = { ...newDocument.value };
		insertDocuments(documentToInsert);

		isDialogVisible.value = false;
	} else
		toastMessage('warn', 'Внимание!', 'Вам необходимо заполнить все поля.');
}

// Если диалоговое окно закрывается, то чистим в нем поля
watch(isDialogVisible, newVal => {
	if (!newVal)
		Object.assign(newDocument.value, {
			name: '',
			link: '',
			document_id: -1,
			category: '',
			type: '',
		});
});
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-primary text-accent py-3 border-2 border-content rounded-full shadow-md hover:bg-accent hover:text-primary"
		@click="isDialogVisible = true"
	>
		<i class="pi pi-plus mr-2"></i>
		Добавить документ вручную
	</button>

	<!-- Modal dialog that creates a new document -->
	<Dialog
		v-model:visible="isDialogVisible"
		modal
		header="Добавить новый нормативный документ"
		:dismissableMask="true"
	>
		<div class="grid grid-cols-[repeat(2, 1fr)] gap-4">
			<span class="mr-4">Название документа:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="newDocument.name"
			/>
			<span class="mr-4">Ссылка на документ:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="newDocument.link"
			/>
			<span class="mr-4">Категория документа:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="newDocument.category"
			/><span class="mr-4">Тип категории:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
				v-model="newDocument.type"
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
				@click="addNewDocument"
			>
				Добавить
			</button>
		</template>
	</Dialog>
</template>
