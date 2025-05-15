import type ClimateZone from '@/entities/ClimateZone';
import type Document from '@/entities/Document';
import type EcoRequirement from '@/entities/EcoRequirement';
import type Invention from '@/entities/Invention';
import type MaterialType from '@/entities/MaterialType';
import type MaterialUse from '@/entities/MaterialUse';
import type OksSubtype from '@/entities/OksSubtype';
import type OksType from '@/entities/OksType';
import type ProjectCard from '@/entities/ProjectCard';
import type ProjectDetails from '@/entities/ProjectDetails';
import type SearchParams from '@/entities/SearchParams';
import type SharedProjectCard from '@/entities/SharedProjectCard';
import type SpecialCase from '@/entities/SpecialCase';
import type SpecialClimateZone from '@/entities/SpecialClimateZone';
import type Stage from '@/entities/Stage';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001',
});

// Типы ОКС
export const getOksTypes = async () => {
	return (await axiosInstance.get<OksType[]>('/oks-types')).data;
};

// Подтипы ОКС
export const getOksSubtypes = async (ids: number[]) => {
	return (
		await axiosInstance.post<OksSubtype[]>('/oks-subtypes', {
			ids,
		})
	).data;
};

// Этапы строительства
export const getStages = async () => {
	return (await axiosInstance.get<Stage[]>('/stages')).data;
};

// Типы материалов
export const getMaterialTypes = async () => {
	return (await axiosInstance.get<MaterialType[]>('/material-types')).data;
};

// Назначения материалов
export const getMaterialUses = async () => {
	return (await axiosInstance.get<MaterialUse[]>('/material-uses')).data;
};

// Экологические и санитарные требования
export const getEcoRequirements = async () => {
	return (await axiosInstance.get<EcoRequirement[]>('/eco-requirements'))
		.data;
};

// Особые условия эксплуатации
export const getSpecialCases = async () => {
	return (await axiosInstance.get<SpecialCase[]>('/special-cases')).data;
};

// Климатические зоны
export const getClimateZones = async () => {
	return (await axiosInstance.get<ClimateZone[]>('/climate-zones')).data;
};

// Особые климатические зоны
export const getSpecialClimateZones = async () => {
	return (
		await axiosInstance.get<SpecialClimateZone[]>('/special-climate-zones')
	).data;
};

// Формы собственности
export const getInventions = async () => {
	return (await axiosInstance.get<Invention[]>('/inventions')).data;
};

// Документы по их IDs
export const getDocumentsByIds = async (ids: number[]) => {
	return (
		await axiosInstance.post<Document[]>('/documents', {
			ids,
		})
	).data;
};

// Редактировать документ
export const updateDocument = async (newDocument: Document) => {
	return (
		await axiosInstance.post<Document>('/update-document', {
			document: newDocument,
		})
	).data;
};

// Сохранить новый проект от текущего юзера
export const saveProject = async (userId: string, project: ProjectDetails) => {
	return (
		await axiosInstance.post<any>('/save-project', {
			userId,
			name: project.name,
			image: project.image,
			dateStart: project.dateStart,
			dateEnd: project.dateEnd,
			documents: project.documents,
		})
	).data;
};

// Сохранить новый доступный мне проект от текущего юзера
export const saveSharedProject = async (userId: string, sharedUri: string) => {
	return (
		await axiosInstance.post<any>('/save-shared-project', {
			userId,
			uri: sharedUri,
		})
	).data;
};

// Количество проектов для userId
export const getProjectsLengthByUid = async (uid: string) => {
	return (
		await axiosInstance.post<{ length: number }>('/projects-length', {
			uid,
		})
	).data;
};

// Количество доступным мне проектов для userId
export const getSharedProjectsLengthByUid = async (uid: string) => {
	return (
		await axiosInstance.post<{ length: number }>(
			'/shared-projects-length',
			{
				uid,
			}
		)
	).data;
};

// Все проекты по параметрам поиска
export const getProjectsByParams = async (
	uid: string,
	searchParams: SearchParams
) => {
	return (
		await axiosInstance.post<ProjectCard[]>('/projects', {
			uid,
			query: searchParams.searchField,
			dateStart: searchParams.dateStart,
			dateEnd: searchParams.dateEnd,
		})
	).data;
};

// Все доступные мне проекты по параметрам поиска
export const getSharedProjectsByParams = async (
	uid: string,
	searchParams: SearchParams
) => {
	return (
		await axiosInstance.post<SharedProjectCard[]>('/shared-projects', {
			uid,
			query: searchParams.searchField,
			dateStart: searchParams.dateStart,
			dateEnd: searchParams.dateEnd,
		})
	).data;
};

// Удалить проект по его названию
export const removeProjectByName = async (name: string) => {
	return (
		await axiosInstance.delete<string>('/projects', {
			data: {
				name,
			},
		})
	).data;
};

// Удалить доступный мне проект по его названию
export const removeSharedProjectByName = async (uid: string, name: string) => {
	return (
		await axiosInstance.delete<string>('/shared-projects', {
			data: {
				uid,
				name,
			},
		})
	).data;
};

// Проект по его названию
export const getProjectByName = async (name: string) => {
	return (
		await axiosInstance.get<ProjectCard>(
			`/projects/${encodeURIComponent(name)}`
		)
	).data;
};

// Доступный мне проект по его названию
export const getSharedProjectByName = async (uid: string, name: string) => {
	return (
		await axiosInstance.post<SharedProjectCard>(
			`/shared-projects/${encodeURIComponent(name)}`,
			{
				uid,
			}
		)
	).data;
};

// Экспорт в Word по ГОСТам
export const exportWord = async (
	projectName: string,
	documents: Document[],
	groupRowsBy: 'category' | 'type'
) => {
	return (
		await axiosInstance.post<any>(
			'/export-word',
			{
				projectName: projectName,
				documents: documents,
				groupRowsBy: groupRowsBy,
			},
			{
				responseType: 'arraybuffer',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
	).data;
};
