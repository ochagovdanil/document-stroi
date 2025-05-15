import { QueryClient, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
	exportWord,
	getDocumentsByIds,
	removeProjectByName,
	removeSharedProjectByName,
	saveProject,
	saveSharedProject,
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

// Сохранить новый доступный мне проект от текущего юзера
export function useSaveSharedProject() {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: (params: { userId: string; sharedUri: string }) =>
			saveSharedProject(params.userId, params.sharedUri),
		onSettled: async (_, error: any) => {
			if (!error)
				await queryClient.invalidateQueries({
					queryKey: ['shared-projects'],
				});
		},
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

// Удалить доступный мне проект по названию
export function useRemoveSharedProjectByName(uid: string) {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: (name: string) => removeSharedProjectByName(uid, name),
		onSettled: async (_, error: any) => {
			if (!error)
				await queryClient.invalidateQueries({
					queryKey: ['shared-projects', uid],
				});
		},
	});
}

// Экспорт таблицы в Word по ГОСТам
export function useExportWord() {
	return useMutation({
		mutationFn: (params: {
			projectName: string;
			documents: Document[];
			groupRowsBy: 'category' | 'type';
		}) =>
			exportWord(
				params.projectName,
				params.documents,
				params.groupRowsBy
			),
	});
}
