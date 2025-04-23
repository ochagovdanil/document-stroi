<script setup lang="ts">
import type OksSubtype from '@/entities/OksSubtype';
import type OksType from '@/entities/OksType';
import { useOksSubtypes, useOksTypes } from '@/shared/api/queries';
import { MultiSelect, Select } from 'primevue';
import { computed, ref } from 'vue';

const selectedOksType = ref<OksType>();
const selectedOksSubtype = ref<OksSubtype>();

const {
	isFetching: isOksTypesFetching,
	isError: isOksTypesError,
	data: oksTypes,
} = useOksTypes(); // Типы ОКС

const oksSubtypeIds = computed(
	() => selectedOksType.value?.oks_subtype_ids ?? []
);

const {
	isFetching: isOksSubtypesFetching,
	isError: isOksSubtypesError,
	data: oksSubtypes,
} = useOksSubtypes(oksSubtypeIds); // Подтипы ОКС
</script>

<template>
	<div class="flex flex-col gap-4">
		<div>
			<p class="text-lg mb-2 font-semibold">
				Тип объекта капитального строительства
			</p>
			<div class="grid grid-cols-2 gap-4">
				<p v-if="isOksTypesFetching" class="italic">
					Загрузка типов ОКС...
				</p>
				<p v-else-if="isOksTypesError" class="text-secondary-dark">
					Возникла ошибка при загрузке типов ОКС!
				</p>
				<Select
					v-else
					placeholder="Выберите значение"
					:options="oksTypes"
					optionLabel="name"
					v-model="selectedOksType"
					checkmark
					filter
				/>

				<p v-if="isOksSubtypesFetching" class="italic">
					Загрузка подтипов ОКС...
				</p>
				<p v-else-if="isOksSubtypesError" class="text-secondary-dark">
					Возникла ошибка при загрузке подтипов ОКС!
				</p>
				<Select
					v-else
					placeholder="Выберите значение"
					:options="oksSubtypes"
					optionLabel="name"
					v-model="selectedOksSubtype"
					checkmark
					filter
					:disabled="!selectedOksType"
				/>
			</div>
		</div>
		<div>
			<p class="text-lg mb-2 font-semibold">Этап строительства</p>
			<Select placeholder="Выберите значение" class="w-full" />
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">Типы материалов</p>
				<MultiSelect placeholder="Выберите значения" class="w-full" />
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">Назначение материалов</p>
				<MultiSelect placeholder="Выберите значения" class="w-full" />
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">
					Экологические и санитарные требования
				</p>
				<MultiSelect placeholder="Выберите значения" class="w-full" />
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">
					Особые условия эксплуатации
				</p>
				<MultiSelect placeholder="Выберите значения" class="w-full" />
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">Климатическая зона</p>
				<Select placeholder="Выберите значение" class="w-full" />
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">
					Особые климатические зоны
				</p>
				<MultiSelect placeholder="Выберите значения" class="w-full" />
			</div>
		</div>
		<div>
			<p class="text-lg mb-2 font-semibold">Форма собственности</p>
			<Select placeholder="Выберите значение" class="w-full" />
		</div>
	</div>
</template>
