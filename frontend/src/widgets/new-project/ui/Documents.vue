<script setup lang="ts">
import type Document from '@/entities/Document';
import InsertDocumentManually from '@/features/new-project/ui/InsertDocumentManually.vue';
import LoadRecommendedDocs from '@/features/new-project/ui/LoadRecommendedDocs.vue';
import RemoveSelectedDocuments from '@/features/new-project/ui/RemoveSelectedDocuments.vue';
import SaveProject from '@/features/new-project/ui/SaveProject.vue';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { storeToRefs } from 'pinia';
import { Column, DataTable } from 'primevue';
import { ref } from 'vue';

const { details, getDocumentsSize } = storeToRefs(useNewProjectDetailsStore());
const selectedDocuments = ref<Document[]>([]); // Выбранные записи в таблице
</script>

<template>
	<div class="grid grid-cols-3 gap-4">
		<LoadRecommendedDocs />
		<InsertDocumentManually />
		<RemoveSelectedDocuments
			:selectedDocuments
			@onRemoved="() => (selectedDocuments = [])"
		/>
	</div>
	<div v-if="getDocumentsSize">
		<p class="text-xl text-center mb-4">
			Список нормативных документов для нового проекта:
		</p>
		<DataTable
			size="small"
			showGridlines
			stripedRows
			removableSort
			:value="details.documents"
			v-model:selection="selectedDocuments"
			dataKey="name"
		>
			<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
			<Column field="name" header="Название документа" sortable></Column>
			<Column field="link" header="Ссылка на документ"></Column>
		</DataTable>
	</div>
	<SaveProject />
</template>
