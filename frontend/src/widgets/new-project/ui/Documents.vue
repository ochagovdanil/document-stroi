<script setup lang="ts">
import { Column, DataTable, Dialog } from 'primevue';
import { ref } from 'vue';

const isDialogVisible = ref<boolean>(false);
</script>

<template>
	<div class="grid grid-cols-3 gap-4">
		<button
			class="w-full my-8 font-semibold bg-tertiary-light py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary-dark"
		>
			<i class="pi pi-sparkles mr-2"></i>
			Загрузить рекомендуемые документы
		</button>
		<button
			class="w-full my-8 font-semibold bg-primary text-accent py-3 border-2 border-content rounded-full shadow-md hover:bg-accent hover:text-primary"
			@click="isDialogVisible = true"
		>
			<i class="pi pi-plus mr-2"></i>
			Добавить документ вручную
		</button>
		<button
			class="w-full my-8 font-semibold bg-secondary py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary hover:text-secondary"
		>
			<i class="pi pi-trash mr-2"></i>
			Удалить выбранные документы
		</button>
	</div>
	<p class="text-xl text-center mb-4">
		Список нормативных документов для нового проекта:
	</p>
	<DataTable
		size="small"
		showGridlines
		stripedRows
		removableSort
		:value="[
			{
				id: 1,
				name: 'СНиП 1.01.01-82* Система нормативных документов в строительстве. Основные положения',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 2,
				name: 'СНиП 11-04-2003 Инструкция о порядке разработки, согласования, экспертизы и утверждения градостроительной документации',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 3,
				name: 'СНиП 1.01.01-82* Система нормативных документов в строительстве. Основные положения',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 4,
				name: 'СНиП 11-04-2003 Инструкция о порядке разработки, согласования, экспертизы и утверждения градостроительной документации',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 1,
				name: 'СНиП 1.01.01-82* Система нормативных документов в строительстве. Основные положения',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 2,
				name: 'СНиП 11-04-2003 Инструкция о порядке разработки, согласования, экспертизы и утверждения градостроительной документации',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 3,
				name: 'СНиП 1.01.01-82* Система нормативных документов в строительстве. Основные положения',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 4,
				name: 'СНиП 11-04-2003 Инструкция о порядке разработки, согласования, экспертизы и утверждения градостроительной документации',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 1,
				name: 'СНиП 1.01.01-82* Система нормативных документов в строительстве. Основные положения',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 2,
				name: 'СНиП 11-04-2003 Инструкция о порядке разработки, согласования, экспертизы и утверждения градостроительной документации',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 3,
				name: 'СНиП 1.01.01-82* Система нормативных документов в строительстве. Основные положения',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
			{
				id: 4,
				name: 'СНиП 11-04-2003 Инструкция о порядке разработки, согласования, экспертизы и утверждения градостроительной документации',
				link: 'https://www.vashdom.ru/snip/1.01.01-82/',
			},
		]"
	>
		<Column
			selectionMode="multiple"
			dataKey="id"
			headerStyle="width: 3rem"
		></Column>
		<Column field="name" header="Название документа" sortable></Column>
		<Column field="link" header="Ссылка на документ"></Column>
	</DataTable>
	<button
		class="w-full my-8 font-semibold bg-success-light py-3 border-2 border-content rounded-full shadow-md hover:bg-success"
	>
		<i class="pi pi-check mr-2"></i>
		Сохранить проект
	</button>
	<!-- Modal dialog that creates a new document -->
	<Dialog
		v-model:visible="isDialogVisible"
		modal
		header="Добавить новый нормативный документ"
		:dismissableMask="true"
	>
		<div>
			<span class="mr-4">Название документа:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
			/>
		</div>
		<div class="mt-4">
			<span class="mr-4">Ссылка на документ:</span>
			<input
				type="text"
				placeholder="Введите значение"
				class="border-2 border-content rounded-md py-2 px-3 w-[40rem]"
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
			>
				Добавить
			</button>
		</template>
	</Dialog>
</template>
