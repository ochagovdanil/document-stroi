<script setup lang="ts">
import newProjectDummy from '@/app/ui/assets/new-project-dummy.jpg';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const toastMessage = useToastMessage();

const { details } = storeToRefs(useNewProjectDetailsStore());
const { updateImage } = useNewProjectDetailsStore();

const imageFileInput = ref<HTMLInputElement | null>(null); // Ссылка на скрытый input с type='file'
const isImageUploading = ref<boolean>(false);

// Получить preview (base64 string) для файла типа image/*
function getImagePreview(event: Event) {
	isImageUploading.value = true;

	const target = event.target as HTMLInputElement;

	if (target.files && target.files.length > 0) {
		const file = target.files[0];

		if (!file.type.startsWith('image/')) {
			toastMessage(
				'warn',
				'Внимание!',
				'Выбранный вами файл не является изображением!'
			);
			isImageUploading.value = false;
			return;
		}

		const reader = new FileReader();

		reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
			const image: HTMLImageElement = new Image();
			image.src = readerEvent.target?.result as string;

			image.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				canvas.width = image.width;
				canvas.height = image.height;

				ctx?.drawImage(image, 0, 0, image.width, image.height);

				updateImage(canvas.toDataURL('image/png'));
				isImageUploading.value = false;
			};

			image.onerror = error => {
				toastMessage(
					'error',
					'Ошибка!',
					`Не удалось загрузить изображение:\n${error}`
				);
				isImageUploading.value = false;
			};
		};

		reader.onerror = error => {
			toastMessage(
				'error',
				'Ошибка!',
				`Не удалось прочитать файл:\n${error}`
			);
			isImageUploading.value = false;
		};

		reader.readAsDataURL(file);
	} else {
		isImageUploading.value = false; // Файл не выбран
	}
}
</script>

<template>
	<div class="h-[15rem] w-[25rem] my-8 mr-10 rounded-md bg-tertiary relative">
		<img
			:src="details.image || newProjectDummy"
			class="h-[15rem] w-[25rem] rounded-md absolute right-3 top-3 shadow-md object-cover object-center"
			alt="Изображение проекта"
			title="Изображение проекта"
		/>
		<input
			type="file"
			ref="imageFileInput"
			accept="image/*"
			style="display: none"
			@change="getImagePreview"
		/>
		<i
			v-if="!isImageUploading"
			class="pi pi-pencil absolute right-[-2rem] cursor-pointer hover:text-secondary"
			style="font-size: 1.2rem"
			title="Изменить"
			@click="() => imageFileInput?.click()"
		></i>
		<i
			v-else
			class="pi pi-spinner pi-spin absolute right-[-2rem] hover:text-secondary"
			style="font-size: 1.2rem"
		></i>
	</div>
</template>
