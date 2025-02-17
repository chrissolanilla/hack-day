import './player.scss';

Materia.Engine.start({
	start: (instance, qset, qsetVersion) => {
		showAnswersBoolean = instance.qset.data.showAnswers;

		const title = instance.name
		const TitleElement = document.getElementById('Title')
		TitleElement.innerHTML = title

		const modalH1 = document.getElementById('welcomeModalTitle')
		modalH1.textContent = title

		livesConstant = qset.options.lives ?? 1
		setupGame(qset)
	},
});
