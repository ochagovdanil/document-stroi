<script lang="ts" setup>
import type ProjectCard from '@/entities/ProjectCard';
import dummy from '@/app/ui/assets/new-project-dummy.jpg';
import DeleteProject from '@/features/projects/ui/DeleteProject.vue';
import { useRouter, type Router } from 'vue-router';

const { project } = defineProps<{
	project: ProjectCard;
}>();

const router: Router = useRouter();
</script>

<template>
	<div
		class="bg-primary rounded-s-2xl my-10 p-4 h-[13.5rem] flex gap-10 cursor-pointer shadow-md border-tertiary border-[0.3rem] hover:bg-content"
		:title="project.name"
		@click="
			() =>
				router.push({ name: 'project', params: { name: project.name } })
		"
	>
		<img
			:src="project.image || dummy"
			alt="Изображение проекта"
			class="h-44 w-[27rem] rounded-s-lg object-center object-cover"
		/>
		<div class="flex flex-col overflow-hidden w-full mr-4">
			<p
				class="text-2xl text-secondary-dark font-bold mt-3 mb-5 max-w-full whitespace-nowrap overflow-hidden text-ellipsis after:block after:bg-success after:w-20 after:h-[0.2rem] after:mt-4"
			>
				{{ project.name }}
			</p>
			<p class="text-accent">
				Дата начала: {{ project.dateStart || 'не указана' }}
			</p>
			<p class="text-accent">
				Дата окончания: {{ project.dateEnd || 'не указана' }}
			</p>
			<p class="text-accent">
				Кол-во нормативных документов: {{ project.documents.length }}
			</p>
		</div>
		<DeleteProject :uid="project.userId" :projectName="project.name" />
	</div>
</template>
