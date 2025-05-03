<script setup lang="ts">
import dummy from '@/app/ui/assets/new-project-dummy.jpg';
import type Document from '@/entities/Document';
import InsertDocumentManually from '@/features/project/ui/InsertDocumentManually.vue';
import RemoveProject from '@/features/project/ui/RemoveProject.vue';
import RemoveSelectedDocuments from '@/features/project/ui/RemoveSelectedDocuments.vue';
import { useProjectByName } from '@/shared/api/queries';
import { Column, DataTable } from 'primevue';
import { ref } from 'vue';
import { useRoute, useRouter, type Router } from 'vue-router';
import EditDocument from './EditDocument.vue';
import ExportCSV from '@/features/project/ui/ExportCSV.vue';

const route = useRoute();
const router: Router = useRouter();
const projectName: string = route.params.name as string;

const { data, isFetching, isError } = useProjectByName(projectName);

const selectedDocuments = ref<Document[]>([]); // Выбранные записи в таблице
const dt = ref<InstanceType<typeof DataTable>>();
</script>

<template>
	<p
		v-if="isFetching"
		class="flex h-screen justify-center items-center text-background text-xl"
	>
		Загрузка проекта<i class="pi pi-spin pi-spinner ml-2"></i>
	</p>
	<p
		v-else-if="isError"
		class="flex h-screen justify-center items-center text-secondary-dark text-xl font-bold"
	>
		Возникла ошибка при загрузке проекта "{{ projectName }}"
	</p>
	<div v-else-if="data">
		<div class="flex justify-between items-center">
			<p
				class="text-success text-xl cursor-pointer flex items-center hover:underline"
				@click="() => router.back()"
			>
				<i class="pi pi-caret-left mr-2"></i>Вернуться назад
			</p>
			<p
				class="text-3xl text-accent font-semibold pt-8 mb-10 after:w-28 after:h-[0.2rem] after:bg-tertiary-dark after:mx-auto after:block after:mt-3"
			>
				Сведения о
				<span class="bg-secondary-dark">{{ data.name }}</span>
				<i
					class="pi pi-pencil pl-2 text-success cursor-pointer hover:text-success-light"
					style="font-size: 1.4rem"
				></i>
			</p>
		</div>
		<div class="flex justify-center gap-40 mt-8">
			<div class="h-[17rem] w-[30rem] rounded-md bg-tertiary relative">
				<img
					:src="data.image || dummy"
					class="h-[17rem] w-[30rem] rounded-md absolute right-3 top-3 shadow-xl object-cover object-center"
					alt="Изображение проекта"
					title="Изображение проекта"
				/>
				<div class="absolute right-[-2rem] top-0 flex flex-col gap-4">
					<i
						class="pi pi-pencil text-success cursor-pointer hover:text-success-light"
						style="font-size: 1.2rem"
						title="Изменить изображение"
					></i>
					<i
						class="pi pi-times text-secondary-dark cursor-pointer hover:text-secondary"
						style="font-size: 1.2rem"
						title="Удалить изображение"
						v-if="data.image"
					></i>
				</div>
			</div>
			<div>
				<p class="text-accent text-lg">
					Дата начала: {{ data.dateStart || 'не указана' }}
					<i
						class="pi pi-pencil cursor-pointer hover:text-secondary"
					></i>
				</p>
				<p class="text-accent text-lg">
					Дата окончания: {{ data.dateEnd || 'не указана' }}
					<i
						class="pi pi-pencil cursor-pointer hover:text-secondary"
					></i>
				</p>
				<RemoveProject :uid="data.userId" :projectName="data.name" />
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4 mt-8">
			<InsertDocumentManually />
			<RemoveSelectedDocuments
				:selectedDocuments
				@onRemoved="() => (selectedDocuments = [])"
			/>
		</div>
		<DataTable
			v-if="data.documents.length > 0"
			size="small"
			showGridlines
			stripedRows
			removableSort
			:value="data.documents"
			v-model:selection="selectedDocuments"
			dataKey="name"
			paginator
			:rows="15"
			:rows-per-page-options="[10, 15, 20, 25, 30, 35, 40, 45, 50]"
			sortMode="multiple"
			ref="dt"
			class="mb-8"
			:export-filename="data.name"
		>
			<template #header>
				<div class="text-end">
					<ExportCSV @onExport="() => dt?.exportCSV()" />
				</div>
			</template>
			<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
			<Column field="name" header="Название документа" sortable></Column>
			<Column field="link" header="Ссылка на документ" sortable></Column>
			<Column header="Изменить">
				<template #body> <EditDocument /> </template
			></Column>
		</DataTable>
		<p v-else class="text-accent text-md text-center mb-8">
			У этого проекта отсутствуют прикрепленные нормативные документы!
		</p>
	</div>
</template>
