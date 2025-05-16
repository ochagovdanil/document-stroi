<script setup lang="ts">
import type Document from '@/entities/Document';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { ref } from 'vue';

const { insertDocuments } = useNewProjectDetailsStore();

const toastMessage = useToastMessage();

const fileInput = ref<HTMLInputElement | null>(null); // Ссылка на input с type=file
const isParsing = ref<boolean>(false);

// Открываем скрытый input
function selectFile() {
	fileInput.value?.click();
}

// Обрабатываем выбранный XML файл
function handleFileChange(event: Event) {
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	if (file) {
		const reader = new FileReader();

		reader.onload = e => {
			const xmlString = e.target?.result as string;
			parseXML(xmlString);
		};

		reader.readAsText(file);
	}
}

// Парсинг XML файла на наличие нормативных документов
function parseXML(xmlString: string) {
	try {
		isParsing.value = true;

		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

		const documentsList: Document[] = []; // Нормативные документы, извлеченные из XML файла
		const documents = xmlDoc.querySelectorAll('Document');

		documents.forEach(doc => {
			const docName =
				doc.querySelector('DocName')?.textContent ||
				'Неизвестный документ';
			const files = Array.from(doc.querySelectorAll('FileName')).map(
				file => file.textContent || 'Без имени'
			);

			if (files.length > 0) {
				const newDocument: Document = {
					name: docName,
					link: files.join(', '),
					document_id: -1,
					category: '',
					type: '',
				};
				documentsList.push(newDocument);
			}
		});

		insertDocuments(...documentsList);
	} catch (e: any) {
		toastMessage(
			'error',
			'Ошибка!',
			`Во время парсинга XML файла возникла ошибка:\n${e}`
		);
	} finally {
		isParsing.value = false;
	}
}
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-background py-3 border-2 border-content rounded-full shadow-md hover:bg-content hover:text-background"
		@click="selectFile"
	>
		<i class="pi pi-code" v-if="!isParsing"></i>
		<i class="pi pi-spinner pi-spin" v-else></i>
		Загрузить XML файл
	</button>
	<!-- Hidden -->
	<input
		type="file"
		ref="fileInput"
		accept=".xml"
		@change="handleFileChange"
		style="display: none"
	/>
</template>
