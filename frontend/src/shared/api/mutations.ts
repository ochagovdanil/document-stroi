import { QueryClient, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
	getDocumentsByIds,
	removeProjectByName,
	saveProject,
	updateDocument,
} from './api';
import type ProjectDetails from '@/entities/ProjectDetails';
import type Document from '@/entities/Document';

// Документы по их IDs
export function useDocumentsByIds() {
	return useMutation({
		mutationFn: (ids: number[]) => getDocumentsByIds(ids),
	});
}

// Редактировать документ
export function useUpdateDocument() {
	return useMutation({
		mutationFn: (newDocument: Document) => updateDocument(newDocument),
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
