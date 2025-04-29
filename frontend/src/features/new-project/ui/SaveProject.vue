<script setup lang="ts">
import { useSaveProject } from '@/shared/api/mutations';
import useToastMessage from '@/shared/model/composables/useToastMessage';
import { useNewProjectDetailsStore } from '@/shared/model/store/NewProjectDetails';
import { useNewProjectFilterIdsStore } from '@/shared/model/store/NewProjectFilterIds';
import { getAuth, type User } from 'firebase/auth';
import { storeToRefs } from 'pinia';
import { useRouter, type Router } from 'vue-router';

const { details } = storeToRefs(useNewProjectDetailsStore());
const { clearState: clearProjectDetailsState } = useNewProjectDetailsStore();
const { clearState: clearFiltersState } = useNewProjectFilterIdsStore();

const { isPending, mutateAsync } = useSaveProject();

const toastMessage = useToastMessage();
const router: Router = useRouter();

const currentUser: User = getAuth().currentUser!;

async function handleClick() {
	if (!details.value.name)
		toastMessage('warn', 'Внимание!', 'Заполните название проекта!');
	else {
		// Делаем запрос на сохранение проекта (+запрос проверит если проект с таким именем уже существует у этого пользователя)
		try {
			const projectDetailsToSave = { ...details.value };
			await mutateAsync({
				userId: currentUser.uid,
				project: projectDetailsToSave,
			});

			clearProjectDetailsState();
			clearFiltersState();

			router.push({ name: 'projects' });

			toastMessage(
				'success',
				`Проект "${projectDetailsToSave.name}" был успешно сохранен!`,
				''
			);
		} catch (error: any) {
			if (error?.response?.data?.error) {
				toastMessage(
					'error',
					'Возникла ошибка при сохранении проекта!',
					error.response.data.error
				);
			} else
				toastMessage(
					'error',
					'Возникла ошибка при сохранении проекта!',
					error.message
				);
		}
	}
}
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-success-light py-3 border-2 border-content rounded-full shadow-md hover:bg-success"
		@click="handleClick"
	>
		<i class="pi pi-spinner pi-spin mr-2" v-if="isPending"></i>
		<i class="pi pi-check mr-2" v-else></i>
		Сохранить проект
	</button>
</template>
