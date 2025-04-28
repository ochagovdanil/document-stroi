<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ProjectsList = defineAsyncComponent(
	() => import('@/widgets/projects/ui/ProjectsList.vue')
);
</script>

<template>
	<section class="container">
		<ProjectsList />
	</section>
</template>
