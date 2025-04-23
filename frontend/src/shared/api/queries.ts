import { useQuery } from '@tanstack/vue-query';
import { getOksSubtypes, getOksTypes } from './api';
import { computed, type Ref } from 'vue';

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
