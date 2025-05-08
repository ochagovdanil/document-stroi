<script setup lang="ts">
import { useSaveSharedProject } from '@/shared/api/mutations';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { Dialog } from 'primevue';
import { ref } from 'vue';

const { uid } = defineProps<{
	uid: string;
}>();

const isDialogVisible = ref<boolean>(false);
const sharedUri = ref<string>(''); // Ссылка для добавления доступного мне проекта

const toastMessage = useToastMessage();

const { mutateAsync, isPending } = useSaveSharedProject();

// Добавить проект
async function handleClick() {
	if (sharedUri.value === '') {
		toastMessage('warn', 'Внимание!', 'Заполните поле!');
		return;
	}

	// Последний символ адреса проекта должен содержать символ на access right
	if (!['r', 'w'].includes(sharedUri.value[sharedUri.value.length - 1])) {
		toastMessage('warn', 'Внимание!', 'Ваша ссылка не валидна!');
		return;
	}

	// Делаем запрос на добавление к себе нового доступного проекта
	try {
		await mutateAsync({ userId: uid, sharedUri: sharedUri.value });

		sharedUri.value = '';
		isDialogVisible.value = false;

		toastMessage(
			'success',
			'Успешно!',
			'Доступный мне проект был успешно добавлен!'
		);
	} catch (error: any) {
		toastMessage(
			'error',
			'Ошибка!',
			`Возникла ошибка при добавлении доступного мне проекта:\n${error.response.data.error}`
		);
	}
}
</script>

<template>
	<div class="text-center">
		<i
			class="pi pi-plus-circle my-6 cursor-pointer hover:text-secondary"
			style="font-size: 1.2rem"
			title="Добавить проект"
			@click="() => (isDialogVisible = true)"
		></i>
	</div>
	<!-- Диалоговое окно добавления доступного мне проекта -->
	<Dialog
		header="Добавить доступный мне проект"
		v-model:visible="isDialogVisible"
		:style="{ width: '50vw' }"
		:dismissable-mask="true"
		modal
	>
		<input
			type="password"
			v-model="sharedUri"
			class="p-2 border-2 border-content w-[30vw]"
			placeholder="Введите адрес проекта"
		/>
		<template #footer>
			<button
				class="py-1 px-4 rounded-md border-2 border-content shadow-sm cursor-pointer bg-success hover:bg-success-light"
				@click="handleClick"
			>
				<i class="pi pi-spinner pi-spin" v-if="isPending"></i>
				Добавить
			</button>
			<button
				class="py-1 px-4 rounded-md border-2 border-content shadow-sm cursor-pointer bg-secondary hover:bg-secondary-dark"
				@click="() => (isDialogVisible = false)"
			>
				Отмена
			</button>
		</template>
	</Dialog>
</template>
