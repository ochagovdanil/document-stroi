import type OksSubtype from '@/entities/OksSubtype';
import type OksType from '@/entities/OksType';
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
