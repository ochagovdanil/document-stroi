export default interface Document {
	name: string;
	link: string;
	document_id: number; // Документ, вставляемый ручным способом не ищется через фильтры, поэтому это поле может быть равно -1
}
