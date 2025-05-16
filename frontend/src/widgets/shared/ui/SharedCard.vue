<script lang="ts" setup>
import dummy from '@/app/ui/assets/new-project-dummy.jpg';
import type SharedProjectCard from '@/entities/SharedProjectCard';
import DeleteProject from '@/features/shared/ui/DeleteProject.vue';
import { useRouter, type Router } from 'vue-router';

const { project } = defineProps<{
	project: SharedProjectCard;
}>();

const router: Router = useRouter();
</script>

<template>
	<div
		class="relative bg-primary rounded-s-2xl my-10 p-4 h-[13.5rem] flex gap-10 cursor-pointer shadow-md border-tertiary border-[0.3rem] hover:bg-content"
		:title="project.name"
		@click="
			() =>
				router.push({
					name: 'shared-current',
					params: { name: project.name },
				})
		"
	>
		<img
			:src="project.image || dummy"
			alt="Изображение проекта"
			class="h-44 w-[27rem] rounded-s-lg object-center object-cover"
		/>
		<div class="flex flex-col overflow-hidden w-full mr-4">
			<p
				class="text-2xl text-secondary-dark font-bold mt-3 mb-1 max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
			>
				{{ project.name }}
			</p>
			<p
				class="text-success mb-4"
				:title="`${
					project.access === 'w'
						? 'Просмотр и редактирование'
						: 'Просмотр только'
				}`"
			>
				Права на проект:
				<i class="pi pi-book" style="font-size: 0.9rem"
					><i
						v-if="project.access === 'w'"
						class="pi pi-plus mx-2"
						style="font-size: 0.9rem"
					></i></i
				><i
					class="pi pi-pencil"
					v-if="project.access === 'w'"
					style="font-size: 0.9rem"
				></i>
			</p>
			<p class="text-accent info">
				Дата начала: {{ project.dateStart || 'не указана' }}
			</p>
			<p class="text-accent info">
				Дата окончания: {{ project.dateEnd || 'не указана' }}
			</p>
			<p class="text-accent info">
				Кол-во нормативных документов: {{ project.documents.length }}
			</p>
		</div>
		<DeleteProject :uid="project.userId" :projectName="project.name" />
		<i
			class="pi pi-users absolute top-3 right-3 text-success"
			style="font-size: 1.4rem"
		></i>
	</div>
</template>

<style scoped>
@media (max-width: 48.125em) {
	.pi-users,
	.info {
		display: none;
	}
}
</style>
