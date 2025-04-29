<script setup lang="ts">
import { useProjectByName } from '@/shared/api/queries';
import { useRoute, useRouter, type Router } from 'vue-router';
import dummy from '@/app/ui/assets/new-project-dummy.jpg';
import RemoveProject from '@/features/project/RemoveProject.vue';

const route = useRoute();
const router: Router = useRouter();
const projectName: string = route.params.name as string;

const { data, isFetching, isError } = useProjectByName(projectName);
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
			</p>
		</div>
		<div class="flex justify-center gap-40 mt-10">
			<div class="h-[22rem] w-[35rem] rounded-md bg-tertiary relative">
				<img
					:src="data.image || dummy"
					class="h-[22rem] w-[35rem] rounded-md absolute right-3 top-3 shadow-xl object-cover object-center"
					alt="Изображение проекта"
					title="Изображение проекта"
				/>
			</div>
			<div>
				<p class="text-accent text-lg">
					Дата начала: {{ data.dateStart || 'N/A' }}
				</p>
				<p class="text-accent text-lg">
					Дата окончания: {{ data.dateEnd || 'N/A' }}
				</p>
				<RemoveProject :uid="data.userId" :projectName="data.name" />
			</div>
		</div>
	</div>
</template>
