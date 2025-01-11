<script setup lang="ts">
import Navbar from '@/widgets/navbar/ui/Navbar.vue';
import { ConfirmDialog } from 'primevue';
import Toast from 'primevue/toast';
</script>

<template>
	<div class="flex flex-col h-full">
		<Navbar />
		<div class="bg-accent flex-1">
			<RouterView />
		</div>
	</div>
	<Toast />
	<ConfirmDialog />
</template>
