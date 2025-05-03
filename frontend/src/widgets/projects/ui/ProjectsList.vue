<script setup lang="ts">
import { useProjectsByParams } from '@/shared/api/queries';
import { getAuth, type User } from 'firebase/auth';
import empty from '@/app/ui/assets/empty.png';
import ProjectCard from './ProjectCard.vue';
import SearchBox from '../../../features/projects/ui/SearchBox.vue';
import type SearchParams from '@/entities/SearchParams';
import { ref } from 'vue';

const currentUser: User = getAuth().currentUser!;
const searchParams = ref<SearchParams>({
	searchField: '',
	dateStart: '',
	dateEnd: '',
}); // Текущие поисковые фильтры для запроса в БД

const { data, isFetching, isError } = useProjectsByParams(
	currentUser.uid,
	searchParams.value
);

// После задания поисковых параметров в <SearchBox /> обновляем их для запроса в БД
function updateSearchParams(params: SearchParams) {
	Object.assign(searchParams.value, params);
}
</script>

<template>
	<p
		class="text-3xl font-semibold mt-5 mb-10 text-center after:w-32 after:h-[0.2rem] after:bg-secondary after:mx-auto after:block after:mt-3"
	>
		Список текущих <span class="bg-tertiary">проектов</span>
	</p>
	<SearchBox @on-search="updateSearchParams" />
	<div v-if="data">
		<div v-if="data.length === 0" class="mt-24">
			<img
				:src="empty"
				alt="no-projects"
				title="Проектов не найдено"
				class="block mx-auto w-[22rem]"
			/>
			<p class="text-center text-xl text-primary mt-7">
				Проектов не найдено.
			</p>
		</div>
		<div v-else-if="data.length > 0">
			<ProjectCard
				v-for="project in data"
				:project
				:key="project.name"
				v-memo="[project]"
			/>
		</div>
	</div>
	<p v-else-if="isFetching" class="text-center mt-12 text-xl italic">
		Загрузка <i class="pi pi-spin pi-spinner"></i>
	</p>
	<p
		v-else-if="isError"
		class="text-center mt-12 text-2xl font-bold text-red-700"
	>
		Возникла ошибка при загрузке данных!
	</p>
</template>
