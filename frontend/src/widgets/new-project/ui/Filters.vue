<script setup lang="ts">
import type OksSubtype from '@/entities/OksSubtype';
import type OksType from '@/entities/OksType';
import type Stage from '@/entities/Stage';
import type MaterialType from '@/entities/MaterialType';
import type MaterialUse from '@/entities/MaterialUse';
import type EcoRequirement from '@/entities/EcoRequirement';
import type SpecialCase from '@/entities/SpecialCase';
import type ClimateZone from '@/entities/ClimateZone';
import type SpecialClimateZone from '@/entities/SpecialClimateZone';
import type Invention from '@/entities/Invention';
import {
	useOksSubtypes,
	useOksTypes,
	useStages,
	useMaterialTypes,
	useMaterialUses,
	useEcoRequirements,
	useSpecialCases,
	useClimateZones,
	useSpecialClimateZones,
	useInventions,
} from '@/shared/api/queries';
import { MultiSelect, Select } from 'primevue';
import { computed, ref } from 'vue';

const selectedOksType = ref<OksType>();
const selectedOksSubtype = ref<OksSubtype>();
const selectedStage = ref<Stage>();
const selectedMaterialTypes = ref<MaterialType[]>();
const selectedMaterialUses = ref<MaterialUse[]>();
const selectedEcoRequirements = ref<EcoRequirement[]>();
const selectedSpecialCases = ref<SpecialCase[]>();
const selectedClimateZone = ref<ClimateZone>();
const selectedSpecialClimateZones = ref<SpecialClimateZone[]>();
const selectedInvention = ref<Invention>();

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
					:disabled="!selectedOksType"
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
				v-model="selectedStage"
				checkmark
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
					v-model="selectedMaterialTypes"
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
					v-model="selectedMaterialUses"
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
					v-model="selectedEcoRequirements"
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
					v-model="selectedSpecialCases"
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
					v-model="selectedClimateZone"
					checkmark
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
					v-model="selectedSpecialClimateZones"
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
				v-model="selectedInvention"
				checkmark
			/>
		</div>
	</div>
</template>
