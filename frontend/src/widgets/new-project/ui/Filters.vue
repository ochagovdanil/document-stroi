<script setup lang="ts">
import type EcoRequirement from '@/entities/EcoRequirement';
import type MaterialType from '@/entities/MaterialType';
import type MaterialUse from '@/entities/MaterialUse';
import type OksType from '@/entities/OksType';
import type SpecialCase from '@/entities/SpecialCase';
import type SpecialClimateZone from '@/entities/SpecialClimateZone';
import {
	useClimateZones,
	useEcoRequirements,
	useInventions,
	useMaterialTypes,
	useMaterialUses,
	useOksSubtypes,
	useOksTypes,
	useSpecialCases,
	useSpecialClimateZones,
	useStages,
} from '@/shared/api/queries';
import { useNewProjectFilterIdsStore } from '@/shared/model/store/NewProjectFilterIds';
import { MultiSelect, Select } from 'primevue';
import { computed, ref, watch } from 'vue';

const {
	updateOksSubtypeIds,
	updateStageIds,
	updateMaterialTypeIds,
	updateMaterialUseIds,
	updateEcoRequirementIds,
	updateSpecialUseIds,
	updateClimateZoneIds,
	updateSpecialClimateZoneIds,
	updateInventionIds,
} = useNewProjectFilterIdsStore(); // Хранит ids нормативных документов, которые необходимо занести в таблицу на основе выбранных пользователем фильтров

const selectedOksType = ref<OksType>(); // На основе выбранного типа ОКС будет определен следующий подтип ОКС

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

const {
	isFetching: isStagesFetching,
	isError: isStagesError,
	data: stagesData,
} = useStages(); // Этапы строительства

const {
	isFetching: isMaterialTypesFetching,
	isError: isMaterialTypesError,
	data: materialTypes,
} = useMaterialTypes(); // Типы материалов

const {
	isFetching: isMaterialUsesFetching,
	isError: isMaterialUsesError,
	data: materialUses,
} = useMaterialUses(); // Назначения материалов

const {
	isFetching: isEcoRequirementsFetching,
	isError: isEcoRequirementsError,
	data: ecoRequirements,
} = useEcoRequirements(); // Экологические и санитарные требования

const {
	isFetching: isSpecialCasesFetching,
	isError: isSpecialCasesError,
	data: specialCases,
} = useSpecialCases(); // Особые условия эксплуатации

const {
	isFetching: isClimateZonesFetching,
	isError: isClimateZonesError,
	data: climateZones,
} = useClimateZones(); // Климатические зоны

const {
	isFetching: isSpecialClimateZonesFetching,
	isError: isSpecialClimateZonesError,
	data: specialClimateZones,
} = useSpecialClimateZones(); // Особые климатические зоны

const {
	isFetching: isInventionsFetching,
	isError: isInventionsError,
	data: inventions,
} = useInventions(); // Формы собственности

