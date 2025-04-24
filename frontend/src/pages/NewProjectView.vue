<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Documents = defineAsyncComponent(
	() => import('@/widgets/new-project/ui/Documents.vue')
);
const Filters = defineAsyncComponent(
	() => import('@/widgets/new-project/ui/Filters.vue')
);
const NewProjectDetails = defineAsyncComponent(
	() => import('@/widgets/new-project/ui/NewProjectDetails.vue')
);
</script>

<template>
	<section class="container">
		<NewProjectDetails />
		<Filters />
		<Documents />
	</section>
</template>
