<script setup lang="ts">
import type SearchParams from '@/entities/SearchParams';
import { computed, ref } from 'vue';

const emit = defineEmits<{
	(e: 'onSearch', params: SearchParams): SearchParams;
}>();

const searchParams = ref<SearchParams>({
	searchField: '',
	dateStart: '',
	dateEnd: '',
});

const shouldClearDateStart = computed(
	() => searchParams.value.dateStart !== ''
);
const shouldClearDateEnd = computed(() => searchParams.value.dateEnd !== '');

function clearSearchParams() {
	Object.assign(searchParams.value, {
		searchField: '',
		dateStart: '',
		dateEnd: '',
	});

	emit('onSearch', searchParams.value);
}
</script>

<template>
	<div class="flex items-center rounded-2xl overflow-hidden shadow-md">
		<i
			class="block pi pi-search py-[1.25rem] px-6 bg-background text-content cursor-pointer border-e-2 border-2-tertiary hover:bg-gray-100"
			style="font-size: 1rem"
			@click="emit('onSearch', searchParams)"
		></i>
		<input
			type="search"
			placeholder="Введите название проекта"
			class="w-full py-3 px-4 bg-background text-lg text-primary outline-none border-background border-2 hover:border-content focus:border-content"
			v-model="searchParams.searchField"
		/>
		<div
			class="bg-background px-4 h-[3.5rem] border-s-2 border-e-2 border-tertiary"
		>
			<div class="h-full flex items-center gap-2">
				<div class="h-full flex flex-col justify-center">
					<p class="text-sm">Дата начала:</p>
					<input
						type="date"
						v-model="searchParams.dateStart"
						class="outline-none"
					/>
				</div>
				<i
					v-if="shouldClearDateStart"
					class="pi pi-times rounded-full bg-secondary-dark text-white p-1 cursor-pointer"
					style="font-size: 0.5rem"
					@click="searchParams.dateStart = ''"
				></i>
			</div>
		</div>
		<div class="bg-background px-4 h-[3.5rem]">
			<div class="h-full flex items-center gap-2">
				<div class="h-full flex flex-col justify-center">
					<p class="text-sm">Дата окончания:</p>
					<input
						type="date"
						v-model="searchParams.dateEnd"
						class="outline-none"
					/>
				</div>
				<i
					v-if="shouldClearDateEnd"
					class="pi pi-times rounded-full bg-secondary-dark text-white p-1 cursor-pointer"
					style="font-size: 0.5rem"
					@click="searchParams.dateEnd = ''"
				></i>
			</div>
		</div>
		<button
			class="text-background bg-secondary-dark h-[3.5rem] px-6 border-2 border-content rounded-e-2xl cursor-pointer hover:bg-secondary"
			@click="clearSearchParams"
		>
			<i class="pi pi-times"></i>
		</button>
	</div>
</template>
