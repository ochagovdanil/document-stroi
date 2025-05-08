<script setup lang="ts">
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { Dialog } from 'primevue';
import { ref } from 'vue';

const { shareUri } = defineProps<{
	shareUri: string; // ID записи проекта в MongoDB (_id)
}>();

const isDialogVisible = ref<boolean>(false);

const toastMessage = useToastMessage();

// Копировать на чтение только
// В конце добавляем r, что значит права на чтение только
function copyReadOnly() {
	navigator.clipboard
		.writeText(`${shareUri}r`)
		.then(() => {
			toastMessage(
				'success',
				'Успешно!',
				'Ссылка на проект скопирована в буфер обмена! [чтение только]'
			);
		})
		.catch((error: any) =>
			toastMessage(
				'error',
				'Внимание!',
				`Во время копирования ссылки возникла ошибка!\n${error}`
			)
		);
}

// Копировать на чтение и редактирование
// В конце добавляем w, что значит права на чтение + редактирование
function copyReadWrite() {
	navigator.clipboard
		.writeText(`${shareUri}w`)
		.then(() => {
			toastMessage(
				'success',
				'Успешно!',
				'Ссылка на проект скопирована в буфер обмена! [чтение + редактирование]'
			);
		})
		.catch((error: any) =>
			toastMessage(
				'error',
				'Внимание!',
				`Во время копирования ссылки возникла ошибка!\n${error}`
			)
		);
}
</script>

<template>
	<button
		class="bg-blue-500 text-white rounded-full py-2 w-[32rem] text-lg mt-4 border-2 border-content shadow-md cursor-pointer hover:bg-blue-600"
		@click="() => (isDialogVisible = true)"
	>
		Поделиться проектом<i class="ml-2 pi pi-share-alt text-white"></i>
	</button>
	<!-- Диалоговое окно с ссылкой на проект -->
	<Dialog
		v-model:visible="isDialogVisible"
		modal
		header="Поделиться проектом"
		:dismissable-mask="true"
		:style="{ width: '50vw' }"
	>
		<div class="flex items-center gap-4">
			<input
				type="password"
				:value="shareUri"
				class="p-2 border-2 border-content w-[15rem]"
				:disabled="true"
			/>
			<button
				class="rounded-full text-white bg-blue-500 py-2 px-4 shadow-sm border-2 border-blue-700 cursor-pointer hover:bg-blue-600"
				title="Скопировать адрес"
				@click="copyReadOnly"
			>
				<i class="pi pi-copy mr-2"></i>Просмотр
			</button>
			<button
				class="rounded-full text-white bg-blue-500 py-2 px-4 shadow-sm border-2 border-blue-700 cursor-pointer hover:bg-blue-600"
				title="Скопировать адрес"
				@click="copyReadWrite"
			>
				<i class="pi pi-copy mr-2"></i>Редактирование
			</button>
		</div>
		<template #footer>
			<button
				class="text-primary bg-success border-2 border-primary py-1 px-6 rounded-lg cursor-pointer hover:bg-success-light"
				@click="() => (isDialogVisible = false)"
			>
				ОК
			</button>
		</template>
	</Dialog>
</template>
