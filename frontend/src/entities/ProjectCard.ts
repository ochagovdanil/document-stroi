import type Document from '@/entities/Document';

export default interface ProjectCard {
	_id: string;
	userId: string;
	name: string;
	dateStart: string;
	dateEnd: string;
	image: string;
	documents: Document[];
}
