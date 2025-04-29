<script setup lang="ts">
import { useDocumentsByIds } from '@/shared/api/mutations';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { useNewProjectFilterIdsStore } from '@/shared/model/store/NewProjectFilterIds';
import { storeToRefs } from 'pinia';

const { uniqueDocumentIds } = storeToRefs(useNewProjectFilterIdsStore()); // Используем этот стор для извлечения IDs рекомендуемых документов
const { insertDocuments } = useNewProjectDetailsStore(); // Используем этот стор для вставки рекомендуемых документов в таблицу

const { mutateAsync, isPending } = useDocumentsByIds(); // Запрос на получение нормативных документов по их IDs

const toastMessage = useToastMessage();

async function loadRecommendedDocuments() {
	if (uniqueDocumentIds.value.length === 0) {
		toastMessage(
			'error',
			'Внимание!',
			'К сожалению, рекомендуемые документы не удалось обнаружить.'
		);
	} else {
		// Делаем запрос на получение рекомендуемых нормативных документов
		try {
			const data = await mutateAsync(uniqueDocumentIds.value);
			insertDocuments(...data);
		} catch (error: any) {
			toastMessage(
				'error',
				'Ошибка при загрузке рекомендуемых документов!',
				error.message
			);
		}
	}
}
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-tertiary-light py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary-dark"
		@click="loadRecommendedDocuments"
	>
		<i class="pi pi-sparkles mr-2" v-if="!isPending"></i>
		<i class="pi pi-spinner pi-spin mr-2" v-if="isPending"></i>
		Загрузить рекомендуемые документы
	</button>
</template>
