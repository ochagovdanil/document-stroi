import type Document from '@/entities/Document';

export default interface SharedProjectCard {
	_id: string;
	userId: string;
	name: string;
	dateStart: string;
	dateEnd: string;
	image: string;
	documents: Document[];
	access: string; // r | w
}
