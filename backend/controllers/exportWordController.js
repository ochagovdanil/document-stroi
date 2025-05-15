const { Document, Packer, Paragraph, TextRun } = require('docx');

// Экспорт нормативных документов в Word по ГОСТам
const exportWord = async (req, res) => {
	const { projectName, documents, groupRowsBy } = req.body;

	try {
		// Группируем элементы
		const groupedDocuments = Object.values(
			documents.reduce((acc, doc) => {
				const key =
					groupRowsBy === 'category' ? doc.category : doc.type;

				// Если такой ключ еще не создан, создаем объект
				if (!acc[key]) {
					acc[key] = { name: key, documents: [] };
				}

				// Добавляем документ в соответствующий объект
				acc[key].documents.push(doc);
				return acc;
			}, {})
		);

		// Формируем содержимое документа
		const allParagraphs = [];

		groupedDocuments.forEach(group => {
			// Заголовок группы
			allParagraphs.push(
				new Paragraph({
					text: '',
					spacing: { after: 200 },
					children: [
						new TextRun({
							text: `${group.name}:`,
							size: 28,
						}),
					],
				})
			);

			// Документы внутри группы
			group.documents.forEach(docItem => {
				const extraInfo =
					groupRowsBy === 'category'
						? docItem.type
						: docItem.category;

				allParagraphs.push(
					new Paragraph({
						children: [
							new TextRun({ text: '- ', size: 28 }),
							new TextRun({
								text: `${docItem.name} [${extraInfo}]`,
								size: 28,
							}),
						],
					})
				);
			});

			allParagraphs.push(
				new Paragraph({
					spacing: { after: 400 },
					children: [
						new TextRun({
							text: '',
							size: 28,
						}),
					],
				})
			);
		});

		// Создаем новый Word документ
		const doc = new Document({
			creator: 'ДокументСтрой',
			title: projectName,
			sections: [
				{
					children: allParagraphs,
				},
			],
		});

		// Генерация и отправка файла
		const buffer = await Packer.toBuffer(doc);

		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${encodeURIComponent(
				projectName
			)}.docx"; filename*=UTF-8''${encodeURIComponent(projectName)}.docx`
		);

		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		);
		res.status(200).send(buffer);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

module.exports = { exportWord };
