import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import {
	getClimateZones,
	getEcoRequirements,
	getInventions,
	getMaterialTypes,
	getMaterialUses,
	getOksSubtypes,
	getOksTypes,
	getProjectsByUid,
	getProjectsLengthByUid,
	getSpecialCases,
	getSpecialClimateZones,
	getStages,
} from './api';

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

// Количество проектов для userId
export function useProjectsLengthByUid(uid: string) {
	return useQuery({
		queryKey: computed(() => ['projects-length', uid]),
		queryFn: () => getProjectsLengthByUid(uid),
		enabled: computed(() => uid !== ''), // perform this post request only if the search param persists
	});
}

// Все проекты для userId
export function useProjectsByUid(uid: string) {
	return useQuery({
		queryKey: computed(() => ['projects', uid]),
		queryFn: () => getProjectsByUid(uid),
		enabled: computed(() => uid !== ''), // perform this post request only if the search param persists
	});
}
