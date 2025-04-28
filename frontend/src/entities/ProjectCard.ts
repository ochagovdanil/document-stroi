import type Document from '@/entities/Document';

export default interface ProjectCard {
	userId: string;
	name: string;
	dateStart: string;
	dateEnd: string;
	image: string;
	documents: Document[];
}
