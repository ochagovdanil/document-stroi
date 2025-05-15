<script setup lang="ts">
import type Document from '@/entities/Document';
import { useExportWord } from '@/shared/api/mutations';
import useToastMessage from '@/shared/model/composables/useToastMessage';

const { projectName, documents, groupRowsBy } = defineProps<{
	projectName: string;
	documents: Document[];
	groupRowsBy: 'category' | 'type';
}>();

const toastMessage = useToastMessage();

const { mutateAsync } = useExportWord();

// Делаем запрос на сервер с целью получить Word документ на скачивание
async function handleClick() {
	try {
		const response = await mutateAsync({
			projectName: projectName,
			documents: documents,
			groupRowsBy: groupRowsBy,
		});

		// Создаем Blob из ответа
		const blob = new Blob([response], {
			type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		});

		// Создаем URL для скачивания
		const url = window.URL.createObjectURL(blob);

		// Создаем ссылку для скачивания
		const a = document.createElement('a');
		a.href = url;
		a.download = `${projectName}.docx`;
		document.body.appendChild(a);
		a.click();

		// Удаляем ссылку и освобождаем память
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	} catch (error: any) {
		toastMessage(
			'error',
			'Ошибка!',
			`При экспорте нормативных документов в Word что-то пошло не так:\n${error}`
		);
	}
}
</script>

<template>
	<button
		class="bg-blue-500 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-blue-400"
		@click="handleClick"
	>
		Экспорт в Word
		<i class="pi pi-external-link"></i>
	</button>
</template>
