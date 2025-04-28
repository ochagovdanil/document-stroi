import { useMutation, useQuery } from '@tanstack/vue-query';
import {
	getClimateZones,
	getDocumentsByIds,
	getEcoRequirements,
	getInventions,
	getMaterialTypes,
	getMaterialUses,
	getOksSubtypes,
	getOksTypes,
	getSpecialCases,
	getSpecialClimateZones,
	getStages,
	saveProject,
} from './api';
import { computed, type Ref } from 'vue';
import type ProjectDetails from '@/entities/ProjectDetails';

// Типы ОКС
export function useOksTypes() {
	return useQuery({
		queryKey: ['oks-types'],
		queryFn: getOksTypes,
	});
}

// Подтипы ОКС
export function useOksSubtypes(ids: Ref<number[]>) {
	return useQuery({
		queryKey: computed(() => ['oks-subtypes', ids]),
		queryFn: () => getOksSubtypes(ids.value),
		enabled: computed(() => ids.value.length > 0), // perform this post request only if the body persists
	});
}

// Этапы строительства
export function useStages() {
	return useQuery({
		queryKey: ['stages'],
		queryFn: getStages,
	});
}

// Типы материалов
export function useMaterialTypes() {
	return useQuery({
		queryKey: ['material-types'],
		queryFn: getMaterialTypes,
	});
}

// Назначения материалов
export function useMaterialUses() {
	return useQuery({
		queryKey: ['material-uses'],
		queryFn: getMaterialUses,
	});
}

// Экологические и санитарные требования
export function useEcoRequirements() {
	return useQuery({
		queryKey: ['eco-requirements'],
		queryFn: getEcoRequirements,
	});
}

// Особые условия эксплуатации
export function useSpecialCases() {
	return useQuery({
		queryKey: ['special-cases'],
		queryFn: getSpecialCases,
	});
}

// Климатические зоны
export function useClimateZones() {
	return useQuery({
		queryKey: ['climate-zones'],
		queryFn: getClimateZones,
	});
}

// Особые климатические зоны
export function useSpecialClimateZones() {
	return useQuery({
		queryKey: ['special-climate-zones'],
		queryFn: getSpecialClimateZones,
	});
}

// Формы собственности
export function useInventions() {
	return useQuery({
		queryKey: ['inventions'],
		queryFn: getInventions,
	});
}

// Документы по их IDs
export function useDocumentsByIds() {
	return useMutation({
		mutationFn: (ids: number[]) => getDocumentsByIds(ids),
	});
}

// Сохранить новый проект от текущего юзера
export function useSaveProject() {
	return useMutation({
		mutationFn: (params: { userId: string; project: ProjectDetails }) =>
			saveProject(params.userId, params.project),
	});
}
