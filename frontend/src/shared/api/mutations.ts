import { QueryClient, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getDocumentsByIds, removeProjectByName, saveProject } from './api';
import type ProjectDetails from '@/entities/ProjectDetails';

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

// Удалить проект по названию
export function useRemoveProjectByName(uid: string) {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: (name: string) => removeProjectByName(name),
		onSettled: async (_, error: any) => {
			if (!error)
				await queryClient.invalidateQueries({
					queryKey: ['projects', uid],
				});
		},
	});
}
