<template>
	<button
		class="bg-success text-primary font-bold rounded-md py-2 px-32 text-lg mt-6 border-2 border-content shadow-md cursor-pointer hover:bg-success-light hover:text-content"
		@click="handleClick"
	>
		<i
			v-if="false"
			class="pi pi-spin pi-spinner text-primary"
			style="font-weight: bold"
		></i>
		<i v-else class="pi pi-save text-primary" style="font-weight: bold"></i>
		Сохранить изменения
	</button>
</template>
