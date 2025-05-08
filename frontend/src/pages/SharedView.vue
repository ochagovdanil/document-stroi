<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const SharedList = defineAsyncComponent(
	() => import('@/widgets/shared/ui/SharedList.vue')
);
</script>

<template>
	<section class="container">
		<SharedList />
	</section>
</template>
