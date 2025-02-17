import './creator.scss';
Materia.CreatorCore.start({
	initNewWidget: (widget, baseUrl, mediaUrl) => {},
	initExistingWidget: (widget, title, qset, qsetVersion, baseUrl, mediaUrl) => {},
	onSaveClicked: (mode = 'save') => {}, // possible modes: 'publish', 'preview', 'save'
	onSaveComplete: (instanceName, widget, qset, qsetVersion) => {},
	onMediaImportComplete: (arrayOfMedia) => {},
	onQuestionImportComplete: (arrayOfQuestions) => {},
	manualResize: false // set to false to turn on automatic Resizing
})
