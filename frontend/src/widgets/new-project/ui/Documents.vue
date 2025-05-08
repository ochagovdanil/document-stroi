<script setup lang="ts">
import type Document from '@/entities/Document';
import EditDocument from '@/features/new-project/ui/EditDocument.vue';
import InsertDocumentManually from '@/features/new-project/ui/InsertDocumentManually.vue';
import LoadRecommendedDocs from '@/features/new-project/ui/LoadRecommendedDocs.vue';
import RemoveSelectedDocuments from '@/features/new-project/ui/RemoveSelectedDocuments.vue';
import SaveProject from '@/features/new-project/ui/SaveProject.vue';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { storeToRefs } from 'pinia';
import { Column, DataTable, RadioButton } from 'primevue';
import { ref } from 'vue';

const { details, getDocumentsSize } = storeToRefs(useNewProjectDetailsStore());
const selectedDocuments = ref<Document[]>([]); // Выбранные записи в таблице
const groupRowsBy = ref<'category' | 'type'>('category'); // По какой колонке группируем данные в таблице
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
		<DataTable
			size="small"
			showGridlines
			stripedRows
			removableSort
			:value="details.documents"
			v-model:selection="selectedDocuments"
			dataKey="name"
			paginator
			:rows="15"
			:rows-per-page-options="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
			sortMode="multiple"
			class="mb-8 bg-white"
			rowGroupMode="subheader"
			:groupRowsBy="groupRowsBy"
		>
			<template #header>
				<div class="flex justify-between items-center">
					<div class="flex gap-2">
						<p>Группировать по:</p>
						<div>
							<RadioButton
								v-model="groupRowsBy"
								inputId="category"
								name="category"
								value="category"
							/>
							<label for="category" class="ml-2">категории</label>
						</div>
						<div>
							<RadioButton
								v-model="groupRowsBy"
								inputId="type"
								name="type"
								value="type"
							/>
							<label for="type" class="ml-2">типу</label>
						</div>
					</div>
				</div>
			</template>
			<!-- Групповой заголовок -->
			<template #groupheader="slotProps">
				<p
					class="text-lg text-center italic"
					v-if="groupRowsBy === 'category'"
				>
					{{ slotProps.data.category }}
				</p>
				<p class="text-lg text-center italic" v-else>
					{{ slotProps.data.type }}
				</p>
			</template>
			<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
			<Column field="name" header="Название документа" sortable>
				<template #body="slotProps">
					<a
						:href="slotProps.data.link"
						target="_blank"
						class="text-blue-600 underline"
						>{{ slotProps.data.name }}</a
					></template
				></Column
			>
			<Column
				field="type"
				header="Тип"
				sortable
				v-if="groupRowsBy === 'category'"
			></Column>
			<Column
				field="category"
				header="Категория"
				sortable
				v-else
			></Column>
			<Column field="link" header="Ссылка на документ" sortable></Column>
			<Column header="Изменить">
				<template #body="slotProps">
					<EditDocument
						:document="slotProps.data"
						v-memo="[slotProps.data]"
					/>
				</template>
			</Column>
		</DataTable>
	</div>
	<p v-else class="text-center">
		Прикрепите нормативные документы к этому проекту для их отображения.
	</p>
	<SaveProject />
</template>
