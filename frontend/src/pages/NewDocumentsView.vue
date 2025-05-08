<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const List = defineAsyncComponent(
	() => import('@/widgets/new-documents/ui/List.vue')
);
</script>

<template>
	<section class="container">
		<List />
	</section>
</template>
