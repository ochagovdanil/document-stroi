import type Document from '@/entities/Document';
import type ProjectDetails from '@/entities/ProjectDetails';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Хранит информацию о будущем проекте (название, даты, документы и пр.)
export const useNewProjectDetailsStore = defineStore(
	'new-project-details',
	() => {
		const details = ref<ProjectDetails>({
			name: '',
			dateStart: '',
			dateEnd: '',
			image: '',
			documents: [],
		});

		const getDocumentsSize = computed(
			() => details.value?.documents.length
		);

		function updateName(newName: string) {
			details.value.name = newName;
		}

		function updateDateStart(newDateStart: string) {
			details.value.dateStart = newDateStart;
		}

		function updateDateEnd(newDateEnd: string) {
			details.value.dateEnd = newDateEnd;
		}

		function updateImage(newImage: string) {
			details.value.image = newImage;
		}

		function insertDocuments(...documents: Document[]) {
			if (!details.value) return;

			// Проверяем вставляемый нормативный документ на его уникальность по имени
			const existingNames = new Set(
				details.value.documents.map(doc => doc.name)
			);

			const newDocuments = documents.filter(
				doc => !existingNames.has(doc.name)
			);

			details.value.documents.unshift(...newDocuments);
		}

		function removeDocuments(...documents: Document[]) {
			if (!details.value) return;

			const namesToRemove = new Set(documents.map(doc => doc.name));

			details.value.documents = details.value.documents.filter(
				(doc: Document) => !namesToRemove.has(doc.name)
			);
		}

		function updateDocument(oldDocument: Document, newDocument: Document) {
			details.value.documents.map((document: Document) => {
				if (JSON.stringify(document) === JSON.stringify(oldDocument))
					Object.assign(document, newDocument);
			});
		}

		function clearState() {
			Object.assign(details.value, {
				name: '',
				dateStart: '',
				dateEnd: '',
				image: '',
				documents: [],
			});
		}

		return {
			details,

			getDocumentsSize,

			updateName,
			updateDateStart,
			updateDateEnd,
			updateImage,
			insertDocuments,
			removeDocuments,
			updateDocument,
			clearState,
		};
	}
);
