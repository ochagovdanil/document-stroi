<script setup lang="ts">
import Navbar from '@/widgets/navbar/ui/Navbar.vue';
import Toast from 'primevue/toast';
</script>

<template>
	<div class="flex flex-col h-full">
		<Navbar />
		<div class="bg-background flex-1">
			<RouterView />
		</div>
	</div>
	<Toast />
</template>
