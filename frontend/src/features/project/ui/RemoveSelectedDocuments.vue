<script setup lang="ts">
function removeSelectedItems() {}
</script>

<template>
	<button
		class="w-full my-8 font-semibold bg-secondary py-3 border-2 border-content rounded-full shadow-md hover:bg-tertiary hover:text-secondary"
		@click="removeSelectedItems"
	>
		<i class="pi pi-trash mr-2"></i>
		Удалить выбранные документы
	</button>
</template>
