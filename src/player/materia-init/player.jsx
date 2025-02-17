import ReactDOM from 'react-dom'
import PlayerWidget from '../PlayerWidget'

Materia.Engine.start({
  start: (instance, qset) => {
    const rootElement = document.getElementById('root')
    ReactDOM.createRoot(rootElement).render(
      <PlayerWidget
        qset={qset}
        onEnd={() => {
          Materia.Engine.end()
        }}
        submitQuestionForScoring={(id, answers, value) => {
          Materia.Score.submitQuestionForScoring(id, answers, value)
        }}
      />,
    )
  },
})
