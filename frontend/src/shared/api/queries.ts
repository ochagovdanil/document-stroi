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
	getProjectByName,
	getProjectsByParams,
	getProjectsLengthByUid,
	getSharedProjectByName,
	getSharedProjectsByParams,
	getSpecialCases,
	getSpecialClimateZones,
	getStages,
} from './api';
import type SearchParams from '@/entities/SearchParams';

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

// Все проекты по параметрам поиска
export function useProjectsByParams(uid: string, searchParams: SearchParams) {
	return useQuery({
		queryKey: computed(() => ['projects', uid, searchParams]),
		queryFn: () => getProjectsByParams(uid, searchParams),
		enabled: computed(() => uid !== ''), // perform this post request only if the search param persists
	});
}

// Все доступные мне проекты по параметрам поиска
export function useSharedProjectsByParams(
	uid: string,
	searchParams: SearchParams
) {
	return useQuery({
		queryKey: computed(() => ['shared-projects', uid, searchParams]),
		queryFn: () => getSharedProjectsByParams(uid, searchParams),
		enabled: computed(() => uid !== ''), // perform this post request only if the search param persists
	});
}

// Проект по названию
export function useProjectByName(name: string) {
	return useQuery({
		queryKey: computed(() => ['projects', name]),
		queryFn: () => getProjectByName(name),
		enabled: computed(() => name !== ''), // perform this post request only if the search param persists
	});
}

// Доступный мне проект по названию
export function useSharedProjectByName(uid: string, name: string) {
	return useQuery({
		queryKey: computed(() => ['shared-projects', uid, name]),
		queryFn: () => getSharedProjectByName(uid, name),
		enabled: computed(() => name !== '' && uid !== ''), // perform this post request only if the search param persists
	});
}
