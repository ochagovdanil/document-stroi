<script setup lang="ts">
import { useProjectsByUid } from '@/shared/api/queries';
import { getAuth, type User } from 'firebase/auth';
import empty from '@/app/ui/assets/empty.png';
import ProjectCard from './ProjectCard.vue';

const currentUser: User = getAuth().currentUser!;
const { data, isFetching, isError } = useProjectsByUid(currentUser.uid);
</script>

<template>
	<div v-if="data">
		<div v-if="data.length === 0" class="mt-32">
			<img
				:src="empty"
				alt="no-projects"
				title="Проектов нет"
				class="block mx-auto w-[22rem]"
			/>
			<p class="text-center text-xl text-secondary mt-7">
				У вас нет активных проектов.
			</p>
		</div>
		<div v-else-if="data.length > 0">
			<p
				class="text-3xl font-semibold mt-5 mb-10 text-center after:w-32 after:h-[0.2rem] after:bg-secondary after:mx-auto after:block after:mt-3"
			>
				Список текущих <span class="bg-tertiary">проектов</span>
			</p>
			<ProjectCard
				v-for="project in data"
				:project
				:key="project.userId"
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
