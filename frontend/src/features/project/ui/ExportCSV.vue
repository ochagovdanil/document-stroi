<script setup lang="ts">
const emit = defineEmits<{
	(e: 'onExport'): void;
}>();
</script>

<template>
	<button
		class="bg-primary text-white rounded-md py-2 px-4 cursor-pointer hover:bg-content"
		@click="emit('onExport')"
	>
		Экспорт в Excel
		<i class="pi pi-external-link"></i>
	</button>
</template>
