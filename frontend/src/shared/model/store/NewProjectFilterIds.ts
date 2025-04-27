import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Хранит ids нормативных документов, которые необходимо занести в таблицу на основе выбранных пользователем фильтров
export const useNewProjectFilterIdsStore = defineStore(
	'new-project-filter-ids',
	() => {
		const oksSubtypeIds = ref<number[]>([]);
		const stageIds = ref<number[]>([]);
		const materialTypeIds = ref<number[]>([]);
		const materialUseIds = ref<number[]>([]);
		const ecoRequirementIds = ref<number[]>([]);
		const specialUseIds = ref<number[]>([]);
		const climateZoneIds = ref<number[]>([]);
		const specialClimateZoneIds = ref<number[]>([]);
		const inventionIds = ref<number[]>([]);

		const uniqueDocumentIds = computed(() => {
			const ids: number[] = [];

			// Добавляем массивы ID
			ids.push(
				...oksSubtypeIds.value,
				...stageIds.value,
				...materialTypeIds.value,
				...materialUseIds.value,
				...ecoRequirementIds.value,
				...specialUseIds.value,
				...climateZoneIds.value,
				...specialClimateZoneIds.value,
				...inventionIds.value
			);

			// Возвращаем уникальные значения
			return Array.from(new Set(ids));
		}); // Этот массив ИД документов будет в дальнейшем совершать запрос на выдачу нормативных документов для подставления в таблицу юзеру

		function updateOksSubtypeIds(newIds: number[] | null) {
			oksSubtypeIds.value = newIds ?? [];
		}

		function updateStageIds(newIds: number[] | null) {
			stageIds.value = newIds ?? [];
		}

		function updateMaterialTypeIds(newIds: number[][] | null) {
			const oneDimensionArray: number[] = [];

			if (newIds) for (let arr of newIds) oneDimensionArray.push(...arr);

			materialTypeIds.value = oneDimensionArray;
		}

		function updateMaterialUseIds(newIds: number[][] | null) {
			const oneDimensionArray: number[] = [];

			if (newIds) for (let arr of newIds) oneDimensionArray.push(...arr);

			materialUseIds.value = oneDimensionArray;
		}

		function updateEcoRequirementIds(newIds: number[][] | null) {
			const oneDimensionArray: number[] = [];

			if (newIds) for (let arr of newIds) oneDimensionArray.push(...arr);

			ecoRequirementIds.value = oneDimensionArray;
		}

		function updateSpecialUseIds(newIds: number[][] | null) {
			const oneDimensionArray: number[] = [];

			if (newIds) for (let arr of newIds) oneDimensionArray.push(...arr);

			specialUseIds.value = oneDimensionArray;
		}

		function updateClimateZoneIds(newIds: number[] | null) {
			climateZoneIds.value = newIds ?? [];
		}

		function updateSpecialClimateZoneIds(newIds: number[][] | null) {
			const oneDimensionArray: number[] = [];

			if (newIds) for (let arr of newIds) oneDimensionArray.push(...arr);

			specialClimateZoneIds.value = oneDimensionArray;
		}

		function updateInventionIds(newIds: number[] | null) {
			inventionIds.value = newIds ?? [];
		}

		function clearState() {
			oksSubtypeIds.value = [];
			stageIds.value = [];
			materialTypeIds.value = [];
			materialUseIds.value = [];
			ecoRequirementIds.value = [];
			specialUseIds.value = [];
			climateZoneIds.value = [];
			specialClimateZoneIds.value = [];
			inventionIds.value = [];
		}

		return {
			oksSubtypeIds,
			stageIds,
			materialTypeIds,
			materialUseIds,
			ecoRequirementIds,
			specialUseIds,
			climateZoneIds,
			specialClimateZoneIds,
			inventionIds,

			uniqueDocumentIds,

			updateOksSubtypeIds,
			updateStageIds,
			updateMaterialTypeIds,
			updateMaterialUseIds,
			updateEcoRequirementIds,
			updateSpecialUseIds,
			updateClimateZoneIds,
			updateSpecialClimateZoneIds,
			updateInventionIds,
			clearState,
		};
	}
);
