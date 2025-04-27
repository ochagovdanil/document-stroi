import type Document from './Document';

export default interface ProjectDetails {
	name: string;
	dateStart: string;
	dateEnd: string;
	image: string;
	documents: Document[];
}
