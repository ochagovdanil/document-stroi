<script setup lang="ts">
import newProjectDummy from '@/app/ui/assets/new-project-dummy.jpg';
import { Column, DataTable, Dialog, MultiSelect, Select } from 'primevue';
import { ref } from 'vue';

const isDialogVisible = ref<boolean>(false);
</script>

<template>
	<section class="container">
		<p
			class="text-3xl font-semibold mt-5 after:w-32 after:h-[0.2rem] after:bg-secondary after:ml-10 after:block after:mt-3"
		>
			Создание нового <span class="bg-tertiary">проекта</span>
		</p>
		<div class="flex justify-between gap-3 items-center">
			<div>
				<input
					type="text"
					placeholder="Название проекта"
					class="w-[50rem] py-2 px-4 text-primary font-bold text-2xl placeholder-silver mx-auto block border-b-2 border-primary bg-transparent focus:border-secondary hover:border-secondary outline-none"
				/>
				<div class="mt-10 text-lg">
					<span class="mr-8">Дата начала:</span>
					<input type="date" class="bg-transparent" />
				</div>
				<div class="mt-4 text-lg">
					<span class="mr-8">Дата окончания:</span>
					<input type="date" class="bg-transparent" />
				</div>
			</div>
			<div
				class="h-[15rem] w-[25rem] my-8 mr-10 rounded-md bg-tertiary relative"
			>
				<img
					:src="newProjectDummy"
					class="h-[15rem] w-[25rem] rounded-md absolute right-3 top-3 shadow-md object-cover object-center"
					alt="Изображение проекта"
					title="Изображение проекта"
				/>
				<i
					class="pi pi-pencil absolute right-[-2rem] cursor-pointer hover:text-secondary"
					style="font-size: 1.2rem"
					title="Изменить"
				></i>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">
					Тип объекта капитального строительства
				</p>
				<div class="grid grid-cols-2 gap-4">
					<Select placeholder="Выберите значение" />
					<Select placeholder="Выберите значение" :disabled="true" />
				</div>
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">Этап строительства</p>
				<Select placeholder="Выберите значение" class="w-full" />
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-lg mb-2 font-semibold">Типы материалов</p>
					<MultiSelect
						placeholder="Выберите значения"
						class="w-full"
					/>
				</div>
				<div>
					<p class="text-lg mb-2 font-semibold">
						Назначение материалов
					</p>
					<MultiSelect
						placeholder="Выберите значения"
						class="w-full"
					/>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-lg mb-2 font-semibold">
						Экологические и санитарные требования
					</p>
					<MultiSelect
						placeholder="Выберите значения"
						class="w-full"
					/>
				</div>
				<div>
					<p class="text-lg mb-2 font-semibold">
						Особые условия эксплуатации
					</p>
					<MultiSelect
						placeholder="Выберите значения"
						class="w-full"
					/>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<p class="text-lg mb-2 font-semibold">Климатическая зона</p>
					<Select placeholder="Выберите значение" class="w-full" />
				</div>
				<div>
					<p class="text-lg mb-2 font-semibold">
						Особые климатические зоны
					</p>
					<MultiSelect
						placeholder="Выберите значения"
						class="w-full"
					/>
				</div>
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">Форма собственности</p>
				<Select placeholder="Выберите значение" class="w-full" />
			</div>
		</div>
		<button
			class="w-full mt-8 font-semibold bg-tertiary-light py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary-dark"
		>
			<i class="pi pi-sparkles mr-2"></i>
			Загрузить релевантные нормативные документы
		</button>
		<div class="grid grid-cols-2 gap-4">
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
	</section>
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
