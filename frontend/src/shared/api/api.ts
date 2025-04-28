import type ClimateZone from '@/entities/ClimateZone';
import type Document from '@/entities/Document';
import type EcoRequirement from '@/entities/EcoRequirement';
import type Invention from '@/entities/Invention';
import type MaterialType from '@/entities/MaterialType';
import type MaterialUse from '@/entities/MaterialUse';
import type OksSubtype from '@/entities/OksSubtype';
import type OksType from '@/entities/OksType';
import type ProjectDetails from '@/entities/ProjectDetails';
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

// Сохранить новый проект от текущего юзера
export const saveProject = async (userId: string, project: ProjectDetails) => {
	return (
		await axiosInstance.post<any>('/save-project', {
			userId,
			name: project.name,
			image: project.image,
			dateStart: project.dateStart,
			dateEnd: project.dateEnd,
			documents: project.documents.map(
				(document: Document) => document.document_id
			),
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