// Если фильтр типа ОКС был очищен, то очищаем значение в подтипе ОКС тоже
watch(selectedOksType, val => {
	if (!val) updateOksSubtypeIds(null);
});
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
					showClear
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
					checkmark
					showClear
					:disabled="!selectedOksType"
					@value-change="
						val => updateOksSubtypeIds(val?.document_ids)
					"
				/>
			</div>
		</div>
		<div>
			<p class="text-lg mb-2 font-semibold">Этап строительства</p>
			<p v-if="isStagesFetching" class="italic">
				Загрузка этапов строительства...
			</p>
			<p v-else-if="isStagesError" class="text-secondary-dark">
				Возникла ошибка при загрузке этапов строительства!
			</p>
			<Select
				v-else
				placeholder="Выберите значение"
				class="w-full"
				:options="stagesData"
				optionLabel="name"
				checkmark
				showClear
				@value-change="val => updateStageIds(val?.document_ids)"
			/>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">Типы материалов</p>
				<p v-if="isMaterialTypesFetching" class="italic">
					Загрузка типов материалов...
				</p>
				<p v-else-if="isMaterialTypesError" class="text-secondary-dark">
					Возникла ошибка при загрузке типов материалов!
				</p>
				<MultiSelect
					v-else
					placeholder="Выберите значение"
					class="w-full"
					:options="materialTypes"
					optionLabel="name"
					showClear
					@value-change="
						val => updateMaterialTypeIds(val?.map((item: MaterialType) => item?.document_ids))
					"
				/>
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">Назначение материалов</p>
				<p v-if="isMaterialUsesFetching" class="italic">
					Загрузка назначения материалов...
				</p>
				<p v-else-if="isMaterialUsesError" class="text-secondary-dark">
					Возникла ошибка при загрузке назначения материалов!
				</p>
				<MultiSelect
					v-else
					placeholder="Выберите значение"
					class="w-full"
					:options="materialUses"
					optionLabel="name"
					showClear
					@value-change="
						val => updateMaterialUseIds(val?.map((item: MaterialUse) => item?.document_ids))
					"
				/>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">
					Экологические и санитарные требования
				</p>
				<p v-if="isEcoRequirementsFetching" class="italic">
					Загрузка экологических и санитарных требований...
				</p>
				<p
					v-else-if="isEcoRequirementsError"
					class="text-secondary-dark"
				>
					Возникла ошибка при загрузке экологических и санитарных
					требований!
				</p>
				<MultiSelect
					v-else
					placeholder="Выберите значение"
					class="w-full"
					:options="ecoRequirements"
					optionLabel="name"
					showClear
					@value-change="
						val => updateEcoRequirementIds(val?.map((item: EcoRequirement) => item?.document_ids))
					"
				/>
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">
					Особые условия эксплуатации
				</p>
				<p v-if="isSpecialCasesFetching" class="italic">
					Загрузка особых условий эксплуатации...
				</p>
				<p v-else-if="isSpecialCasesError" class="text-secondary-dark">
					Возникла ошибка при загрузке особых условий эксплуатации!
				</p>
				<MultiSelect
					v-else
					placeholder="Выберите значение"
					class="w-full"
					:options="specialCases"
					optionLabel="name"
					showClear
					@value-change="
						val => updateSpecialUseIds(val?.map((item: SpecialCase) => item?.document_ids))
					"
				/>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<p class="text-lg mb-2 font-semibold">Климатическая зона</p>
				<p v-if="isClimateZonesFetching" class="italic">
					Загрузка климатических зон...
				</p>
				<p v-else-if="isClimateZonesError" class="text-secondary-dark">
					Возникла ошибка при загрузке климатических зон!
				</p>
				<Select
					v-else
					placeholder="Выберите значение"
					class="w-full"
					:options="climateZones"
					optionLabel="name"
					checkmark
					showClear
					@value-change="
						val => updateClimateZoneIds(val?.document_ids)
					"
				/>
			</div>
			<div>
				<p class="text-lg mb-2 font-semibold">
					Особые климатические зоны
				</p>
				<p v-if="isSpecialClimateZonesFetching" class="italic">
					Загрузка особых климатических зон...
				</p>
				<p
					v-else-if="isSpecialClimateZonesError"
					class="text-secondary-dark"
				>
					Возникла ошибка при загрузке особых климатических зон!
				</p>
				<MultiSelect
					v-else
					placeholder="Выберите значение"
					class="w-full"
					:options="specialClimateZones"
					optionLabel="name"
					showClear
					@value-change="
						val => updateSpecialClimateZoneIds(val?.map((item: SpecialClimateZone) => item?.document_ids))
					"
				/>
			</div>
		</div>
		<div>
			<p class="text-lg mb-2 font-semibold">Форма собственности</p>
			<p v-if="isInventionsFetching" class="italic">
				Загрузка форм собственности...
			</p>
			<p v-else-if="isInventionsError" class="text-secondary-dark">
				Возникла ошибка при загрузке форм собственности!
			</p>
			<Select
				v-else
				placeholder="Выберите значение"
				class="w-full"
				:options="inventions"
				optionLabel="name"
				checkmark
				showClear
				@value-change="val => updateInventionIds(val?.document_ids)"
			/>
		</div>
	</div>
</template>
